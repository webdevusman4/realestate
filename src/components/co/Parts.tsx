import Image from "next/image";
import Link from "next/link";
import { SERVICES, SERVICE_V2, LEADERS, STORY } from "@/lib/company";
import { APARTMENTS, PROCESS, SITE, TOWER_OFFICE, TT, rs } from "@/lib/site";
import { breadcrumbLd } from "@/lib/seo";
import s from "./co.module.css";

export function Tag({ children = "Sample details" }: { children?: React.ReactNode }) {
  return <span className={s.tag}>{children}</span>;
}

/** Structured data script tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/** Faint 4% stepped-tower silhouette watermark derived from mark-dark.png outline. */
export function TowerWatermark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 310" fill="none" stroke="currentColor" strokeWidth="6" aria-hidden="true">
      <path d="M98 110 V38 C98 22 114 14 128 14 V110" />
      <line x1="112" y1="22" x2="112" y2="105" />
      <path d="M56 175 V76 C56 58 72 48 92 48 H128 V175" />
      <line x1="74" y1="78" x2="74" y2="170" />
      <line x1="92" y1="78" x2="92" y2="170" />
      <path d="M36 286 V142 L106 88 V286" />
      <path d="M128 286 V112 L198 164 V286" />
      <line x1="152" y1="145" x2="152" y2="270" />
      <line x1="176" y1="162" x2="176" y2="270" />
    </svg>
  );
}

