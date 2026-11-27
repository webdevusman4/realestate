import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CoShell from "@/components/co/Shell";
import { PageHead, SectionHead, Tag } from "@/components/co/Parts";
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
      <PageHead
        path="/buying-guide"
        title="How to buy an apartment."
        text="The steps, the payment basics and what to bring. Examples use Ali's Twin Tower."
        crumbs={[{ label: "Home", href: "/" }, { label: "Buying guide" }]}
      />

      {/* Five booking steps beside interior-lounge (4:5) */}
      <section className={s.sec}>
        <div className={s.wrap}>
          <SectionHead label="Booking steps" title="Five steps." short />
          <div className={s.stepsWithPhoto}>
            <BuyingSteps />
            <div className={s.stepsPhoto}>
              <Image
                src="/photos/interior-lounge.jpg"
                alt="Finished apartment living room with warm ceiling cove lighting and wood panelling"
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
              />
              <span className={s.repCap}>Representative image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Payment basics */}
      <section className={`${s.sec} ${s.onIvory2}`}>
        <div className={`${s.wrap} ${s.cols2}`}>
          <div>
            <p className={s.label}>Payment plan basics</p>
            <h2 className={s.big} style={{ marginTop: 12 }}>
              What you pay, and when.
            </h2>
            <p style={{ marginTop: 18 }}>
              Exact amounts are in each apartment&apos;s payment schedule on the payment plans page and the project site.
            </p>
            <p style={{ marginTop: 16 }}>
              <Link className={s.actionLink} href="/payment-plans">
                Compare payment plans
              </Link>
            </p>
          </div>
          <PaymentBasics />
        </div>
      </section>

      {/* Documents checklist */}
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

      {/* Possession */}
      <section className={`${s.sec} ${s.onIvory2}`}>
        <div className={s.wrap}>
          <SectionHead label="Possession" title="How finishing and possession work." />
          <div className={s.prose}>
            <p>
              The last two payments fall on finishing and on possession. We do not publish a handover date until it is confirmed, so please ask the booking office for the current timeline.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ (first six) */}
      <section className={s.sec}>
        <div className={s.wrap}>
          <SectionHead label="Questions" title="Common questions." short />
          <FaqList limit={6} />
        </div>
      </section>

      <FinalCta />
    </CoShell>
  );
}
