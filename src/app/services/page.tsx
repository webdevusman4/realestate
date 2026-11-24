import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Process from "@/components/Process";
import { PageHero } from "@/components/PageParts";
import { CtaBand, Services } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Services",
  description: "Residential and commercial construction, grey structure, turnkey finishing, renovation and architecture.",
};

export default function ServicesPage() {
  return (
    <Shell>
      <PageHero
        image="/photos/structure-crane.jpg"
        imagePos="50% 45%"
        eyebrow="Services"
        title="Everything it takes to build."
        text="One team for design, structure and finishing, so nothing falls between contractors."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <Services />
      <Process />
      <CtaBand />
    </Shell>
  );
}
