"use client";

import { useState } from "react";
import { SITE, PROJECT_TYPES } from "@/lib/site";
import s from "./co.module.css";

type Status = "idle" | "sending" | "sent" | "error";

/** Enquiry form. Posts to Netlify Forms (registered in public/__forms.html); on failure it points to phone and WhatsApp. */
export default function CoForm({ source = "Company site" }: { source?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("form-name", "estimate");
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data as unknown as Record<string, string>).toString() });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={s.done} role="status">
        <h2>Thank you. We have your details.</h2>
        <p>Our team will call you within one working day to arrange a visit.</p>
        <div className={s.row}>
          <button type="button" className={`${s.btn} ${s.btnLine}`} onClick={() => setStatus("idle")}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit} name="estimate">
      <h2>Send an enquiry</h2>
      <p>Fields marked * are required.</p>
      <input type="hidden" name="source" value={source} />
      <p hidden>
        <label>
          Leave this empty: <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className={s.fields}>
        <label>
          Full name *
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Phone or WhatsApp *
          <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="03XX XXXXXXX" />
        </label>
        <label>
          I am interested in
          <select name="type" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label>
          City or area
          <input name="city" autoComplete="address-level2" />
        </label>
        <label className={s.wide}>
          Message
          <textarea name="message" rows={4} />
        </label>
      </div>
      {status === "error" && (
        <p className={s.err} role="alert">
          We could not send the form. Please call <a href={SITE.phoneHref}>{SITE.phone}</a> or{" "}
          <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
            message us on WhatsApp
          </a>
          .
        </p>
      )}
      <div className={s.row}>
        <button type="submit" className={s.btn} disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Send enquiry"}
        </button>
      </div>
      <p>We use your details only to contact you about your enquiry.</p>
    </form>
  );
}
