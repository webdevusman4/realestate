import type { Metadata } from "next";
import Link from "next/link";
import CoShell from "@/components/co/Shell";
import Register from "@/components/co/Register";
import { Hero, JsonLd, Leaders, SectionHead, ServicesLedger, Statement, Visit } from "@/components/co/Parts";
import { BuyingSteps, FaqList, Featured, FinalCta, TrustRow, WhyUs } from "@/components/co/Sections";
import s from "@/components/co/co.module.css";
import { SITE } from "@/lib/site";
import { FAQ } from "@/lib/company";
import { companyLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: SITE.name, description: SITE.description, path: "/" });

export default function Home() {
  return (
    <CoShell>
      <Hero />
      <TrustRow />
      <Statement withFacts={false} />
      <section className={`${s.sec} ${s.onConcrete}`} aria-labelledby="reg-title">
        <div className={s.wrap}>
          <div className={s.head2}>
            <p className={s.label}>Projects</p>
            <h2 id="reg-title">Every project, finished and coming.</h2>
          </div>
          <Register />
        </div>
      </section>
      <Featured />
      <WhyUs />
      <section className={`${s.sec} ${s.onConcrete}`}>
        <div className={s.wrap}>
          <SectionHead label="How buying works" title="Five steps from first visit to possession." />
          <BuyingSteps compact />
          <p style={{ marginTop: 28 }}>
            <Link className={s.link} href="/buying-guide">
              Read the full buying guide
            </Link>
          </p>
        </div>
      </section>
      <section className={s.sec}>
        <div className={s.wrap}>
          <SectionHead label="What we do" title="We build the building, develop the project and sell the apartments." />
          <ServicesLedger />
        </div>
      </section>
      <section className={`${s.sec} ${s.onConcrete}`}>
        <div className={s.wrap}>
          <SectionHead label="Leadership" title="The people who sign the work." />
          <Leaders />
        </div>
      </section>
      <section className={s.sec}>
        <div className={s.wrap}>
          <SectionHead label="Questions" title="What buyers ask first." />
          <FaqList limit={5} />
          <p style={{ marginTop: 28 }}>
            <Link className={s.link} href="/faq">
              All {FAQ.length} questions
            </Link>
          </p>
        </div>
      </section>
      <FinalCta />
      <Visit />
      <JsonLd data={companyLd()} />
    </CoShell>
  );
}
