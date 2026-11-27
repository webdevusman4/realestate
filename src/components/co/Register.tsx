"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_FILTERS, PROJECTS, TYPE_FILTERS, projectHref } from "@/lib/company";
import s from "./co.module.css";

type Filter = (typeof PROJECT_FILTERS)[number];

/**
 * The project register: a typographic table of every project. Pointing at (or focusing) a row brings its picture
 * forward in the panel on the right. On small screens each row carries its own thumbnail instead.
 */
export default function Register({ filters = false }: { filters?: boolean }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [type, setType] = useState<(typeof TYPE_FILTERS)[number]>("All types");
  const [active, setActive] = useState(0);
  const list = PROJECTS.filter((p) => (filter === "All" || p.status === filter) && (type === "All types" || p.type === type));
  const current = list[Math.min(active, list.length - 1)];

  return (
    <div>
      {filters && (
        <div className={s.filterBar}>
          <div className={s.filters} role="group" aria-label="Filter projects by status">
            {PROJECT_FILTERS.map((f) => (
              <button key={f} type="button" aria-pressed={filter === f} onClick={() => { setFilter(f); setActive(0); }}>
                {f}
              </button>
            ))}
          </div>
          <div className={s.filters} role="group" aria-label="Filter projects by type">
            {TYPE_FILTERS.map((f) => (
              <button key={f} type="button" aria-pressed={type === f} onClick={() => { setType(f); setActive(0); }}>
                {f}
              </button>
            ))}
          </div>
          <p className={s.sr} role="status">{list.length} {list.length === 1 ? "project" : "projects"} shown</p>
        </div>
      )}
      <div className={s.register}>
        <div>
          <div className={s.regHead} aria-hidden="true">
            <span>Project</span>
            <span>Type</span>
            <span>Location</span>
            <span>Status</span>
          </div>
          {list.length === 0 && <p className={s.note}>No projects match these filters. Try &quot;All&quot;.</p>}
          <ul>
            {list.map((p, i) => (
              <li key={p.slug}>
                <Link href={projectHref(p)} className={s.regRow} data-active={current?.slug === p.slug} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                  <span className={s.regThumb} aria-hidden="true">
                    <Image src={p.image} alt="" fill sizes="84px" style={{ objectPosition: p.pos ?? "50% 50%" }} />
                  </span>
                  <strong>{p.name}</strong>
                  <span>{p.type}</span>
                  <span>{p.location}</span>
                  <span className={s.regStatus}>{p.status}</span>
                </Link>
              </li>
            ))}
          </ul>
          {list.some((p) => p.sample) && <p className={s.note}>Details for projects marked as sample on their pages are placeholders until the company confirms them.</p>}
        </div>
        <div className={s.preview} aria-hidden="true">
          {list.map((p) => (
            <div key={p.slug} data-on={current?.slug === p.slug}>
              <Image src={p.image} alt="" fill sizes="(max-width: 1080px) 0px, 40vw" style={{ objectPosition: p.pos ?? "50% 40%" }} />
            </div>
          ))}
          {current && (
            <div className={s.previewCap} style={{ opacity: 1 }}>
              {current.name}: {current.size}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
