"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { APARTMENTS, HERO_TOWERS, TWIN_TOWER, rs } from "@/lib/site";
import Stats from "./Stats";
import s from "./site.module.css";

/*
 * The three photo "towers" echo the three buildings in the logo: two with a rounded top corner and a roof
 * rising to the right, one with a roof sloping down. Shapes are in 0..1 units so they scale with the frame.
 */
/** Relative width and height of each tower frame. */
const TOWER_SIZE = [
  { w: 1.05, h: "76%" },
  { w: 0.9, h: "100%" },
  { w: 1.15, h: "62%" },
];

const TOWER_PATHS = [
  "M0,1 V0.22 Q0,0.13 0.2,0.11 L1,0 V1 Z",
  "M0,1 V0.13 Q0,0.06 0.22,0.05 L1,0 V1 Z",
  "M0,1 V0 L0.76,0.17 Q1,0.22 1,0.33 V1 Z",
];

export default function Hero() {
  const towersRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(0);

  // Cycle the "live on site" card.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setLive((i) => (i + 1) % APARTMENTS.length), 3800);
    return () => clearInterval(id);
  }, []);

  // Gentle pointer parallax on the towers (desktop pointers only).
  useEffect(() => {
    const el = towersRef.current;
    if (!el || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const apt = APARTMENTS[live];

  return (
    <section id="top" className={s.hero}>
      <div className={s.heroBg} aria-hidden="true">
        <span className={s.glowA} />
        <span className={s.glowB} />
      </div>

      <div className={`${s.wrap} ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Ali&apos;s Twin Tower · Karachi</p>
          <h1 className={s.h1}>
            Where prestige lives, <span className={s.goldText}>future belongs.</span>
          </h1>
          <p className={s.lead}>
            Ultra luxury 3, 4 &amp; 5 room apartments in Scheme-33, by Ali Zeeshan Enterprises. Spacious layouts,
            premium finishes and easy instalments.
          </p>
          <div className={s.ctaRow}>
            <Link className={`${s.btn} ${s.btnGold}`} href={`/projects/${TWIN_TOWER.slug}`}>
              See apartments &amp; prices
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className={`${s.btn} ${s.btnGhost}`} href="/contact">
              Book a visit
            </Link>
          </div>
          <ul className={s.heroChecks}>
            {["Floor plans & payment plans", "Bank loan option", "10% off on full cash"].map((t) => (
              <li key={t}>
                <Check size={16} strokeWidth={2.6} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className={s.towers} ref={towersRef}>
          <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
            <defs>
              {TOWER_PATHS.map((d, i) => (
                <clipPath key={i} id={`tower-${i}`} clipPathUnits="objectBoundingBox">
                  <path d={d} />
                </clipPath>
              ))}
            </defs>
          </svg>
          {HERO_TOWERS.map((t, i) => (
            <div key={t.src} className={s.tower} style={{ ["--i" as string]: i, ["--w" as string]: TOWER_SIZE[i].w, ["--h" as string]: TOWER_SIZE[i].h }}>
              <div className={s.towerMove}>
                <svg className={s.towerLine} viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true">
                  <path d={TOWER_PATHS[i]} vectorEffect="non-scaling-stroke" />
                </svg>
                <div className={s.towerClip} style={{ clipPath: `url(#tower-${i})` }}>
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    priority
                    sizes="(max-width: 900px) 33vw, 20vw"
                    style={{ objectFit: "cover", objectPosition: t.pos }}
                    className={s.towerImg}
                  />
                </div>
              </div>
            </div>
          ))}
          <span className={s.baseLine} aria-hidden="true" />

          <div className={s.live} aria-live="polite">
            <span className={s.liveTag}>
              <i aria-hidden="true" />
              Now booking
            </span>
            <div key={apt.slug} className={s.liveBody}>
              <b>
                Twin Tower · {apt.type}
              </b>
              <small>
                {apt.beds} bedroom{apt.beds > 1 ? "s" : ""} · {apt.rooms} rooms
              </small>
              <div className={s.liveBar} aria-hidden="true">
                <span style={{ width: "100%" }} />
              </div>
              <em>{rs(apt.total)}</em>
            </div>
          </div>
        </div>
      </div>

      <div className={s.wrap}>
        <Stats />
      </div>
    </section>
  );
}
