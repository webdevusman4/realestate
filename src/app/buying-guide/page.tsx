import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { PageHead, SectionHead, Tag, Visit } from "@/components/co/Parts";
import { BuyingSteps, FaqList, FinalCta, PaymentBasics } from "@/components/co/Sections";
import s from "@/components/co/co.module.css";
import { DOCUMENTS } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Buying guide",
  description: "How to buy an apartment from Ali Zeeshan Enterprises: booking steps, documents, payment plan basics and possession.",
  path: "/buying-guide",
});

export default function BuyingGuide() {
  return (
    <CoShell>
      <PageHead path="/buying-guide" title="How to buy an apartment." text="The steps, the payment basics and what to bring. Examples use Ali's Twin Tower." crumbs={[{ label: "Home", href: "/" }, { label: "Buying guide" }]} />
      <section className={s.sec}>
        <div className={s.wrap}>
          <SectionHead label="Booking steps" title="Five steps." />
          <BuyingSteps />
        </div>
      </section>
      <section className={`${s.sec} ${s.onConcrete}`}>
        <div className={`${s.wrap} ${s.cols2}`}>
          <div>
            <p className={s.label}>Payment plan basics</p>
            <h2 className={s.big} style={{ marginTop: 12 }}>
              What you pay, and when.
            </h2>
            <p style={{ marginTop: 18 }}>Exact amounts are in each apartment&apos;s payment schedule on the project site.</p>
          </div>
          <PaymentBasics />
        </div>
      </section>
      <section className={s.sec}>
        <div className={`${s.wrap} ${s.cols2}`}>
          <div>
            <p className={s.label}>Documents</p>
            <h2 className={s.big} style={{ marginTop: 12 }}>
              What to bring.
            </h2>
            <p className={s.note}>
              <Tag>Confirm with the office</Tag> This list is a typical checklist. The booking office will confirm what you need.
            </p>
          </div>
          <ul className={s.checks}>
            {DOCUMENTS.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className={`${s.sec} ${s.onConcrete}`}>
        <div className={s.wrap}>
          <SectionHead label="Possession" title="When do I get the keys?" />
          <div className={s.prose}>
            <p>The last two payments fall on finishing and on possession. We do not publish a handover date until it is confirmed, so please ask the booking office for the current timeline.</p>
          </div>
        </div>
      </section>
      <section className={s.sec}>
        <div className={s.wrap}>
          <SectionHead label="Questions" title="Common questions." />
          <FaqList limit={6} />
        </div>
      </section>
      <FinalCta />
      <Visit />
    </CoShell>
  );
}
