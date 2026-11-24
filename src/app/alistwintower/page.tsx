import { Check } from "lucide-react";
import { Marquee } from "@/components/Sections";
import { Amenities, ApartmentCards, BookBand, Lifestyle, LocationCard, ProjectStory } from "@/components/PageParts";
import { PlanSnapshot, TowerCta, TowerHero } from "@/components/TowerParts";
import { TOWER_KEYWORDS, TT, TWIN_TOWER } from "@/lib/site";
import Link from "next/link";
import s from "@/components/site.module.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name: TWIN_TOWER.name,
  description: TWIN_TOWER.summary,
  address: { "@type": "PostalAddress", streetAddress: "Plot 25B, Scheme-33, Deh Songhal", addressLocality: "Karachi", addressCountry: "PK" },
  telephone: "+92 320 9281567",
};

export default function TowerHome() {
  return (
    <>
      <TowerHero />
      <Marquee items={TOWER_KEYWORDS} navy />
      <ProjectStory />

      <section className={`${s.sec} ${s.secTint}`}>
        <div className={s.wrap}>
          <div className={s.secHead} data-r>
            <div>
              <p className={s.eyebrow}>Highlights</p>
              <h2 className={s.h2}>Finished the way you would finish your own home.</h2>
            </div>
            <p className={s.body}>Spacious layouts, premium finishes and plenty of natural light in every apartment.</p>
          </div>
          <ul className={s.ttFeatures}>
            {TWIN_TOWER.features.map((f) => (
              <li key={f.title} data-r>
                <span className={s.checkIcon}>
                  <Check size={16} strokeWidth={2.8} aria-hidden="true" />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={s.sec}>
        <div className={s.wrap}>
          <div className={s.secHead} data-r>
            <div>
              <p className={s.eyebrow}>Apartments</p>
              <h2 className={s.h2}>3, 4 &amp; 5 room apartments.</h2>
            </div>
            <Link className={s.textLink} href={`${TT}/apartments`}>
              Compare all types
            </Link>
          </div>
          <ApartmentCards />
        </div>
      </section>

      <PlanSnapshot />

      <section className={s.sec}>
        <div className={s.wrap}>
          <div className={s.secHead} data-r>
            <div>
              <p className={s.eyebrow}>Unmatched lifestyle</p>
              <h2 className={s.h2}>Inside every apartment.</h2>
            </div>
            <Link className={s.textLink} href={`${TT}/lifestyle`}>
              See more
            </Link>
          </div>
          <Lifestyle />
        </div>
      </section>

      <Amenities dark />

      <section className={s.sec}>
        <div className={s.wrap} data-r>
          <LocationCard />
          <BookBand title="Ready to book, or want to visit first?" />
        </div>
      </section>

      <TowerCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
