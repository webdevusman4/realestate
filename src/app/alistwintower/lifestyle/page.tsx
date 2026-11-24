import type { Metadata } from "next";
import { Amenities, Lifestyle, PageHero } from "@/components/PageParts";
import { TowerCta } from "@/components/TowerParts";
import { TT } from "@/lib/site";
import s from "@/components/site.module.css";

export const metadata: Metadata = {
  title: "Lifestyle & features",
  description: "American kitchen, tiled washrooms, spacious bedrooms, living and drawing rooms, plus a masjid, covered parking, CCTV, 24/7 security, 8 lifts and more.",
};

export default function LifestylePage() {
  return (
    <>
      <PageHero
        variant="tower"
        image="/renders/drawing.jpg"
        imagePos="50% 35%"
        eyebrow="Unmatched lifestyle"
        title="Designed for comfort, entertainment and privacy."
        crumbs={[{ label: "Home", href: TT }, { label: "Lifestyle" }]}
      />
      <section className={s.sec}>
        <div className={s.wrap}>
          <Lifestyle />
        </div>
      </section>
      <Amenities dark />
      <TowerCta />
    </>
  );
}
