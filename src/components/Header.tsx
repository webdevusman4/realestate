"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X, ArrowRight } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { Brand, WhatsAppLogo } from "./icons";
import s from "./site.module.css";

type NavItem = { label: string; href: string };

type HeaderProps = {
  nav?: readonly NavItem[];
  brand?: React.ReactNode;
  phone?: { label: string; href: string };
  whatsappHref?: string;
  cta?: NavItem;
  /** Navy colours for the Ali's Twin Tower project site. */
  tower?: boolean;
  /** Pages whose path must match exactly to count as current (the section's home page). */
  exact?: string;
};

/**
 * Fixed header: transparent over the hero, dark glass once the page scrolls.
 * The nav highlights the current page, and phones get a full-screen menu.
 * Used by both the company site (defaults) and the Twin Tower project site (props).
 */
export default function Header({
  nav = NAV,
  brand,
  phone = { label: SITE.phone, href: SITE.phoneHref },
  whatsappHref = SITE.whatsappHref,
  cta = { label: "Book a visit", href: "/contact" },
  tower,
  exact = "/",
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === exact ? pathname === href : pathname.startsWith(href));

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
      <header className={`${s.header} ${scrolled || open ? s.headerOn : ""} ${tower ? s.headerTower : ""}`}>
        <div className={`${s.wrap} ${s.headerIn}`}>
          {brand ?? <Brand onClick={close} />}
          <nav className={s.nav} aria-label="Main">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className={s.headerActions}>
            <a className={s.headerPhone} href={phone.href}>
              <Phone size={16} strokeWidth={2.2} aria-hidden="true" />
              {phone.label}
            </a>
            <Link className={`${s.btn} ${s.btnGold} ${s.btnSm}`} href={cta.href}>
              {cta.label}
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
      <div id="mobile-menu" className={`${s.sheet} ${tower ? s.sheetTower : ""} ${open ? s.sheetOpen : ""}`} hidden={!open}>
        <nav aria-label="Menu">
          {nav.map((n, i) => (
            <Link key={n.href} href={n.href} onClick={close} style={{ transitionDelay: `${60 + i * 40}ms` }}>
              {n.label}
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className={s.sheetActions}>
          <Link className={`${s.btn} ${s.btnGold}`} href={cta.href} onClick={close}>
            {cta.label}
          </Link>
          <a className={`${s.btn} ${s.btnGhost}`} href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <WhatsAppLogo size={18} />
            WhatsApp us
          </a>
        </div>
      </div>
    </>
  );
}
