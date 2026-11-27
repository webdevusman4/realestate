import Image from "next/image";
import Link from "next/link";
import { BUY_STEPS, FAQ, PAYMENT_BASICS, PROJECTS, TIMELINE, UPDATES, VALUES_ACTIONS, WHY_US, projectHref, type Project, type Update } from "@/lib/company";
import { APARTMENTS, SITE, TT, rs } from "@/lib/site";
import { SectionHead, Tag } from "./Parts";
import s from "./co.module.css";

/** Trust row: only facts the client gave us. */
export function TrustRow() {
  const items = [
    { k: `Registered ${SITE.registered}`, v: "Karachi builder and developer" },
    { k: "ABAD member", v: "Association of Builders & Developers" },
    { k: "PEC member", v: "Pakistan Engineering Council" },
    { k: SITE.hours, v: "Booking office hours" },
  ];
  return (
    <section className={s.trust} aria-label="Company credentials">
      <ul className={`${s.wrap} ${s.trustIn}`}>
        {items.map((i) => (
          <li key={i.k}>
            <b>{i.k}</b>
            <span>{i.v}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

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

export function BuyingSteps({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={s.steps}>
      {BUY_STEPS.map((b) => (
        <li key={b.title}>
          <h3>{b.title}</h3>
          <p>{compact ? b.text.split(". ")[0].replace(/\.$/, "") + "." : b.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function PaymentBasics() {
  return (
    <dl className={s.details}>
      {PAYMENT_BASICS.map((p) => (
        <div key={p.k}>
          <dt>{p.k}</dt>
          <dd>{p.v}</dd>
        </div>
      ))}
    </dl>
  );
}

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

export function Values() {
  return (
    <ul className={s.ledger}>
      {VALUES_ACTIONS.map((v) => (
        <li key={v.title}>
          <h3>{v.title}</h3>
          <p>{v.text}</p>
          <p />
        </li>
      ))}
    </ul>
  );
}

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

export function Certifications() {
  return (
    <ul className={s.ledger}>
      <li>
        <h3>ABAD</h3>
        <p>Association of Builders &amp; Developers of Pakistan. We are members.</p>
        <p>
          <Tag>Confirm membership number</Tag>
        </p>
      </li>
      <li>
        <h3>PEC</h3>
        <p>Pakistan Engineering Council. We are registered.</p>
        <p>
          <Tag>Confirm registration category</Tag>
        </p>
      </li>
    </ul>
  );
}

/** Twin Tower featured block with the real payment summary and the three apartment types. */
export function Featured() {
  const from = Math.min(...APARTMENTS.map((a) => a.total));
  return (
    <section className={`${s.sec} ${s.feat}`} aria-labelledby="feat-title">
      <div className={`${s.wrap} ${s.featIn}`}>
        <div className={s.featPic}>
          <Image src="/hero/twin-tower-hero.jpg" alt="Ali's Twin Tower at dusk (artist impression)" fill sizes="(max-width: 900px) 100vw, 55vw" />
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
            <Link className={s.btn} href={TT}>
              Visit the project site
            </Link>
            <Link className={`${s.btn} ${s.btnLine}`} href={`${TT}/payment-plans`}>
              See payment plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <li className={s.card}>
      <Link href={projectHref(p)}>
        <span className={s.cardPic}>
          <Image src={p.image} alt={p.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" style={{ objectPosition: p.pos ?? "50% 50%" }} />
        </span>
        <b>{p.name}</b>
        <span>
          {p.status} · {p.type} · {p.location}
        </span>
      </Link>
    </li>
  );
}

export function RelatedProjects({ current }: { current: Project }) {
  const others = PROJECTS.filter((o) => o.slug !== current.slug).sort((a, b) => Number(b.type === current.type) - Number(a.type === current.type)).slice(0, 4);
  return (
    <ul className={s.cards}>
      {others.map((o) => (
        <ProjectCard key={o.slug} p={o} />
      ))}
    </ul>
  );
}

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
        </div>
      )}
    </li>
  );
}

export function UpdatesList({ limit }: { limit?: number }) {
  return <ul className={s.updates}>{(limit ? UPDATES.slice(0, limit) : UPDATES).map((u) => <UpdateItem key={u.slug} u={u} />)}</ul>;
}

/** Closing call to action used above the footer. */
export function FinalCta({ title = "See the apartments in person." }: { title?: string }) {
  return (
    <section className={s.cta}>
      <div className={`${s.wrap} ${s.ctaIn}`}>
        <h2>{title}</h2>
        <div className={s.row}>
          <Link className={`${s.btn} ${s.btnLight}`} href="/contact">
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
