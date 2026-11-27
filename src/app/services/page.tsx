import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { PageHead, ServicesLedger, Visit } from "@/components/co/Parts";
import s from "@/components/co/co.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: "Commercial buildings, real estate development, residential apartments and booking support from Ali Zeeshan Enterprises.",
};

export default function ServicesPage() {
  return (
    <CoShell>
      <PageHead title="What we do." text="We build the building, develop the project and sell the apartments, so you deal with one company." crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <section className={s.sec}>
        <div className={s.wrap}>
          <ServicesLedger />
        </div>
      </section>
      <Visit />
    </CoShell>
  );
}
