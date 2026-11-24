import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { APARTMENTS, TOWER_NAV, TOWER_OFFICE, TOWER_STATS, TT, TWIN_TOWER, rs } from "@/lib/site";
import Header from "./Header";
import Stats from "./Stats";
import { MobileBar } from "./Sections";
import { WhatsAppLogo } from "./icons";
import s from "./site.module.css";

/** Logo lockup for the project header. */
export function TowerBrand() {
  return (
    <Link className={s.brand} href={TT} aria-label="Ali's Twin Tower, home">
      <Image src="/brand/twin-tower/mark-dark.png" alt="" width={224} height={285} className={s.brandMark} priority />
      <span className={s.brandText}>
        <b>Ali&apos;s</b>
        <small>Twin Tower</small>
      </span>
    </Link>
  );
}

export function TowerHeader() {
  return (
    <Header
      tower
      exact={TT}
      nav={TOWER_NAV}
      brand={<TowerBrand />}
      phone={{ label: TOWER_OFFICE.phone, href: TOWER_OFFICE.phoneHref }}
      whatsappHref={TOWER_OFFICE.whatsappHref}
      cta={{ label: "Book a visit", href: `${TT}/contact` }}
    />
  );
}

export function TowerMobileBar() {
  return <MobileBar phoneHref={TOWER_OFFICE.phoneHref} whatsappHref={TOWER_OFFICE.whatsappHref} cta={{ label: "Book a visit", href: `${TT}/contact` }} />;
}

