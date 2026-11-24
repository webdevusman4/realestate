import { NextRequest } from "next/server";
import { ASSISTANT_SYSTEM_PROMPT } from "@/lib/assistant/prompt";
import { geminiModels, openGeminiStream, sseToText, type GeminiContent } from "@/lib/assistant/gemini";
import { takeQuota } from "@/lib/assistant/quota";
import { TOWER_OFFICE } from "@/lib/site";

/**
 * POST /api/assistant: one streamed answer per visitor question.
 * Body: { messages: { role: "user" | "assistant"; text: string }[] } (the last entry is the question).
 * Response: a plain-text stream, plus X-Assistant-Remaining. Errors are JSON { error, message }.
 * The Gemini key (GEMINI_API_KEY) stays on the server.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_TURNS = 10;
const MAX_CHARS_PER_TURN = 1500;
const MAX_CHARS_TOTAL = 9000;

type ChatTurn = { role: "user" | "assistant"; text: string };

const CALL = `Please call or WhatsApp the site office on ${TOWER_OFFICE.phone}.`;

function fail(status: number, error: string, message: string) {
  return Response.json({ error, message }, { status, headers: { "Cache-Control": "no-store" } });
}

function sanitize(input: unknown): ChatTurn[] | null {
  if (!Array.isArray(input)) return null;
  const turns: ChatTurn[] = input
    .filter((t): t is ChatTurn => !!t && typeof t === "object" && ((t as ChatTurn).role === "user" || (t as ChatTurn).role === "assistant") && typeof (t as ChatTurn).text === "string")
    .map((t) => ({ role: t.role, text: t.text.trim().slice(0, MAX_CHARS_PER_TURN) }))
    .filter((t) => t.text.length > 0)
    .slice(-MAX_TURNS);
  const kept: ChatTurn[] = [];
  let total = 0;
  for (let i = turns.length - 1; i >= 0; i--) {
    total += turns[i].text.length;
    if (total > MAX_CHARS_TOTAL && kept.length > 0) break;
    kept.unshift(turns[i]);
  }
  while (kept.length && kept[0].role !== "user") kept.shift();
  if (!kept.length || kept[kept.length - 1].role !== "user") return null;
  return kept;
}

function visitorId(req: NextRequest) {
  return req.headers.get("x-nf-client-connection-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anonymous";
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return fail(503, "not_configured", `The assistant is not switched on yet. ${CALL}`);

  let payload: { messages?: unknown };
  try {
    payload = await req.json();
  } catch {
    return fail(400, "bad_request", "The question could not be read. Please try again.");
  }
  const turns = sanitize(payload?.messages);
  if (!turns) return fail(400, "bad_request", "Please type a question first.");

  const quota = takeQuota(visitorId(req));
  if (!quota.ok) return fail(429, quota.reason, quota.message);

  const contents: GeminiContent[] = turns.map((t) => ({ role: t.role === "assistant" ? "model" : "user", parts: [{ text: t.text }] }));

  let lastStatus = 0;
  for (const model of geminiModels()) {
    let upstream: Response;
    try {
      upstream = await openGeminiStream({ apiKey, model, system: ASSISTANT_SYSTEM_PROMPT, contents, signal: req.signal });
    } catch (error) {
      if (req.signal.aborted) return new Response(null, { status: 499 });
      console.error("[assistant] Gemini request failed", model, error instanceof Error ? error.message : error);
      lastStatus = 502;
      continue;
    }
    if (upstream.ok && upstream.body) {
      return new Response(sseToText(upstream.body), {
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no", "X-Assistant-Remaining": String(quota.remainingForUser) },
      });
    }
    lastStatus = upstream.status;
    const detail = await upstream.text().catch(() => "");
    console.error(`[assistant] Gemini ${model} responded ${upstream.status}: ${detail.slice(0, 300)}`);
    if (upstream.status === 404 || upstream.status === 429 || upstream.status >= 500) continue;
    break;
  }

  if (lastStatus === 429) return fail(429, "provider_quota", `Today's free assistant quota has been used up. ${CALL}`);
  if (lastStatus === 400 || lastStatus === 401 || lastStatus === 403) return fail(502, "provider_config", `The assistant could not reach the AI service. ${CALL}`);
  return fail(502, "provider_error", `The assistant is busy right now. Please try again in a moment, or ${CALL.toLowerCase()}`);
}
