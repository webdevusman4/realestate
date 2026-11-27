"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { CO_NAV } from "@/lib/company";
import s from "./co.module.css";

export default function CoHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const raf = requestAnimationFrame(() => closeBtn.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !sheet.current) return;
      const items = Array.from(sheet.current.querySelectorAll<HTMLElement>("button, a"));
      if (items.length === 0) return;
      const a = items[0];
      const z = items[items.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    btn.current?.focus();
  };

  return (
    <>
      <a className={s.skip} href="#main">
        Skip to content
      </a>
      <div className={s.top}>
        <div className={`${s.wrap} ${s.topIn}`}>
          <span className={s.hideSm}>Booking office: Plot 25-B, Scheme-33, Karachi</span>
          <span>
            <span className={s.hideSm}>{SITE.hours}</span>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </span>
        </div>
      </div>
      <header className={s.header}>
        <div className={`${s.wrap} ${s.headerIn}`}>
          <Link className={s.brand} href="/" onClick={() => setOpen(false)} aria-label={`${SITE.name}, home`}>
            <Image src="/brand/mark-dark.png" alt="" width={224} height={292} priority />
            <span>
              <b>Ali Zeeshan Enterprises</b>
              <small>{SITE.tagline}</small>
            </span>
          </Link>
          <nav className={s.nav} aria-label="Main">
            {CO_NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={pathname === n.href || pathname.startsWith(`${n.href}/`) ? "page" : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link className={`${s.btn} ${s.btnGold}`} href="/contact">
            Book a site visit
          </Link>
          <button
            ref={btn}
            type="button"
            className={s.menuBtn}
            aria-expanded={open}
            aria-controls="co-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      <div id="co-menu" ref={sheet} className={s.sheet} hidden={!open} role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className={s.sheetBar}>
          <Link className={s.brand} href="/" onClick={() => setOpen(false)}>
            <Image src="/brand/mark-dark.png" alt="" width={224} height={292} />
            <span>
              <b>Ali Zeeshan Enterprises</b>
              <small>{SITE.tagline}</small>
            </span>
          </Link>
          <button ref={closeBtn} type="button" className={s.menuBtn} aria-label="Close menu" onClick={close}>
            <X size={22} />
          </button>
        </div>
        <nav aria-label="Menu">
          {CO_NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className={s.row}>
          <Link className={`${s.btn} ${s.btnGold}`} href="/contact" onClick={() => setOpen(false)}>
            Book a site visit
          </Link>
        </div>
      </div>
    </>
  );
}