/** Inner page head: ink band with breadcrumb, uppercase Archivo H1, one sentence. */
export function PageHead({ title, text, crumbs, path }: { title: string; text?: string; crumbs: { label: string; href?: string }[]; path?: string }) {
  return (
    <section className={s.pageHead}>
      <JsonLd data={breadcrumbLd(crumbs, path)} />
      <div className={s.wrap}>
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              {i < crumbs.length - 1 && " / "}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

/** Home hero: ink band, stepped-tower watermark, uppercase Archivo H1 with gold "Karachi", Twin Tower render. */
export function Hero() {
  const minTotal = Math.min(...APARTMENTS.map((a) => a.total));
  return (
    <section className={s.hero}>
      <TowerWatermark className={s.towerWatermark} />
      <div className={s.heroText}>
        <p className={s.label}>Open for booking · Scheme-33, Karachi</p>
        <h1>
          Apartments and commercial buildings in{" "}
          <span className={s.heroAccent}>Karachi.</span>
        </h1>
        <p className={s.lede}>
          We build and sell our own projects. Ali&apos;s Twin Tower is open for booking. Visit the booking office and see the plans.
        </p>
        <div className={s.row}>
          <Link className={`${s.btn} ${s.btnGold}`} href="/projects">
            See our projects
          </Link>
          <Link className={`${s.btn} ${s.btnLineLight}`} href="/contact">
            Book a site visit
          </Link>
        </div>
      </div>
      <div className={s.heroPic}>
        <Image
          src="/hero/twin-tower-hero.jpg"
          alt="Ali's Twin Tower exterior at dusk, artist impression"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 58vw"
          className={s.heroImgDesk}
        />
        <Image
          src="/hero/twin-tower-hero-mobile.jpg"
          alt="Ali's Twin Tower exterior at dusk, artist impression"
          fill
          priority
          sizes="100vw"
          className={s.heroImgMob}
        />
        <Link className={s.plate} href={TT}>
          <small>Now booking · Ali&apos;s Twin Tower</small>
          <b>Ali&apos;s Twin Tower</b>
          <span>Apartments from {rs(minTotal)}</span>
        </Link>
      </div>
    </section>
  );
}

/** Four-cell facts row: registration year, ABAD, PEC, hours. */
export function Facts() {
  const items = [
    { v: String(SITE.registered), l: "Company registered" },
    { v: "ABAD", l: "Association of Builders & Developers" },
    { v: "PEC", l: "Pakistan Engineering Council" },
    { v: "10 – 8", l: "Booking office hours, 10 am to 8 pm" },
  ];
  return (
    <dl className={s.facts}>
      {items.map((f) => (
        <div key={f.l}>
          <dt>{f.l}</dt>
          <dd>{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Newsreader editorial statement (STORY[0]) on ivory-2 band with sample tag. */
export function Statement({ withFacts = true }: { withFacts?: boolean }) {
  return (
    <section className={`${s.sec} ${s.secTight} ${s.onIvory2}`}>
      <div className={s.wrap}>
        <div className={s.statement}>
          <p className={s.label}>The company</p>
          <div>
            <h2>{STORY[0]}</h2>
            <p className={s.note} style={{ marginTop: 16 }}>
              <Tag>Sample wording</Tag> This story is placeholder text until the owners send their own.
            </p>
          </div>
        </div>
        {withFacts && <Facts />}
      </div>
    </section>
  );
}

/** 3-col label + 9-col title section head. Uses Archivo uppercase if <= 6 words and short=true. */
export function SectionHead({ label, title, short = false }: { label: string; title: string; short?: boolean }) {
  return (
    <div className={s.head2}>
      <p className={s.label}>{label}</p>
      <h2 className={short ? s.shortHead : undefined}>{title}</h2>
    </div>
  );
}

/** Four service rows: 4:3 image with Representative image caption, title, text, chips, destination link. */
export function ServicesLedger({ twoSentence = false }: { twoSentence?: boolean }) {
  return (
    <ul className={s.servicesList}>
      {SERVICES.map((sv) => {
        const media = SERVICE_V2[sv.id];
        const src = media?.image ?? sv.image;
        const alt = media?.alt ?? sv.alt;
        return (
          <li key={sv.id}>
            <div className={s.servicePic}>
              <Image src={src} alt={alt} fill sizes="(max-width: 900px) 100vw, 25vw" />
              <span className={s.repCap}>Representative image</span>
            </div>
            <div>
              <h3>{sv.title}</h3>
              {sv.sample && <Tag>Sample wording</Tag>}
            </div>
            <div className={s.serviceBody}>
              <p>{twoSentence ? sv.text : sv.text}</p>
              <div className={s.chips}>
                {sv.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {media && (
                <Link className={s.actionLink} href={media.href}>
                  {media.cta}
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Leadership: monogram blocks (no photos), names real, roles sample-tagged. */
export function Leaders() {
  return (
    <div className={s.leaderGrid}>
      {LEADERS.map((l) => (
        <div key={l.name} className={s.leaderRow}>
          <div className={s.monogram} aria-hidden="true">
            {l.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className={s.leaderName}>{l.name}</div>
            <div className={s.leaderRole}>{l.role}</div>
            {l.sample && <Tag>Sample role</Tag>}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Five PROCESS steps as a numbered ledger. */
export function Steps() {
  return (
    <ol className={s.steps}>
      {PROCESS.map((p) => (
        <li key={p.title}>
          <h3>{p.title}</h3>
          <p>{p.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Contact detail table (office, hours, phone, email). */
export function Details() {
  return (
    <dl className={s.details}>
      <div>
        <dt>Booking office</dt>
        <dd>{SITE.address.replace(/^Booking office:\s*/, "")}</dd>
      </div>
      <div>
        <dt>Hours</dt>
        <dd>{SITE.hours}</dd>
      </div>
      <div>
        <dt>Phone</dt>
        <dd>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </dd>
      </div>
      <div>
        <dt>Email</dt>
        <dd>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </dd>
      </div>
    </dl>
  );
}

/** Visit us: detail table + map. Defaults to ivory-2; pass surface="ivory" when alternating after dark. */
export function Visit({ surface = "ivory-2" }: { surface?: "ivory" | "ivory-2" }) {
  const band = surface === "ivory" ? s.onIvory : s.onIvory2;
  return (
    <section className={`${s.sec} ${band}`}>
      <div className={`${s.wrap} ${s.visit}`}>
        <div>
          <p className={s.label}>Visit us</p>
          <h2>Visit the booking office.</h2>
          <Details />
          <div className={s.row}>
            <Link className={s.btn} href="/contact">
              Book a site visit
            </Link>
            <a className={`${s.btn} ${s.btnLine}`} href={TOWER_OFFICE.mapsHref} target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </div>
        </div>
        <iframe className={s.map} title="Map of the booking office in Scheme-33, Karachi" src={TOWER_OFFICE.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </section>
  );
}
