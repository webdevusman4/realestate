import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import CoForm from "@/components/co/Form";
import { Details, PageHead } from "@/components/co/Parts";
import s from "@/components/co/co.module.css";
import { SITE, TOWER_OFFICE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, WhatsApp or send an enquiry to book a visit to the Ali Zeeshan Enterprises booking office in Scheme-33, Karachi.",
};

export default function ContactPage() {
  return (
    <CoShell>
      <PageHead title="Book a site visit." text="Visit the booking office, call us, or send an enquiry. We reply within one working day." crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className={s.sec}>
        <div className={`${s.wrap} ${s.cols2}`}>
          <div>
            <Details />
            <div className={s.row}>
              <a className={s.btn} href={SITE.phoneHref}>
                Call {SITE.phone}
              </a>
              <a className={`${s.btn} ${s.btnLine}`} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
            <div style={{ marginTop: 32 }}>
              <iframe className={s.map} style={{ minHeight: 320 }} title="Map of the booking office in Scheme-33, Karachi" src={TOWER_OFFICE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <CoForm />
        </div>
      </section>
    </CoShell>
  );
}
