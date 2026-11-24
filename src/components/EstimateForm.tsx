"use client";

import { useState } from "react";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { PROJECT_TYPES, SITE } from "@/lib/site";

type FormProps = {
  title?: string;
  /** Options for the "interested in" list. */
  types?: readonly string[];
  /** Where the enquiry came from; sent with the form. */
  source?: string;
  /** Show the plot size and city fields (for building enquiries). */
  plot?: boolean;
  phone?: { label: string; href: string };
  whatsappHref?: string;
};
import s from "./site.module.css";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Free-estimate form. Posts to Netlify Forms (registered in public/__forms.html). On any other host the post
 * fails and the visitor is offered the phone number and WhatsApp instead.
 */
export default function EstimateForm({
  title = "Book a visit or ask for prices",
  types = PROJECT_TYPES,
  source = "Company site",
  plot = true,
  phone = { label: SITE.phone, href: SITE.phoneHref },
  whatsappHref = SITE.whatsappHref,
}: FormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("form-name", "estimate");
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={`${s.form} ${s.formDone}`} role="status">
        <CircleCheck size={44} strokeWidth={1.6} aria-hidden="true" />
        <h3>Thank you, we have your details.</h3>
        <p>Our team will call you within one working day to arrange a visit.</p>
        <button type="button" className={`${s.btn} ${s.btnDark}`} onClick={() => setStatus("idle")}>
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={onSubmit} name="estimate">
      <h3>{title}</h3>
      <p className={s.formNote}>Fields marked * are required.</p>
      <input type="hidden" name="source" value={source} />
      <p hidden>
        <label>
          Leave this empty: <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className={s.fields}>
        <label>
          <span>Full name *</span>
          <input name="name" required autoComplete="name" placeholder="Your name" />
        </label>
        <label>
          <span>Phone / WhatsApp *</span>
          <input name="phone" required type="tel" autoComplete="tel" inputMode="tel" placeholder="03XX XXXXXXX" />
        </label>
        <label>
          <span>I am interested in</span>
          <select name="type" defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        {plot && (
          <label>
            <span>Plot size (if building)</span>
            <input name="plot" placeholder="e.g. 10 Marla, 1 Kanal" />
          </label>
        )}
        <label className={plot ? s.fieldWide : undefined}>
          <span>City / area</span>
          <input name="city" autoComplete="address-level2" placeholder="Where do you live?" />
        </label>
        <label className={s.fieldWide}>
          <span>Message</span>
          <textarea name="message" rows={4} placeholder="Which type, budget, when you can visit: anything that helps." />
        </label>
      </div>
      {status === "error" && (
        <p className={s.formError} role="alert">
          We could not send the form right now. Please call <a href={phone.href}>{phone.label}</a> or{" "}
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            message us on WhatsApp
          </a>
          .
        </p>
      )}
      <button type="submit" className={`${s.btn} ${s.btnGold} ${s.btnBlock}`} disabled={status === "sending"}>
        {status === "sending" ? (
          <>
            <LoaderCircle size={18} className={s.spin} aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Send request
            <ArrowRight size={18} aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
