import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BedDouble, Bath, ChevronRight, Phone } from "lucide-react";
import { APARTMENTS, EXTRA_CHARGES, PAYMENT_NOTES, SITE, TWIN_TOWER, rs, type Apartment } from "@/lib/site";
import { WhatsAppLogo } from "./icons";
import s from "./site.module.css";

/** Dark banner at the top of every inner page, with breadcrumbs. */
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  variant,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  crumbs: { label: string; href?: string }[];
  variant?: "tower";
}) {
  return (
    <section className={`${s.pageHero} ${variant === "tower" ? s.pageHeroTower : ""}`}>
      <div className={`${s.wrap} ${s.pageHeroIn}`}>
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <ol>
            {crumbs.map((c, i) => (
              <li key={c.label}>
                {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight size={14} aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </nav>
        <p className={`${s.eyebrow} ${s.eyebrowDark}`}>{eyebrow}</p>
        <h1 className={s.pageTitle}>{title}</h1>
        {text && <p className={s.lead}>{text}</p>}
      </div>
    </section>
  );
}

/** Text stand-in for the Ali's Twin Tower logo until the logo file is added to public/brand/. */
export function TowerWordmark({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span className={`${s.towerMark} ${size === "lg" ? s.towerMarkLg : ""}`}>
      <b>Ali&apos;s</b>
      <i>Twin Tower</i>
    </span>
  );
}

/** Home page feature block for the new project. */
export function TwinTowerFeature() {
  return (
    <section className={`${s.sec} ${s.secTower}`} aria-labelledby="tt-title">
      <div className={`${s.wrap} ${s.ttGrid}`}>
        <div className={s.ttCopy} data-r>
          <p className={`${s.eyebrow} ${s.eyebrowDark}`}>New project</p>
          <TowerWordmark size="lg" />
          <h2 id="tt-title" className={s.ttTitle}>
            {TWIN_TOWER.tagline}
          </h2>
          <p className={s.lead}>{TWIN_TOWER.summary}</p>
          <ul className={s.ttFacts}>
            {APARTMENTS.map((a) => (
              <li key={a.slug}>
                <b>{a.type}</b>
                <span>
                  {a.beds} bed · {a.rooms} rooms
                </span>
                <em>{rs(a.total)}</em>
              </li>
            ))}
          </ul>
          <div className={s.ctaRow}>
            <Link className={`${s.btn} ${s.btnGold}`} href={`/projects/${TWIN_TOWER.slug}`}>
              See floor plans &amp; prices
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className={`${s.btn} ${s.btnGhost}`} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppLogo size={18} />
              Ask on WhatsApp
            </a>
          </div>
        </div>
        <div className={s.ttPlans} data-r>
          {APARTMENTS.map((a, i) => (
            <Link key={a.slug} href={`/projects/${TWIN_TOWER.slug}/${a.slug}`} className={s.ttPlan} style={{ ["--i" as string]: i }}>
              <Image src={a.plan} alt={a.planAlt} fill sizes="(max-width: 900px) 33vw, 18vw" style={{ objectFit: "cover", objectPosition: "50% 40%" }} />
              <span>{a.type}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Grid of the three apartment types. */
export function ApartmentCards() {
  return (
    <div className={s.aptGrid}>
      {APARTMENTS.map((a, i) => (
        <article key={a.slug} className={s.apt} data-r>
          <Link href={`/projects/${TWIN_TOWER.slug}/${a.slug}`} className={s.aptPlan} aria-label={`${a.type} floor plan`}>
            <Image src={a.plan} alt={a.planAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: "cover", objectPosition: "50% 40%" }} />
            <span className={s.aptNo}>{String(i + 1).padStart(2, "0")}</span>
          </Link>
          <div className={s.aptBody}>
            <p className={s.aptRooms}>{a.rooms} rooms</p>
            <h3>{a.type}</h3>
            <p>{a.headline}</p>
            <ul className={s.aptMeta}>
              <li>
                <BedDouble size={16} aria-hidden="true" /> {a.beds} bedroom{a.beds > 1 ? "s" : ""}
              </li>
              <li>
                <Bath size={16} aria-hidden="true" /> {a.baths} bath{a.baths > 1 ? "s" : ""}
              </li>
            </ul>
            <div className={s.aptPrice}>
              <small>Total cost</small>
              <b>{rs(a.total)}</b>
            </div>
            <Link className={s.textLink} href={`/projects/${TWIN_TOWER.slug}/${a.slug}`}>
              Floor plan &amp; payment plan
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

/** Payment schedule table plus extra charges and the important notes. */
export function PaymentSchedule({ apt }: { apt: Apartment }) {
  return (
    <div className={s.pay}>
      <table className={s.payTable}>
        <caption className={s.srOnly}>{apt.type} payment schedule</caption>
        <thead>
          <tr>
            <th scope="col">Mode of payment</th>
            <th scope="col">Amount (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {apt.schedule.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>{r.amount.toLocaleString("en-PK")}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Cash payable</th>
            <td>{apt.cashPayable.toLocaleString("en-PK")}</td>
          </tr>
          <tr>
            <th scope="row">Expected loan</th>
            <td>{apt.loan.toLocaleString("en-PK")}</td>
          </tr>
          <tr className={s.payTotal}>
            <th scope="row">Total cost</th>
            <td>{apt.total.toLocaleString("en-PK")}</td>
          </tr>
        </tfoot>
      </table>

      <div className={s.payAside}>
        <div className={s.payBox}>
          <h3>Extra charges</h3>
          <ul>
            {EXTRA_CHARGES.map((c) => (
              <li key={c.label}>
                <span>{c.label}</span>
                <b>{rs(c.amount)}</b>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.payBox}>
          <h3>Important notes</h3>
          <ol>
            {PAYMENT_NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

/** Call / WhatsApp prompt used under plans and prices. */
export function BookBand({ title }: { title: string }) {
  return (
    <div className={s.bookBand}>
      <div>
        <h3>{title}</h3>
        <p>Our team will explain the plan and the payment schedule and arrange a visit.</p>
      </div>
      <div className={s.ctaRow}>
        <a className={`${s.btn} ${s.btnGold}`} href={SITE.phoneHref}>
          <Phone size={18} aria-hidden="true" />
          Call {SITE.phone}
        </a>
        <a className={`${s.btn} ${s.btnGhost}`} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
          <WhatsAppLogo size={18} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}

