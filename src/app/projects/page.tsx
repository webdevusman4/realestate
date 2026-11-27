import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Projects from "@/components/Projects";
import { PageHero } from "@/components/PageParts";
import { CtaBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ali's Twin Tower, Zeeshan Pride, Ali's Tower, Ali Complex and our upcoming projects Ali's Bridge View and Ali Skyline.",
};

export default function ProjectsPage() {
  return (
    <Shell>
      <PageHero
        image="/hero/twin-tower-hero.jpg"
        imagePos="75% 50%"
        eyebrow="Projects"
        title="Our projects."
        text="Finished buildings, the project open for booking now, and what is coming next."
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]}
      />
      <Projects dark={false} heading={false} />
      <CtaBand />
    </Shell>
  );
}
