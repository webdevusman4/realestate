import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Projects from "@/components/Projects";
import { PageHero, TwinTowerFeature } from "@/components/PageParts";
import { CtaBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Projects",
  description: "Our new apartment project, Ali's Twin Tower, plus homes and commercial buildings we have built.",
};

export default function ProjectsPage() {
  return (
    <Shell>
      <PageHero
        eyebrow="Projects"
        title="Work we are proud to sign."
        text="Our newest project, Ali's Twin Tower, and a selection of homes and commercial buildings."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />
      <TwinTowerFeature />
      <Projects />
      <CtaBand />
    </Shell>
  );
}
