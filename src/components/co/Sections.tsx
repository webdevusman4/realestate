import Image from "next/image";
import Link from "next/link";
import {
  BUY_STEPS, FAQ, IMAGE_MAP, PAYMENT_BASICS, PROJECTS, TIMELINE, UPDATES,
  VALUES_ACTIONS, WHY_US, projectHref, type Project, type Update
} from "@/lib/company";
import { APARTMENTS, SITE, TT, rs } from "@/lib/site";
import { SectionHead, Tag, TowerWatermark } from "./Parts";
import s from "./co.module.css";

/** Trust row: four cells separated by hairlines + Confirm membership numbers tag. */
export function TrustRow() {
  const items = [
    { k: `Registered ${SITE.registered}`, v: "Karachi builder and developer" },
    { k: "ABAD member", v: "Association of Builders & Developers" },
    { k: "PEC member", v: "Pakistan Engineering Council" },
    { k: SITE.hours, v: "Booking office hours" },
  ];
  return (
    <section className={s.trust} aria-label="Company credentials">
      <div className={s.wrap}>
        <ul className={s.trustIn}>
          {items.map((i) => (
            <li key={i.k}>
              <b>{i.k}</b>
              <span>{i.v}</span>
            </li>
          ))}
        </ul>
        <p className={s.trustTag}>
          <Tag>Confirm membership numbers</Tag>
        </p>
      </div>
    </section>
  );
}

