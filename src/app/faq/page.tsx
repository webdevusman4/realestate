import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { JsonLd, PageHead, Visit } from "@/components/co/Parts";
import { FaqList, FinalCta } from "@/components/co/Sections";
import s from "@/components/co/co.module.css";
import { FAQ } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Questions and answers",
  description: "Answers about buying from Ali Zeeshan Enterprises: booking, payment plans, bank loans, cash discount and possession.",
  path: "/faq",
});

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <CoShell>
      <PageHead
        path="/faq"
        title="Questions and answers."
        text="If your question is not here, call the booking office."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />
      <section className={s.sec}>
        <div className={s.wrap}>
          <div style={{ maxWidth: 860 }}>
            <FaqList groups />
          </div>
        </div>
      </section>
      <FinalCta />
      <Visit surface="ivory" />
      <JsonLd data={ld} />
    </CoShell>
  );
}
