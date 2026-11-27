import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Mail, MapPin, Phone, ShieldCheck, Handshake, Hammer, Users } from "lucide-react";
import { KEYWORDS, NAV, SITE, TT, TOWER_OFFICE } from "@/lib/site";
import { PROJECTS, SERVICES, LEADERS, STORY, projectHref } from "@/lib/company";
import { WhatsAppLogo } from "./icons";
import s from "./site.module.css";

export function Marquee({ items = KEYWORDS, navy }: { items?: readonly string[]; navy?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className={`${s.marquee} ${navy ? s.marqueeNavy : ""}`} aria-label="What we do">
      <ul className={s.marqueeTrack}>
        {row.map((k, i) => (
          <li key={i} aria-hidden={i >= items.length ? "true" : undefined}>
            {k}
            <i aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Small tag shown on dummy (sample) details so they are easy to spot and replace. */
export function SampleTag({ children = "Sample details" }: { children?: React.ReactNode }) {
  return <span className={s.sampleTag}>{children}</span>;
}

export function About() {
  return (
    <section id="about" className={s.sec}>
      <div className={`${s.wrap} ${s.aboutGrid}`}>
        <div className={s.collage} data-r>
          <div className={s.collageMain}>
            <Image src="/hero/twin-tower-hero-mobile.jpg" alt="Ali's Twin Tower at dusk (artist impression)" fill sizes="(max-width: 900px) 100vw, 46vw" style={{ objectFit: "cover", objectPosition: "50% 35%" }} />
          </div>
          <div className={s.collageSmall}>
            <Image src="/photos/blueprints-team.jpg" alt="Engineers reviewing building drawings" fill sizes="(max-width: 900px) 40vw, 18vw" style={{ objectFit: "cover" }} />
          </div>
          <div className={s.badge}>
            <b>{SITE.registered}</b>
            <span>
              Registered
              <br />
              company
            </span>
          </div>
        </div>
        <div className={s.aboutCopy} data-r>
          <p className={s.eyebrow}>About us</p>
          <h2 className={s.h2}>Builders and developers, in Karachi.</h2>
          {STORY.map((p) => (
            <p key={p} className={s.body}>
              {p}
            </p>
          ))}
          <ul className={s.uniq}>
            {["ABAD member", "PEC registered", "Commercial & residential"].map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link className={s.textLink} href="/about">
            More about us
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Services({ detail }: { detail?: boolean }) {
  return (
    <section id="services" className={`${s.sec} ${s.secTint}`}>
      <div className={s.wrap}>
        <div className={s.secHead} data-r>
          <div>
            <p className={s.eyebrow}>What we do</p>
            <h2 className={s.h2}>Build it. Develop it. Sell it.</h2>
          </div>
          <p className={s.body}>One company for commercial buildings and real estate development, from the plot to the keys.</p>
        </div>
        <div className={s.services}>
          {SERVICES.map((sv, i) => (
            <article key={sv.id} className={s.service} data-r>
              <div className={s.serviceImg}>
                <Image src={sv.image} alt={sv.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" style={{ objectFit: "cover" }} />
                <span className={s.serviceNo}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className={s.serviceBody}>
                <h3>{sv.title}</h3>
                <p>{sv.text}</p>
                <ul className={s.tags}>
                  {sv.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {detail && sv.sample && <SampleTag />}
              </div>
              <Link className={s.serviceLink} href="/contact" aria-label={`Ask about ${sv.title}`}>
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const VALUES = [
  { icon: ShieldCheck, title: "Integrity", text: "Clear prices and honest dealing, written down for every client." },
  { icon: Hammer, title: "Quality work", text: "Quality products and reliable services for every customer." },
  { icon: Users, title: "Customer first", text: "A dedicated team and a customer-centric approach." },
  { icon: Handshake, title: "Trust that lasts", text: "Long-term relationships built on delivery, not promises." },
] as const;

export function Why() {
  return (
    <section id="why" className={s.sec}>
      <div className={`${s.wrap} ${s.whyGrid}`}>
        <div className={s.whyLeft} data-r>
          <p className={s.eyebrow}>Why {SITE.short}</p>
          <h2 className={s.h2}>What we stand for.</h2>
          <p className={s.body}>These are the values behind every building and every booking.</p>
          <div className={s.whyPhoto}>
            <Image src="/photos/structure-concrete.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: "cover", objectPosition: "50% 35%" }} />
          </div>
        </div>
        <div className={s.promises}>
          {VALUES.map((v, i) => (
            <article key={v.title} className={s.promise} data-r>
              <span className={s.promiseNo}>{String(i + 1).padStart(2, "0")}</span>
              <span className={s.promiseIcon}>
                <v.icon size={24} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Leadership cards. Names are from the client's form; there are no photos yet, so initials are shown. */
export function Leadership() {
  return (
    <section className={`${s.sec} ${s.secTint}`} aria-labelledby="lead-title">
      <div className={s.wrap}>
        <div className={s.secHead} data-r>
          <div>
            <p className={s.eyebrow}>Leadership</p>
            <h2 id="lead-title" className={s.h2}>The people behind the company.</h2>
          </div>
          <p className={s.body}>Photos and a short message from each director will be added here.</p>
        </div>
        <ul className={s.leaders}>
          {LEADERS.map((l) => (
            <li key={l.name} className={s.leader} data-r>
              <span className={s.leaderAvatar} aria-hidden="true">
                {l.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <h3>{l.name}</h3>
                <p>{l.role}</p>
                {l.sample && <SampleTag>Sample role</SampleTag>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className={s.ctaBand} aria-labelledby="cta-title">
      <Image src="/photos/hero-crane-sunset.jpg" alt="" fill sizes="100vw" className={s.ctaImg} />
      <div className={`${s.wrap} ${s.ctaIn}`} data-r>
        <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Visit us</p>
        <h2 id="cta-title" className={s.h2}>
          See our projects, <span className={s.goldText}>talk to our team.</span>
        </h2>
        <p className={s.lead}>Call or visit the booking office. We will explain the projects, the plans and the payment schedules.</p>
        <div className={s.ctaRow}>
          <Link className={`${s.btn} ${s.btnGold}`} href="/contact">
            Book a visit
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a className={`${s.btn} ${s.btnGhost}`} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
            <WhatsAppLogo size={18} />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

export function ContactDetails() {
  const rows = [
    { icon: Phone, label: "Call", value: SITE.phone, href: SITE.phoneHref },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Clock, label: "Office hours", value: SITE.hours },
    { icon: MapPin, label: "Booking office", value: SITE.address, href: TOWER_OFFICE.mapsHref },
  ];
  return (
    <div className={s.contactCard}>
      <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Contact</p>
      <h2 className={s.h2}>Let&apos;s talk.</h2>
      <p className={s.lead}>Call or message the office, or send the form and we will call you back.</p>
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
      <a className={`${s.btn} ${s.btnWa}`} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
        <WhatsAppLogo size={20} />
        Chat on WhatsApp
      </a>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={s.footer}>
      <div className={`${s.wrap} ${s.footGrid}`}>
        <div className={s.footBrand}>
          <Image src="/brand/logo-dark.png" alt={SITE.name} width={973} height={1079} className={s.footLogo} />
          <p>{SITE.description}</p>
        </div>
        <div>
          <h3>Projects</h3>
          <ul>
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <Link href={projectHref(p)}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href={TT}>Ali&apos;s Twin Tower site</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Get in touch</h3>
          <ul>
            <li>
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>{SITE.hours}</li>
            <li>{SITE.address}</li>
          </ul>
        </div>
      </div>
      <div className={`${s.wrap} ${s.footBar}`}>
        <span>
          © {year} {SITE.name}
        </span>
        <span>{SITE.tagline} · ABAD · PEC</span>
      </div>
    </footer>
  );
}

export function MobileBar({
  phoneHref = SITE.phoneHref,
  whatsappHref = SITE.whatsappHref,
  cta = { label: "Book a visit", href: "/contact" },
}: {
  phoneHref?: string;
  whatsappHref?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <>
      <a className={s.fab} href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <WhatsAppLogo size={28} />
      </a>
      <nav className={s.mobileBar} aria-label="Quick contact">
        <a href={phoneHref}>
          <Phone size={18} aria-hidden="true" />
          Call
        </a>
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
          <WhatsAppLogo size={18} />
          WhatsApp
        </a>
        <Link href={cta.href} className={s.mobileBarCta}>
          {cta.label}
        </Link>
      </nav>
    </>
  );
}
