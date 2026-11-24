import type { Metadata } from "next";
import { LocationCard, PageHero } from "@/components/PageParts";
import { TowerCta } from "@/components/TowerParts";
import { TT } from "@/lib/site";
import s from "@/components/site.module.css";

export const metadata: Metadata = {
  title: "Location",
  description: "Visit the Ali's Twin Tower site office at Plot 25B, Scheme-33, Deh Songhal, Karachi.",
};

export default function LocationPage() {
  return (
    <>
      <PageHero
        variant="tower"
        image="/heroes/location.jpg"
        imagePos="50% 60%"
        eyebrow="Location"
        title="Scheme-33, Karachi."
        text="Plot 25B, Scheme-33, Deh Songhal. Visit the site office to see the project and talk to our team."
        crumbs={[{ label: "Overview", href: TT }, { label: "Location" }]}
      />
      <section className={s.sec}>
        <div className={s.wrap} data-r>
          <LocationCard />
        </div>
      </section>
      <TowerCta />
    </>
  );
}
