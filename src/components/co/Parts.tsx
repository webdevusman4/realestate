import Image from "next/image";
import Link from "next/link";
import { PROJECTS, SERVICES, LEADERS, STORY } from "@/lib/company";
import { APARTMENTS, PROCESS, SITE, TOWER_OFFICE, TT, rs } from "@/lib/site";
import s from "./co.module.css";

export function Tag({ children = "Sample details" }: { children?: React.ReactNode }) {
  return <span className={s.tag}>{children}</span>;
}

/** Page opening for inner pages: breadcrumb, serif title and one sentence. */
export function PageHead({ title, text, crumbs }: { title: string; text?: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className={s.pageHead}>
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

export function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.heroText}>
        <h1>Buildings for the way Karachi lives and works.</h1>
        <p className={s.lede}>
          {SITE.name} is a builder and real estate developer. Our current project, Ali&apos;s Twin Tower in Scheme-33, is open for booking.
        </p>
        <div className={s.row}>
          <Link className={s.btn} href="/projects">
            See our projects
          </Link>
          <Link className={`${s.btn} ${s.btnLine}`} href="/contact">
            Book a site visit
          </Link>
        </div>
      </div>
      <div className={s.heroPic}>
        <Image src="/hero/twin-tower-hero-mobile.jpg" alt="Ali's Twin Tower at dusk (artist impression)" fill priority sizes="(max-width: 900px) 100vw, 58vw" />
        <Link className={s.plate} href={TT}>
          <small>Now booking · Scheme-33, Karachi</small>
          <b>Ali&apos;s Twin Tower</b>
          <span>Apartments from {rs(Math.min(...APARTMENTS.map((a) => a.total)))}</span>
        </Link>
      </div>
    </section>
  );
}

export function Facts() {
  const items = [
    { v: String(SITE.registered), l: "Company registered" },
    { v: "ABAD", l: "Association of Builders & Developers" },
    { v: "PEC", l: "Pakistan Engineering Council" },
    { v: String(PROJECTS.length), l: "Projects, finished and coming" },
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

export function Statement({ withFacts = true }: { withFacts?: boolean }) {
  return (
    <section className={`${s.sec} ${s.secTight}`}>
      <div className={s.wrap}>
        <div className={s.statement}>
          <p className={s.label}>The company</p>
          <h2>{STORY[0]}</h2>
        </div>
        {withFacts && <Facts />}
      </div>
    </section>
  );
}

export function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <div className={s.head2}>
      <p className={s.label}>{label}</p>
      <h2>{title}</h2>
    </div>
  );
}

/** Ali's Twin Tower: wide render with the three apartment types and their prices. */
export function Spotlight() {
  return (
    <section className={`${s.spot} ${s.sec}`}>
      <Image src="/hero/twin-tower-hero.jpg" alt="" fill sizes="100vw" />
      <div className={s.wrap}>
        <div className={s.spotIn}>
          <p className={s.label}>Open for booking</p>
          <h2>Ali&apos;s Twin Tower, in Scheme-33.</h2>
          <p>Ultra luxury 3, 4 and 5 room apartments with an American kitchen, wooden flooring and elegant false ceilings.</p>
          <div className={s.row}>
            <Link className={`${s.btn} ${s.btnLight}`} href={TT}>
              Visit the project site
            </Link>
            <Link className={`${s.btn} ${s.btnLineLight}`} href={`${TT}/payment-plans`}>
              Payment plans
            </Link>
          </div>
        </div>
        <div className={s.priceWrap}>
          <table className={s.price}>
            <caption className={s.sr}>Apartment types and total cost</caption>
            <thead>
              <tr>
                <th scope="col">Apartment</th>
                <th scope="col">Rooms</th>
                <th scope="col">Bedrooms</th>
                <th scope="col">Total cost</th>
              </tr>
            </thead>
            <tbody>
              {APARTMENTS.map((a) => (
                <tr key={a.slug}>
                  <th scope="row">
                    <Link href={`${TT}/apartments/${a.slug}`}>{a.type}</Link>
                  </th>
                  <td>{a.rooms}</td>
                  <td>{a.beds}</td>
                  <td>{rs(a.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function ServicesLedger() {
  return (
    <ul className={s.ledger}>
      {SERVICES.map((sv) => (
        <li key={sv.id}>
          <div>
            <h3>{sv.title}</h3>
            {sv.sample && (
              <small>
                <Tag />
              </small>
            )}
          </div>
          <p>{sv.text}</p>
          <p className={s.chips}>
            {sv.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function Leaders() {
  return (
    <ul className={s.ledger}>
      {LEADERS.map((l) => (
        <li key={l.name}>
          <h3>{l.name}</h3>
          <p>{l.role}</p>
          <p>{l.sample && <Tag>Sample role</Tag>}</p>
        </li>
      ))}
    </ul>
  );
}

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

export function Visit() {
  return (
    <section className={`${s.sec} ${s.onConcrete}`}>
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
