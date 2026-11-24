import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import { PageHero } from "@/components/PageParts";
import { About, CtaBand, Why } from "@/components/Sections";
import s from "@/components/site.module.css";

export const metadata: Metadata = {
  title: "About us",
  description: "Who we are, why clients trust us and how a project runs from the first visit to handover.",
};

export default function AboutPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="About us"
        title="Builders you can visit on site any day."
        text="Honest pricing, quality materials and a team that answers its phone."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <About />
      <section className={s.statsBand} aria-label="Our numbers">
        <div className={s.wrap}>
          <Stats />
        </div>
      </section>
      <Why />
      <Process />
      <CtaBand />
    </Shell>
  );
}
