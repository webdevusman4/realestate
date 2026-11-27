"use client";

import { useEffect, useRef, useState } from "react";
import { SITE, PROJECT_TYPES } from "@/lib/site";
import s from "./co.module.css";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "phone" | "email", string>>;

const SLOTS = ["10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm"];

/** Pakistani numbers: 03XX XXXXXXX, +92 3XX XXXXXXX, or a landline with area code. Accepts spaces and dashes. */
export function validPhone(v: string) {
  const d = v.replace(/[\s\-()]/g, "");
  return /^(\+92|0092|0)?[1-9]\d{8,10}$/.test(d);
}

function validate(f: FormData): Errors {
  const e: Errors = {};
  if (String(f.get("name") ?? "").trim().length < 2) e.name = "Enter your full name.";
  if (!validPhone(String(f.get("phone") ?? ""))) e.phone = "Enter a phone number like 0320 9281567.";
  const mail = String(f.get("email") ?? "").trim();
  if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) e.email = "Enter an email like name@example.com, or leave it empty.";
  return e;
}

/** Enquiry and site-visit form. Posts to Netlify Forms (public/__forms.html); on failure it points to phone and WhatsApp. */
export default function CoForm({ source = "Company site", project, title = "Book a site visit", visit = true }: { source?: string; project?: string; title?: string; visit?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const dateRef = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  // Set on the element after mount so the server and browser markup match.
  useEffect(() => {
    const d = new Date();
    if (dateRef.current) dateRef.current.min = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    const data = new FormData(el);
    const errs = validate(data);
    setErrors(errs);
    const first = (["name", "phone", "email"] as const).find((k) => errs[k]);
    if (first) {
      el.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    data.set("form-name", "estimate");
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data as unknown as Record<string, string>).toString() });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      el.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={s.done} role="status">
        <h2>Thank you. We have your details.</h2>
        <p>The booking office will call you within one working day to confirm your visit.</p>
        <div className={s.row}>
          <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={() => setStatus("idle")}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const err = (k: keyof Errors) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `err-${k}` } : {});
  const msg = (k: keyof Errors) =>
    errors[k] ? (
      <span id={`err-${k}`} className={s.fieldErr}>
        {errors[k]}
      </span>
    ) : null;

  return (
    <form ref={form} className={s.form} onSubmit={onSubmit} name="estimate" noValidate>
      <h2>{title}</h2>
      <p>Fields marked * are required. We reply within one working day.</p>
      <input type="hidden" name="source" value={source} />
      {project && <input type="hidden" name="project" value={project} />}
      <p hidden>
        <label>
          Leave this empty: <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className={s.fields}>
        <label>
          Full name *
          <input name="name" required autoComplete="name" {...err("name")} />
          {msg("name")}
        </label>
        <label>
          Phone or WhatsApp *
          <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="03XX XXXXXXX" {...err("phone")} />
          {msg("phone")}
        </label>
        <label>
          Email (optional)
          <input name="email" type="email" autoComplete="email" {...err("email")} />
          {msg("email")}
        </label>
        <label>
          I am interested in
          <select name="type" defaultValue="">
            <option value="">Not sure yet</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        {visit && (
          <>
            <label>
              Preferred visit date
              <input name="visit_date" type="date" ref={dateRef} />
            </label>
            <label>
              Preferred time ({SITE.hours})
              <select name="visit_time" defaultValue="">
                <option value="">Any time</option>
                {SLOTS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </>
        )}
        <label className={s.wide}>
          Message
          <textarea name="message" rows={4} />
        </label>
      </div>
      <div aria-live="polite">
        {status === "error" && (
          <p className={s.err} role="alert">
            We could not send the form. Please call <a href={SITE.phoneHref}>{SITE.phone}</a> or{" "}
            <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              message us on WhatsApp
            </a>
            .
          </p>
        )}
        {Object.keys(errors).length > 0 && status !== "error" && (
          <p className={s.err} role="alert">
            Please fix the highlighted fields and send again.
          </p>
        )}
      </div>
      <div className={s.row}>
        <button type="submit" className={s.btn} disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : visit ? "Request a visit" : "Send enquiry"}
        </button>
      </div>
      <p>We use your details only to contact you about your enquiry. See our <a className={s.link} href="/privacy">privacy page</a>.</p>
    </form>
  );
}
