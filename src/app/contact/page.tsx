import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import CoForm from "@/components/co/Form";
import { Details, PageHead } from "@/components/co/Parts";
import s from "@/components/co/co.module.css";
import { SITE, TOWER_OFFICE, waLink } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact and site visits",
  description: "Call, WhatsApp or request a site visit at the Ali Zeeshan Enterprises booking office in Scheme-33, Karachi. Open 10 am to 8 pm.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <CoShell>
      <PageHead path="/contact" title="Book a site visit." text="Pick a day and time, call us, or send a message. We reply within one working day." crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className={s.sec}>
        <div className={`${s.wrap} ${s.cols2}`}>
          <div>
            <Details />
            <div className={s.row}>
              <a className={s.btn} href={SITE.phoneHref}>
                Call {SITE.phone}
              </a>
              <a className={`${s.btn} ${s.btnLine}`} href={waLink(SITE.whatsappHref, "Hello, I would like to book a site visit.")} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
            <div style={{ marginTop: 32 }}>
              <iframe className={s.map} style={{ minHeight: 320 }} title="Map of the booking office in Scheme-33, Karachi" src={TOWER_OFFICE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <p className={s.note}>
                <a className={s.link} href={TOWER_OFFICE.mapsHref} target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </p>
            </div>
          </div>
          <CoForm />
        </div>
      </section>
    </CoShell>
  );
}
