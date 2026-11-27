import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Process from "@/components/Process";
import { PageHero } from "@/components/PageParts";
import { CtaBand, Services } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Services",
  description: "Commercial buildings, real estate development, residential apartments and booking support from Ali Zeeshan Enterprises.",
};

export default function ServicesPage() {
  return (
    <Shell>
      <PageHero
        image="/photos/structure-crane.jpg"
        imagePos="50% 45%"
        eyebrow="Services"
        title="Build it. Develop it. Sell it."
        text="One company for commercial buildings and real estate development, from the plot to the keys."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />
      <Services detail />
      <Process />
      <CtaBand />
    </Shell>
  );
}
