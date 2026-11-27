import Image from "next/image";
import Link from "next/link";
import { PROJECTS, projectHref } from "@/lib/company";
import { SITE, TT } from "@/lib/site";
import TowerAssistant from "@/components/assistant/TowerAssistant";
import CoHeader from "./Header";
import s from "./co.module.css";

const SHOW_ASSISTANT = process.env.NEXT_PUBLIC_ROOT_ASSISTANT === "1" || process.env.NEXT_PUBLIC_ROOT_ASSISTANT === "true";

/** Frame for every company page: header, main, 5-column footer and mobile contact bar. */
export default function CoShell({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <div className={s.root}>
      <CoHeader />
      <main id="main">{children}</main>
      <footer className={s.footer}>
        <div className={`${s.wrap} ${s.footGrid}`}>
          <div>
            <div className={s.footWordmark}>
              <div className={s.goldRule} aria-hidden="true">
                <span>Est. {SITE.registered}</span>
              </div>
              <Image src="/brand/wordmark-dark.png" alt="Ali Zeeshan Enterprises" width={973} height={275} />
            </div>
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
              <li><Link href="/about">About</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/updates">Updates</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3>Buy</h3>
            <ul>
              <li><Link href="/payment-plans">Payment plans</Link></li>
              <li><Link href="/buying-guide">Buying guide</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href={TT}>Ali&apos;s Twin Tower site</Link></li>
            </ul>
          </div>
          <div>
            <h3>Booking office</h3>
            <ul>
              <li className={s.footText}>Plot 25-B, Scheme-33, Karachi</li>
              <li className={s.footText}>{SITE.hours}</li>
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
            <span className={s.footNote}>Renders and plans are for illustration.</span>
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
      {SHOW_ASSISTANT && <TowerAssistant />}
    </div>
  );
}
