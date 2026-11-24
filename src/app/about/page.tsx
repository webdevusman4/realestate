import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Process from "@/components/Process";
import { PageHero } from "@/components/PageParts";
import { About, CtaBand, Why } from "@/components/Sections";

export const metadata: Metadata = {
  title: "About us",
  description: "Who we are, why clients trust us and how a project runs from the first visit to handover.",
};

export default function AboutPage() {
  return (
    <Shell>
      <PageHero
        image="/photos/engineer-site.jpg"
        imagePos="50% 35%"
        eyebrow="About us"
        title="Builders you can visit on site any day."
        text="Honest pricing, quality materials and a team that answers its phone."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <About />
      <Why />
      <Process />
      <CtaBand />
    </Shell>
  );
}
