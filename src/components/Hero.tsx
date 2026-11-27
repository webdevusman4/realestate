import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FACTS } from "@/lib/company";
import { SITE, TT, TWIN_TOWER } from "@/lib/site";
import s from "./site.module.css";

/** Company home hero: full-width site photo, headline, two buttons, the current project card and the trust strip. */
export default function Hero() {
  return (
    <section id="top" className={s.cHero}>
      <Image src="/photos/hero-crane-sunset.jpg" alt="" fill priority sizes="100vw" className={s.cHeroImg} />
      <div className={s.cHeroVeil} aria-hidden="true" />
      <div className={`${s.wrap} ${s.cHeroIn}`}>
        <div className={s.cHeroCopy}>
          <p className={`${s.eyebrow} ${s.eyebrowDark}`}>{SITE.tagline} · {SITE.area}</p>
          <h1 className={s.h1}>
            We build, develop and <span className={s.goldText}>sell landmarks.</span>
          </h1>
          <p className={s.lead}>
            {SITE.name} builds commercial buildings and residential projects in Karachi. Our newest: Ali&apos;s Twin Tower.
          </p>
          <div className={s.ctaRow}>
            <Link className={`${s.btn} ${s.btnGold}`} href="/projects">
              See our projects
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className={`${s.btn} ${s.btnGhost}`} href="/contact">
              Contact us
            </Link>
          </div>
        </div>
        <Link href={TT} className={s.cHeroCard}>
          <span className={s.cHeroThumb}>
            <Image src="/hero/twin-tower-hero-mobile.jpg" alt="" fill sizes="160px" style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
          </span>
          <span>
            <small>Current project · Now booking</small>
            <b>{TWIN_TOWER.name}</b>
            <em>Scheme-33, Karachi</em>
          </span>
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
      <div className={s.wrap}>
        <dl className={s.cFacts}>
          {FACTS.map((f) => (
            <div key={f.label}>
              <dd>{f.value}</dd>
              <dt>{f.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