/** Four numbered reasons to buy. */
export function WhyUs() {
  return (
    <section className={s.sec}>
      <div className={s.wrap}>
        <SectionHead label="Why buy from us" title="Four things you can check yourself." />
        <ol className={s.why}>
          {WHY_US.map((w) => (
            <li key={w.title}>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Five buying steps, compact or full. */
export function BuyingSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={`${s.steps} ${compact ? s.stepsCompact : ""}`}>
      {BUY_STEPS.map((b) => (
        <li key={b.title}>
          <h3>{b.title}</h3>
          <p>{compact ? b.text.split(". ")[0].replace(/\.$/, "") + "." : b.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Six payment-basics rows from PAYMENT_BASICS. */
export function PaymentBasics() {
  return (
    <dl className={s.payBasics}>
      {PAYMENT_BASICS.map((p) => (
        <div key={p.k}>
          <dt>{p.k}</dt>
          <dd>{p.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** FAQ accordion. Groups flag shows group headings (FAQ page); no groups for home. */
export function FaqList({ limit, groups = false }: { limit?: number; groups?: boolean }) {
  const list = limit ? FAQ.slice(0, limit) : FAQ;
  const names = groups ? Array.from(new Set(list.map((f) => f.group))) : [""];
  return (
    <div>
      {names.map((g) => (
        <div key={g || "all"} className={s.faqGroup}>
          {g && <h2 className={s.faqH}>{g}</h2>}
          {list
            .filter((f) => !g || f.group === g)
            .map((f) => (
              <details key={f.q} className={s.faq}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
        </div>
      ))}
    </div>
  );
}

/** How we work: VALUES_ACTIONS as a ruled ledger. */
export function Values() {
  return (
    <div className={s.values}>
      {VALUES_ACTIONS.map((v) => (
        <div key={v.title} className={s.valRow}>
          <h3>{v.title}</h3>
          <p>{v.text}</p>
        </div>
      ))}
    </div>
  );
}

/** Company timeline: 2019 real, rest sample. */
export function Timeline() {
  return (
    <ol className={s.timeline}>
      {TIMELINE.map((t) => (
        <li key={t.when + t.title}>
          <time>{t.when}</time>
          <div>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
            {t.sample && <Tag />}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** ABAD + PEC certification rows with confirm tags. */
export function Certifications() {
  return (
    <div className={s.certList}>
      <div className={s.certRow}>
        <div className={s.certAbbr}>ABAD</div>
        <div>
          <strong>Association of Builders &amp; Developers of Pakistan</strong>
          <p style={{ marginTop: 6 }}>We are members of ABAD.</p>
        </div>
        <Tag>Confirm membership number</Tag>
      </div>
      <div className={s.certRow}>
        <div className={s.certAbbr}>PEC</div>
        <div>
          <strong>Pakistan Engineering Council</strong>
          <p style={{ marginTop: 6 }}>We are registered with PEC.</p>
        </div>
        <Tag>Confirm registration category</Tag>
      </div>
    </div>
  );
}

/** Twin Tower featured block: right-60% render crop + text + payment mini-table. */
export function Featured() {
  const from = Math.min(...APARTMENTS.map((a) => a.total));
  return (
    <section className={`${s.sec} ${s.feat}`} aria-labelledby="feat-title">
      <div className={`${s.wrap} ${s.featIn}`}>
        <div className={s.featPic}>
          <Image src="/hero/twin-tower-featured.jpg" alt="Front facade of Ali's Twin Tower at dusk, artist impression" fill sizes="(max-width: 900px) 100vw, 55vw" />
          <span className={s.repCap}>Artist impression</span>
        </div>
        <div className={s.featText}>
          <p className={s.label}>Open for booking</p>
          <h2 id="feat-title">Ali&apos;s Twin Tower, Scheme-33.</h2>
          <p>3, 4 and 5 room apartments with an American kitchen, wooden flooring and false ceilings. Apartments from {rs(from)}.</p>
          <dl className={s.mini}>
            <div>
              <dt>Instalments</dt>
              <dd>60 monthly, 10 half-yearly</dd>
            </div>
            <div>
              <dt>Cash payment</dt>
              <dd>10% off at booking</dd>
            </div>
            <div>
              <dt>Bank loan</dt>
              <dd>Option shown in each schedule</dd>
            </div>
          </dl>
          <div className={s.row}>
            <Link className={`${s.btn} ${s.btnGold}`} href={TT}>
              Visit the project site
            </Link>
            <Link className={`${s.btn} ${s.btnLineLight}`} href="/payment-plans">
              See payment plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Single project card reading image from IMAGE_MAP. */
export function ProjectCard({ p }: { p: Project }) {
  const img = IMAGE_MAP[p.slug];
  const src = img?.card ?? p.image;
  const alt = img?.cardAlt ?? p.alt;
  const pos = img?.cardPos ?? p.pos ?? "50% 50%";
  return (
    <li className={s.card}>
      <Link href={projectHref(p)}>
        <span className={s.cardPic}>
          <Image src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" style={{ objectPosition: pos }} />
          <span className={s.repCap}>{img?.isArtistImpression ? "Artist impression" : "Representative image"}</span>
        </span>
        <b>{p.name}</b>
        <span>
          {p.status} · {p.type} · {p.location}
        </span>
      </Link>
    </li>
  );
}

/** Four related project cards. Same-type projects appear first. */
export function RelatedProjects({ current }: { current: Project }) {
  const others = PROJECTS.filter((o) => o.slug !== current.slug)
    .sort((a, b) => Number(b.type === current.type) - Number(a.type === current.type))
    .slice(0, 4);
  return (
    <ul className={s.cards}>
      {others.map((o) => (
        <ProjectCard key={o.slug} p={o} />
      ))}
    </ul>
  );
}

/** Single update row (project, date, title, text, 4:3 image). */
export function UpdateItem({ u }: { u: Update }) {
  return (
    <li className={s.update}>
      <div className={s.updateMeta}>
        <span>{u.project}</span>
        {u.date && <span>{u.date}</span>}
        {u.sample && <Tag>Example post</Tag>}
      </div>
      <div>
        <h2>{u.title}</h2>
        <p>{u.text}</p>
      </div>
      {u.image && (
        <div className={s.updatePic}>
          <Image src={u.image} alt={u.alt ?? ""} fill sizes="(max-width: 900px) 100vw, 30vw" />
          <span className={s.repCap}>{u.sample ? "Representative image" : "Artist impression"}</span>
        </div>
      )}
    </li>
  );
}

/** All (or limited) updates as a list. */
export function UpdatesList({ limit }: { limit?: number }) {
  const list = limit ? UPDATES.slice(0, limit) : UPDATES;
  return (
    <ul>
      {list.map((u) => (
        <UpdateItem key={u.slug} u={u} />
      ))}
    </ul>
  );
}

/** Final CTA band: ink, optional tower watermark (on inner pages without hero), gold-rule divider with text. */
export function FinalCta({ title = "See the apartments in person.", watermark = true }: { title?: string; watermark?: boolean }) {
  return (
    <section className={s.cta}>
      {watermark && <TowerWatermark className={s.ctaWatermark} />}
      <div className={`${s.wrap} ${s.ctaIn}`}>
        <div>
          <div className={s.goldRule} aria-hidden="true">
            <span>Booking office</span>
          </div>
          <h2>{title}</h2>
        </div>
        <div className={s.row}>
          <Link className={`${s.btn} ${s.btnGold}`} href="/contact">
            Book a site visit
          </Link>
          <a className={`${s.btn} ${s.btnLineLight}`} href={SITE.phoneHref}>
            Call {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
