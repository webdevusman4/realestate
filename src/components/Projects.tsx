"use client";

import { useState } from "react";
import Image from "next/image";
import { PROJECT_FILTERS, PROJECTS } from "@/lib/site";
import s from "./site.module.css";

type Filter = (typeof PROJECT_FILTERS)[number];

/** Project gallery with category filters. "All" uses a featured layout; filtered views use an even grid. */
export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.type === filter);

  return (
    <section id="projects" className={`${s.sec} ${s.secDark}`}>
      <div className={s.wrap}>
        <div className={s.secHead} data-r>
          <div>
            <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Projects</p>
            <h2 className={s.h2}>Work we are proud to sign.</h2>
          </div>
          <div className={s.filters} role="group" aria-label="Filter projects">
            {PROJECT_FILTERS.map((f) => (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <ul className={`${s.projects} ${filter === "All" ? s.projectsAll : ""}`} key={filter}>
          {list.map((p, i) => (
            <li key={p.name} className={s.project} style={{ ["--i" as string]: i }}>
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes={i === 0 && filter === "All" ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"}
                style={{ objectFit: "cover", objectPosition: p.pos ?? "50% 50%" }}
              />
              <div className={s.projectInfo}>
                <span className={`${s.projectType} ${p.type === "Ongoing" ? s.projectOngoing : ""}`}>{p.type}</span>
                <h3>{p.name}</h3>
                <p>{p.meta}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
