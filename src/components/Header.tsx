"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, ArrowRight } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { Brand, WhatsAppLogo } from "./icons";
import s from "./site.module.css";

/**
 * Fixed header: transparent over the hero, ink glass once the page scrolls.
 * The nav highlights the current page, and phones get a full-screen menu.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <a className={s.skip} href="#main">
        Skip to content
      </a>
      <header className={`${s.header} ${scrolled || open ? s.headerOn : ""}`}>
        <div className={`${s.wrap} ${s.headerIn}`}>
          <Brand onClick={close} />
          <nav className={s.nav} aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className={s.headerActions}>
            <a className={s.headerPhone} href={SITE.phoneHref}>
              <Phone size={16} strokeWidth={2.2} aria-hidden="true" />
              {SITE.phone}
            </a>
            <Link className={`${s.btn} ${s.btnGold} ${s.btnSm}`} href="/contact">
              Free estimate
            </Link>
            <button
              className={s.menuBtn}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-menu" className={`${s.sheet} ${open ? s.sheetOpen : ""}`} hidden={!open}>
        <nav aria-label="Menu">
          {NAV.map((n, i) => (
            <Link key={n.href} href={n.href} onClick={close} style={{ transitionDelay: `${60 + i * 40}ms` }}>
              {n.label}
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className={s.sheetActions}>
          <Link className={`${s.btn} ${s.btnGold}`} href="/contact" onClick={close}>
            Get a free estimate
          </Link>
          <a className={`${s.btn} ${s.btnGhost}`} href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer">
            <WhatsAppLogo size={18} />
            WhatsApp us
          </a>
        </div>
      </div>
    </>
  );
}
