import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { PageHero, ProjectTeaser } from "@/components/PageParts";
import { CtaBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ali's Twin Tower: ultra luxury 3, 4 and 5 room apartments in Scheme-33, Karachi, by Ali Zeeshan Enterprises.",
};

export default function ProjectsPage() {
  return (
    <Shell>
      <PageHero
        image="/hero/twin-tower-hero.jpg"
        imagePos="75% 50%"
        eyebrow="Projects"
        title="Work we are proud to sign."
        text="Our current project, Ali's Twin Tower, in Scheme-33, Karachi."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />
      <ProjectTeaser />
      <CtaBand />
    </Shell>
  );
}