export function TowerFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className={`${s.footer} ${s.footerTower}`}>
      <div className={`${s.wrap} ${s.footGrid}`}>
        <div className={s.footBrand}>
          <Image src="/brand/twin-tower/logo-dark.png" alt="Ali's Twin Tower" width={1513} height={1178} className={s.footLogoTower} />
          <p>{TWIN_TOWER.summary}</p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            {TOWER_NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Apartments</h3>
          <ul>
            {APARTMENTS.map((a) => (
              <li key={a.slug}>
                <Link href={`${TT}/apartments/${a.slug}`}>
                  {a.type} · {a.beds} bed
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Site office</h3>
          <ul>
            <li>{TOWER_OFFICE.address}</li>
            <li>
              <a href={TOWER_OFFICE.phoneHref}>{TOWER_OFFICE.phone}</a>
            </li>
            <li>
              <a href={TOWER_OFFICE.whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>{TOWER_OFFICE.hours}</li>
          </ul>
        </div>
      </div>
      <div className={`${s.wrap} ${s.footBar}`}>
        <span>
          © {year} Ali&apos;s Twin Tower · A project of <Link href="/">Ali Zeeshan Enterprises</Link>
        </span>
        <span>Plans and images are for illustration and may change.</span>
      </div>
    </footer>
  );
}

/** Overview hero: tagline, call-to-action, logo and key facts. */
export function TowerHero() {
  const from = Math.min(...APARTMENTS.map((a) => a.total));
  const has = (f: string) => fs.existsSync(path.join(process.cwd(), "public", "hero", f));
  const desktop = has("twin-tower-hero.jpg");
  const mobile = has("twin-tower-hero-mobile.jpg");
  return (
    <section className={`${s.tHero} ${desktop ? s.tHeroImg : ""}`}>
      <div className={s.tStage}>
        {desktop && (
          <div className={s.tHeroBg} aria-hidden="true">
            <picture>
              {mobile && <source media="(max-width: 700px)" srcSet="/hero/twin-tower-hero-mobile.jpg" />}
              <img src="/hero/twin-tower-hero.jpg" alt="" fetchPriority="high" />
            </picture>
          </div>
        )}
        <div className={`${s.wrap} ${s.tHeroGrid}`}>
          <div className={s.tHeroCopy}>
            <p className={`${s.eyebrow} ${s.eyebrowDark}`}>{TWIN_TOWER.kind} · Scheme-33, Karachi</p>
            <h1 className={s.h1}>
              Where prestige lives, <span className={s.goldText}>future belongs.</span>
            </h1>
            <p className={s.lead}>{TWIN_TOWER.summary}</p>
            <div className={s.ctaRow}>
              <Link className={`${s.btn} ${s.btnGold}`} href={`${TT}/apartments`}>
                See apartments
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className={`${s.btn} ${s.btnGhost}`} href={`${TT}/contact`}>
                Book a visit
              </Link>
            </div>
            <p className={s.tFrom}>
              Apartments from <b>{rs(from)}</b>
            </p>
          </div>
          <div className={s.tHeroLogo}>
            <Image src="/brand/twin-tower/logo-dark.png" alt="Ali's Twin Tower" width={1513} height={1178} priority sizes="(max-width: 900px) 70vw, 36vw" />
          </div>
        </div>
      </div>
      <div className={`${s.wrap} ${s.tStatsWrap}`}>
        <div className={s.tStatsCard}>
          <Stats stats={TOWER_STATS} />
        </div>
      </div>
    </section>
  );
}

/** Payment plan summary cards. */
export function PlanSnapshot() {
  return (
    <section className={`${s.sec} ${s.secTint}`}>
      <div className={s.wrap}>
        <div className={s.secHead} data-r>
          <div>
            <p className={s.eyebrow}>Payment plans</p>
            <h2 className={s.h2}>Easy to plan. Easy to pay.</h2>
          </div>
          <p className={s.body}>
            Book with a small amount, pay in 60 monthly instalments, and use a bank loan for the rest. Save 10% when you pay in full at booking.
          </p>
        </div>
        <ul className={s.snapGrid}>
          {APARTMENTS.map((a) => (
            <li key={a.slug} className={s.snap} data-r>
              <p className={s.aptRooms}>
                {a.type} · {a.beds} bed
              </p>
              <b className={s.snapTotal}>{rs(a.total)}</b>
              <dl>
                <div>
                  <dt>Booking</dt>
                  <dd>{rs(a.schedule[0].amount)}</dd>
                </div>
                <div>
                  <dt>Monthly × 60</dt>
                  <dd>{rs(a.monthly)}</dd>
                </div>
                <div>
                  <dt>Expected loan</dt>
                  <dd>{rs(a.loan)}</dd>
                </div>
              </dl>
              <Link className={s.textLink} href={`${TT}/payment-plans#${a.slug}`}>
                Full schedule
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Contact details card for the project site. */
export function TowerContactDetails() {
  const rows = [
    { icon: Phone, label: "Call the site office", value: TOWER_OFFICE.phone, href: TOWER_OFFICE.phoneHref },
    { icon: MapPin, label: "Address", value: TOWER_OFFICE.address, href: TOWER_OFFICE.mapsHref },
    { icon: Clock, label: "Visiting hours", value: TOWER_OFFICE.hours },
    { icon: Mail, label: "Email", value: TOWER_OFFICE.email, href: `mailto:${TOWER_OFFICE.email}` },
  ];
  return (
    <div className={s.contactCard}>
      <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Contact</p>
      <h2 className={s.h2}>Visit Ali&apos;s Twin Tower.</h2>
      <p className={s.lead}>Call or message the site office, or send the form and we will call you back.</p>
      <ul className={s.contactList}>
        {rows.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <span className={s.contactIcon}>
              <Icon size={18} strokeWidth={2} aria-hidden="true" />
            </span>
            <span>
              <small>{label}</small>
              {href ? (
                <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {value}
                </a>
              ) : (
                <b>{value}</b>
              )}
            </span>
          </li>
        ))}
      </ul>
      <a className={`${s.btn} ${s.btnWa}`} href={TOWER_OFFICE.whatsappHref} target="_blank" rel="noopener noreferrer">
        <WhatsAppLogo size={20} />
        Chat on WhatsApp
      </a>
    </div>
  );
}

/** Closing call to action. */
export function TowerCta() {
  return (
    <section className={`${s.sec} ${s.secTower}`}>
      <div className={`${s.wrap} ${s.tCta}`} data-r>
        <div>
          <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Book your apartment</p>
          <h2 className={s.h2}>
            Ready to see <span className={s.goldText}>your new home?</span>
          </h2>
          <p className={s.lead}>Visit the site office in Scheme-33, or call us. We will explain the plans and the payment schedule.</p>
        </div>
        <div className={s.ctaRow}>
          <Link className={`${s.btn} ${s.btnGold}`} href={`${TT}/contact`}>
            Book a visit
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a className={`${s.btn} ${s.btnGhost}`} href={TOWER_OFFICE.phoneHref}>
            <Phone size={18} aria-hidden="true" />
            {TOWER_OFFICE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
