"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_FILTERS, PROJECTS, projectHref } from "@/lib/company";
import s from "./site.module.css";

type Filter = (typeof PROJECT_FILTERS)[number];

/** Project gallery with status filters. "All" uses a featured layout; filtered views use an even grid. */
export default function Projects({ dark = true, heading = true }: { dark?: boolean; heading?: boolean }) {
  const [filter, setFilter] = useState<Filter>("All");
  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.status === filter);

  return (
    <section id="projects" className={`${s.sec} ${dark ? s.secDark : ""}`}>
      <div className={s.wrap}>
        <div className={s.secHead} data-r>
          <div>
            {heading && (
              <>
                <p className={`${s.eyebrow} ${dark ? s.eyebrowDark : ""}`}>Projects</p>
                <h2 className={s.h2}>Our projects.</h2>
              </>
            )}
          </div>
          <div className={`${s.filters} ${dark ? "" : s.filtersLight}`} role="group" aria-label="Filter projects">
            {PROJECT_FILTERS.map((f) => (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <ul className={`${s.projects} ${filter === "All" ? s.projectsAll : ""}`} key={filter}>
          {list.map((p, i) => (
            <li key={p.slug} className={s.project} style={{ ["--i" as string]: i }}>
              <Link href={projectHref(p)} aria-label={`${p.name}: ${p.status}`}>
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes={i === 0 && filter === "All" ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"}
                  style={{ objectFit: "cover", objectPosition: p.pos ?? "50% 50%" }}
                />
                <div className={s.projectInfo}>
                  <span className={`${s.projectType} ${p.status === "Now booking" ? s.projectOngoing : ""}`}>
                    {p.status} · {p.type}
                  </span>
                  <h3>{p.name}</h3>
                  <p>
                    {p.location} · {p.size}
                  </p>
                </div>
                {p.sample && <span className={s.cardSample}>Sample details</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
