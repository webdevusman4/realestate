import Image from "next/image";
import Link from "next/link";
import { PROJECTS, projectHref } from "@/lib/company";
import { SITE, TT } from "@/lib/site";
import CoHeader from "./Header";
import { CO_NAV } from "@/lib/company";
import s from "./co.module.css";

/** Frame for every company page: header, main, footer and the phone bar on small screens. */
export default function CoShell({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <div className={s.root}>
      <CoHeader />
      <main id="main">{children}</main>
      <footer className={s.footer}>
        <div className={`${s.wrap} ${s.footGrid}`}>
          <div>
            <Image className={s.footLogo} src="/brand/logo-dark.png" alt={SITE.name} width={973} height={1079} />
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
              {[...CO_NAV, { label: "FAQ", href: "/faq" }, { label: "Careers", href: "/careers" }].map((n) => (
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
            <h3>Booking office</h3>
            <ul>
              <li>{SITE.address}</li>
              <li>{SITE.hours}</li>
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
            </ul>
          </div>
        </div>
        <div className={`${s.wrap} ${s.footBar}`}>
          <span>
            © {year} {SITE.name}. Registered {SITE.registered}. Member of ABAD and PEC.
          </span>
          <span className={s.legal}>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <span>Renders and plans are for illustration.</span>
          </span>
        </div>
      </footer>
      <nav className={s.mobileBar} aria-label="Quick contact">
        <a href={SITE.phoneHref}>Call</a>
        <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <Link href="/contact">Book a site visit</Link>
      </nav>
    </div>
  );
}
