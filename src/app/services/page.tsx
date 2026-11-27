import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { PageHead, ServicesLedger, Visit } from "@/components/co/Parts";
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
      <PageHead path="/services" title="What we do." text="We build the building, develop the project and sell the apartments, so you deal with one company." crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <section className={s.sec}>
        <div className={s.wrap}>
          <ServicesLedger />
        </div>
      </section>
      <FinalCta />
      <Visit />
    </CoShell>
  );
}
