import type { Metadata } from "next";
import Link from "next/link";
import CoShell from "@/components/co/Shell";
import Register from "@/components/co/Register";
import { Hero, JsonLd, SectionHead, ServicesLedger, Statement, Visit } from "@/components/co/Parts";
import { BuyingSteps, FaqList, Featured, FinalCta, TrustRow, WhyUs } from "@/components/co/Sections";
import s from "@/components/co/co.module.css";
import { SITE } from "@/lib/site";
import { FAQ } from "@/lib/company";
import { companyLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `${SITE.name} | ${SITE.tagline}, ${SITE.area}`,
  description: SITE.description,
  path: "/",
});

export default function Home() {
  return (
    <CoShell>
      {/* 1. Hero (ink) */}
      <Hero />
      {/* 2. Trust row (ivory) */}
      <TrustRow />
      {/* 3. Editorial statement (ivory-2) */}
      <Statement withFacts={false} />
      {/* 4. Project register (ivory) */}
      <section className={`${s.sec} ${s.onIvory}`} aria-labelledby="reg-title">
        <div className={s.wrap}>
          <div className={s.head2}>
            <p className={s.label}>Projects</p>
            <h2 id="reg-title" className={s.shortHead}>Every project, finished and coming.</h2>
          </div>
          <Register />
        </div>
      </section>
      {/* 5. Featured project (ink) */}
      <Featured />
      {/* 6. Why buy from us (ivory) */}
      <WhyUs />
      {/* 7. How buying works (ivory-2) */}
      <section className={`${s.sec} ${s.onIvory2}`}>
        <div className={s.wrap}>
          <SectionHead label="How buying works" title="Five steps from first visit to possession." />
          <BuyingSteps compact />
          <p style={{ marginTop: 20 }}>
            <Link className={s.actionLink} href="/buying-guide">
              Read the full buying guide
            </Link>
          </p>
        </div>
      </section>
      {/* 8. What we do (ivory) */}
      <section className={`${s.sec} ${s.onIvory}`}>
        <div className={s.wrap}>
          <SectionHead label="What we do" title="We build the building, develop the project and sell the apartments." />
          <ServicesLedger />
        </div>
      </section>
      {/* 9. Questions (ivory-2) */}
      <section className={`${s.sec} ${s.onIvory2}`}>
        <div className={s.wrap}>
          <SectionHead label="Questions" title="What buyers ask first." short />
          <FaqList limit={5} />
          <p style={{ marginTop: 20 }}>
            <Link className={s.actionLink} href="/faq">
              All {FAQ.length} questions
            </Link>
          </p>
        </div>
      </section>
      {/* Final CTA (ink, no second watermark on Home) + Visit us (ivory) */}
      <FinalCta watermark={false} />
      <Visit surface="ivory" />
      <JsonLd data={companyLd()} />
    </CoShell>
  );
}
