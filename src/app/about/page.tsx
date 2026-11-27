import type { Metadata } from "next";
import Shell from "@/components/Shell";
import Process from "@/components/Process";
import { PageHero } from "@/components/PageParts";
import { About, CtaBand, Leadership, Why } from "@/components/Sections";

export const metadata: Metadata = {
  title: "About us",
  description: "Ali Zeeshan Enterprises: a Karachi builder and real estate developer registered in 2019, member of ABAD and PEC.",
};

export default function AboutPage() {
  return (
    <Shell>
      <PageHero
        image="/photos/engineer-site.jpg"
        imagePos="50% 35%"
        eyebrow="About us"
        title="Builders and developers, in Karachi."
        text="Commercial buildings and residential projects, built and sold by one company."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <About />
      <Leadership />
      <Why />
      <Process />
      <CtaBand />
    </Shell>
  );
}
