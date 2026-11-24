"use client";

/**
 * Floating assistant for the Ali's Twin Tower project site. Streams answers from /api/assistant (Gemini, key on the
 * server). Keeps the chat in localStorage, offers quick questions, and always shows call / WhatsApp for a human.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, MessageCircle, Phone, RotateCcw, Sparkles, Square, X } from "lucide-react";
import { TOWER_OFFICE, waLink } from "@/lib/site";
import { WhatsAppLogo } from "@/components/icons";
import Markdown from "./Markdown";
import s from "./assistant.module.css";

type Role = "user" | "assistant" | "error";
type Message = { id: string; role: Role; text: string };

const STORAGE_KEY = "twintower-assistant-chat-v1";
const MAX_INPUT = 1500;
const SUGGESTIONS = [
  "Which apartment type suits a family of 5?",
  "Type B ki payment plan samjhayen",
  "What is the total cost and monthly instalment of Type C?",
  "What facilities does the building have?",
];
const uid = () => Math.random().toString(36).slice(2, 10);

export default function TowerAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const loaded = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open || loaded.current) return;
    loaded.current = true;
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as Message[];
      if (Array.isArray(parsed)) {
        const clean = parsed.filter((m) => m && typeof m.text === "string");
        requestAnimationFrame(() => setMessages(clean));
      }
    } catch {
      /* ignore corrupt data */
    }
  }, [open]);

  useEffect(() => {
    if (!loaded.current || streaming) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      /* storage blocked */
    }
  }, [messages, streaming]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 110)}px`;
  }, [input]);

  const setBot = (id: string, text: string, role: Role = "assistant") => setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text, role } : m)));

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, MAX_INPUT);
      if (!text || streaming) return;
      const user: Message = { id: uid(), role: "user", text };
      const botId = uid();
      const history = [...messages, user].filter((m) => m.role !== "error").map(({ role, text: t }) => ({ role, text: t }));
      setMessages((prev) => [...prev, user, { id: botId, role: "assistant", text: "" }]);
      setInput("");
      setStreaming(true);
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: history }), signal: controller.signal });
        const left = res.headers.get("X-Assistant-Remaining");
        if (left) setRemaining(Number(left));
        if (!res.ok || !res.body) {
          let message = `The assistant is unavailable right now. Please call ${TOWER_OFFICE.phone}.`;
          try {
            const data = await res.json();
            if (data?.message) message = data.message;
          } catch {
            /* not JSON (for example when the site is previewed without the server) */
          }
          setBot(botId, message, "error");
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setBot(botId, answer);
        }
        if (!answer.trim()) setBot(botId, "I could not answer that this time. Please try rephrasing.", "error");
      } catch {
        if (controller.signal.aborted) setMessages((prev) => prev.map((m) => (m.id === botId && !m.text ? { ...m, text: "_Stopped._" } : m)));
        else setBot(botId, "Connection problem. Please check your internet and try again.", "error");
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  const retry = (errorId: string) => {
    const idx = messages.findIndex((m) => m.id === errorId);
    const lastUser = [...messages.slice(0, idx)].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    setMessages((prev) => prev.filter((m) => m.id !== errorId && m.id !== lastUser.id));
    setTimeout(() => send(lastUser.text), 0);
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <>
      <button ref={launcherRef} type="button" className={s.launcher} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="tt-assistant" aria-label={open ? "Close the assistant" : "Ask the Twin Tower assistant"}>
        {open ? <X size={22} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
        <span>{open ? "Close" : "Ask us"}</span>
      </button>

      {open && (
        <section id="tt-assistant" className={s.panel} role="dialog" aria-label="Ali's Twin Tower assistant">
          <header className={s.head}>
            <span className={s.avatar}>
              <Sparkles size={18} aria-hidden="true" />
            </span>
            <div>
              <b>Twin Tower Assistant</b>
              <small>{remaining !== null ? `${remaining} questions left today` : "Prices, plans, features, visits"}</small>
            </div>
            <button type="button" onClick={reset} aria-label="Start a new chat" title="New chat">
              <RotateCcw size={16} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close the assistant">
              <X size={18} aria-hidden="true" />
            </button>
          </header>

          <div ref={scrollRef} className={s.body} aria-live="polite">
            {messages.length === 0 && (
              <div className={s.welcome}>
                <p>
                  <b>Assalam o Alaikum!</b> Ask me about apartment types, prices, payment plans, features or booking a visit. English or Urdu both work.
                </p>
                <ul>
                  {SUGGESTIONS.map((q) => (
                    <li key={q}>
                      <button type="button" onClick={() => send(q)}>
                        {q}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`${s.msg} ${m.role === "user" ? s.user : m.role === "error" ? s.err : s.bot}`}>
                {m.role === "user" ? (
                  m.text
                ) : m.text ? (
                  <Markdown text={m.text} />
                ) : (
                  <span className={s.dots} aria-label="Typing">
                    <i />
                    <i />
                    <i />
                  </span>
                )}
                {m.role === "error" && (
                  <button type="button" className={s.retry} onClick={() => retry(m.id)}>
                    Try again
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className={s.human}>
            <a href={TOWER_OFFICE.phoneHref}>
              <Phone size={14} aria-hidden="true" /> Call
            </a>
            <a href={waLink(TOWER_OFFICE.whatsappHref, "Hello, I have a question about Ali's Twin Tower.")} target="_blank" rel="noopener noreferrer">
              <WhatsAppLogo size={14} /> WhatsApp the team
            </a>
          </div>

          <form
            className={s.composer}
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_INPUT}
              placeholder="Type your question…"
              aria-label="Your question"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
            />
            {streaming ? (
              <button type="button" onClick={() => abortRef.current?.abort()} aria-label="Stop the answer">
                <Square size={16} aria-hidden="true" />
              </button>
            ) : (
              <button type="submit" disabled={!input.trim()} aria-label="Send">
                <ArrowUp size={18} aria-hidden="true" />
              </button>
            )}
          </form>
          <p className={s.foot}>AI answers use the project brochure and payment schedules. Please confirm details with the site office.</p>
        </section>
      )}
    </>
  );
}
