import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Armchair,
  Baby,
  Bath,
  BedDouble,
  CarFront,
  Cctv,
  ChevronRight,
  CookingPot,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
  Sofa,
  Building2,
  ArrowUpDown,
  Zap,
} from "lucide-react";
import { AMENITIES, APARTMENTS, EXTRA_CHARGES, LIFESTYLE, PAYMENT_NOTES, TOWER_OFFICE, TT, TWIN_TOWER, rs, type Apartment } from "@/lib/site";
import { PLANS } from "@/lib/plans";
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

/** Company-site teaser for the Twin Tower project. Details live on the project site (TT). */
export function ProjectTeaser() {
  return (
    <section className={`${s.sec} ${s.secTower}`} aria-labelledby="tt-title">
      <div className={`${s.wrap} ${s.ttGrid}`}>
        <div className={s.ttCopy} data-r>
          <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Our current project</p>
          <h2 id="tt-title" className={s.ttTitle}>
            {TWIN_TOWER.name}
          </h2>
          <p className={s.ttTag}>{TWIN_TOWER.tagline}</p>
          <p className={s.lead}>{TWIN_TOWER.summary}</p>
          <div className={s.ctaRow}>
            <Link className={`${s.btn} ${s.btnGold}`} href={TT}>
              Visit the project site
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a className={`${s.btn} ${s.btnGhost}`} href={TOWER_OFFICE.phoneHref}>
              <Phone size={18} aria-hidden="true" />
              {TOWER_OFFICE.phone}
            </a>
          </div>
        </div>
        <Link href={TT} className={s.teaserLogo} data-r aria-label="Open the Ali's Twin Tower project site">
          <Image src="/brand/twin-tower/logo-dark.png" alt="Ali's Twin Tower" width={1513} height={1178} sizes="(max-width: 900px) 70vw, 34vw" />
        </Link>
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
          <Link href={`${TT}/apartments/${a.slug}`} className={s.aptPlan} aria-label={`${a.type} floor plan`}>
            <Image src={PLANS[a.slug].image} alt={a.planAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: "contain" }} />
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
            <Link className={s.textLink} href={`${TT}/apartments/${a.slug}`}>
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
export function PaymentSchedule({ apt, aside = true }: { apt: Apartment; aside?: boolean }) {
  return (
    <div className={aside ? s.pay : s.payOne}>
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

      {aside && <PaymentNotes />}
    </div>
  );
}

/** Extra charges and the important notes (same for every type). */
export function PaymentNotes() {
  return (
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
        <a className={`${s.btn} ${s.btnGold}`} href={TOWER_OFFICE.phoneHref}>
          <Phone size={18} aria-hidden="true" />
          Call {TOWER_OFFICE.phone}
        </a>
        <a className={`${s.btn} ${s.btnGhost}`} href={TOWER_OFFICE.whatsappHref} target="_blank" rel="noopener noreferrer">
          <WhatsAppLogo size={18} />
          WhatsApp
        </a>
      </div>
    </div>
  );
}


/** Room-by-room section: each room cut out of the plan, with its size. */
export function RoomGallery({ apt }: { apt: Apartment }) {
  const plan = PLANS[apt.slug];
  return (
    <ul className={s.roomGrid}>
      {plan.rooms.map((r) => (
        <li key={r.id} className={s.roomCard} data-r>
          <div className={s.roomPic}>
            <Image
              src={`/plans/${apt.slug}/${r.id}.jpg`}
              alt={`${r.name}${r.size ? `, ${r.size}` : ""}: close-up of the ${apt.type} floor plan`}
              fill
              sizes="(max-width: 560px) 100vw, (max-width: 1080px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className={s.roomText}>
            <h3>{r.name}</h3>
            {r.size && <p>{r.size}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}

const AMENITY_ICONS = {
  masjid: Landmark,
  parking: CarFront,
  cctv: Cctv,
  security: ShieldCheck,
  lifts: ArrowUpDown,
  play: Baby,
  lobby: Building2,
  standby: Zap,
} as const;

/** Salient features grid. */
export function Amenities({ dark }: { dark?: boolean }) {
  return (
    <section className={`${s.sec} ${dark ? s.secDark : ""}`} aria-labelledby="amen-title">
      <div className={s.wrap}>
        <div className={s.secHead} data-r>
          <div>
            <p className={`${s.eyebrow} ${dark ? s.eyebrowDark : ""}`}>Salient features</p>
            <h2 id="amen-title" className={s.h2}>
              Everything a modern family needs.
            </h2>
          </div>
          <p className={s.body}>Safety, comfort and convenience, built into {TWIN_TOWER.name}.</p>
        </div>
        <ul className={s.amenGrid}>
          {AMENITIES.map((a) => {
            const Icon = AMENITY_ICONS[a.icon];
            return (
              <li key={a.title} className={s.amen} data-r>
                <span className={s.amenIcon}>
                  <Icon size={26} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <b>{a.title}</b>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

const LIFE_ICONS = { kitchen: CookingPot, washroom: Bath, bedroom: BedDouble, living: Sofa, drawing: Armchair } as const;

/** "Unmatched lifestyle" cards. A card shows its render if public/renders/<id>.jpg exists. */
export function Lifestyle() {
  const have = (id: string) => fs.existsSync(path.join(process.cwd(), "public", "renders", `${id}.jpg`));
  return (
    <ul className={s.lifeGrid}>
      {LIFESTYLE.map((l) => {
        const Icon = LIFE_ICONS[l.id];
        const img = have(l.id);
        return (
          <li key={l.id} className={s.life} data-r>
            <div className={s.lifePic}>
              {img ? (
                <Image src={`/renders/${l.id}.jpg`} alt={`${l.title}: representative image`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" style={{ objectFit: "cover" }} />
              ) : (
                <Icon size={44} strokeWidth={1.3} aria-hidden="true" />
              )}
              {img && <span className={s.lifeNote}>Representative image</span>}
            </div>
            <div className={s.lifeText}>
              <h3>{l.title}</h3>
              <p>{l.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Site office address with map and call buttons. */
export function LocationCard() {
  return (
    <div className={s.locCard}>
      <span className={s.locIcon}>
        <MapPin size={26} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <div className={s.locText}>
        <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Site office</p>
        <h3>{TWIN_TOWER.name}</h3>
        <p>{TOWER_OFFICE.address}</p>
        <p>
          Mobile: <a href={TOWER_OFFICE.phoneHref}>{TOWER_OFFICE.phone}</a>
        </p>
      </div>
      <div className={s.ctaRow}>
        <a className={`${s.btn} ${s.btnGold}`} href={TOWER_OFFICE.mapsHref} target="_blank" rel="noopener noreferrer">
          <MapPin size={18} aria-hidden="true" />
          Open in Google Maps
        </a>
        <a className={`${s.btn} ${s.btnGhost}`} href={TOWER_OFFICE.phoneHref}>
          <Phone size={18} aria-hidden="true" />
          Call
        </a>
      </div>
    </div>
  );
}

/** "The project" story: text on the left, the building render on the right (if public/hero has one). */
export function ProjectStory() {
  const image = fs.existsSync(path.join(process.cwd(), "public", "hero", "twin-tower-hero-mobile.jpg"));
  const [lead, ...rest] = TWIN_TOWER.story;
  return (
    <section className={s.sec}>
      <div className={`${s.wrap} ${image ? s.storySplit : s.storyGrid}`}>
        <div className={s.storyCopy} data-r>
          <p className={s.eyebrow}>The project</p>
          <h2 className={s.h2}>A landmark in Scheme-33.</h2>
          <p className={s.storyLead}>{lead}</p>
          {rest.map((p) => (
            <p key={p} className={s.body}>
              {p}
            </p>
          ))}
          <ul className={s.uniq}>
            {["Scheme-33, Karachi", "3, 4 & 5 room apartments", "8 speedy lifts", "Showroom"].map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
        {image && (
          <figure className={s.storyFig} data-r>
            <Image src="/hero/twin-tower-hero-mobile.jpg" alt="Ali's Twin Tower at dusk, artist impression" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: "cover", objectPosition: "60% 40%" }} />
            <figcaption>Artist impression</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
