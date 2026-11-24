import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarCheck, Camera, Check, Clock, Mail, MapPin, Phone, ReceiptText, ShieldCheck } from "lucide-react";
import { KEYWORDS, NAV, PROMISES, SERVICES, SITE, TT } from "@/lib/site";
import { WhatsAppLogo } from "./icons";
import s from "./site.module.css";

export function Marquee({ items = KEYWORDS }: { items?: readonly string[] }) {
  const row = [...items, ...items];
  return (
    <div className={s.marquee} aria-label="What we build">
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

export function About() {
  return (
    <section id="about" className={s.sec}>
      <div className={`${s.wrap} ${s.aboutGrid}`}>
        <div className={s.collage} data-r>
          <div className={s.collageMain}>
            <Image
              src="/photos/engineer-site.jpg"
              alt="Construction crew in hard hats and safety vests on site"
              fill
              sizes="(max-width: 900px) 100vw, 46vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={s.collageSmall}>
            <Image
              src="/photos/blueprints-team.jpg"
              alt="Engineers reviewing building drawings"
              fill
              sizes="(max-width: 900px) 40vw, 18vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={s.badge}>
            <b>Karachi</b>
            <span>
              Builders &amp;
              <br />
              Developers
            </span>
          </div>
        </div>
        <div className={s.aboutCopy} data-r>
          <p className={s.eyebrow}>About us</p>
          <h2 className={s.h2}>Built on trust, one project at a time.</h2>
          <p className={s.body}>
            {SITE.name} is a professionally managed business firm committed to delivering quality products and
            reliable services to its valued customers. With a strong focus on integrity, customer satisfaction and
            timely delivery, the company strives to build long-term relationships based on trust.
          </p>
          <ul className={s.checks}>
            {[
              ["Integrity", "Clear prices and honest dealing, written down."],
              ["Customer satisfaction", "A dedicated team with a customer-centric approach."],
              ["Timely delivery", "Long-term relationships built on trust."],
            ].map(([t, d]) => (
              <li key={t}>
                <span className={s.checkIcon}>
                  <Check size={16} strokeWidth={2.8} aria-hidden="true" />
                </span>
                <span>
                  <b>{t}</b>
                  {d}
                </span>
              </li>
            ))}
          </ul>
          <Link className={s.textLink} href="/contact">
            Talk to our team
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className={`${s.sec} ${s.secTint}`}>
      <div className={s.wrap}>
        <div className={s.secHead} data-r>
          <div>
            <p className={s.eyebrow}>Services</p>
            <h2 className={s.h2}>Everything it takes to build.</h2>
          </div>
          <p className={s.body}>
            One team for design, structure and finishing, so nothing falls between contractors.
          </p>
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

const PROMISE_ICONS = {
  quote: ReceiptText,
  materials: ShieldCheck,
  updates: Camera,
  schedule: CalendarCheck,
} as const;

export function Why() {
  return (
    <section id="why" className={s.sec}>
      <div className={`${s.wrap} ${s.whyGrid}`}>
        <div className={s.whyLeft} data-r>
          <p className={s.eyebrow}>Why {SITE.short}</p>
          <h2 className={s.h2}>No surprises. Just a clear plan.</h2>
          <p className={s.body}>
            Buying a home is a big decision. Here is what Ali&apos;s Twin Tower puts in writing.
          </p>
          <div className={s.whyPhoto}>
            <Image src="/photos/structure-concrete.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: "cover", objectPosition: "50% 35%" }} />
          </div>
        </div>
        <div className={s.promises}>
          {PROMISES.map((p, i) => {
            const Icon = PROMISE_ICONS[p.icon];
            return (
              <article key={p.title} className={s.promise} data-r>
                <span className={s.promiseNo}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.promiseIcon}>
                  <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className={s.ctaBand} aria-labelledby="cta-title">
      <Image src="/photos/hero-crane-sunset.jpg" alt="" fill sizes="100vw" className={s.ctaImg} />
      <div className={`${s.wrap} ${s.ctaIn}`} data-r>
        <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Ready when you are</p>
        <h2 id="cta-title" className={s.h2}>
          Ready to see <span className={s.goldText}>your new home?</span>
        </h2>
        <p className={s.lead}>Visit the site office in Scheme-33, or call us. We will explain the plans and the payment schedule.</p>
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
    { icon: MapPin, label: "Based in", value: SITE.area },
  ];
  return (
    <div className={s.contactCard}>
      <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Contact</p>
      <h2 className={s.h2}>Let&apos;s talk about your new home.</h2>
      <p className={s.lead}>Call or message the site office, or send the form and we will call you back.</p>
      <ul className={s.contactList}>
        {rows.map(({ icon: Icon, label, value, href }) => (
          <li key={label}>
            <span className={s.contactIcon}>
              <Icon size={18} strokeWidth={2} aria-hidden="true" />
            </span>
            <span>
              <small>{label}</small>
              {href ? <a href={href}>{value}</a> : <b>{value}</b>}
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
          <h3>Services</h3>
          <ul>
            {SERVICES.map((sv) => (
              <li key={sv.id}>
                <Link href="/services">{sv.title}</Link>
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
              <Link href={TT}>Ali&apos;s Twin Tower</Link>
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
          </ul>
        </div>
      </div>
      <div className={`${s.wrap} ${s.footBar}`}>
        <span>
          © {year} {SITE.name}
        </span>
        <span>Builders &amp; Developers · {SITE.area}</span>
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
