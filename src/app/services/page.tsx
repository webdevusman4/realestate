import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { PageHead, SectionHead, ServicesLedger, Steps, Tag, Visit } from "@/components/co/Parts";
import { FinalCta } from "@/components/co/Sections";
import s from "@/components/co/co.module.css";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description: "Commercial buildings, real estate development, residential apartments and booking support from Ali Zeeshan Enterprises.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <CoShell>
      <PageHead
        path="/services"
        title="What we do."
        text="We build the building, develop the project and sell the apartments, so you deal with one company."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <section className={s.sec}>
        <div className={s.wrap}>
          <ServicesLedger twoSentence />
        </div>
      </section>
      <section className={`${s.sec} ${s.onIvory2}`}>
        <div className={s.wrap}>
          <SectionHead label="Process" title="How a project runs." short />
          <p className={s.note} style={{ marginTop: 0, marginBottom: 24 }}>
            <Tag>Sample steps</Tag> The exact stages for each project are confirmed by the booking office.
          </p>
          <Steps />
        </div>
      </section>
      <FinalCta />
      <Visit surface="ivory" />
    </CoShell>
  );
}
