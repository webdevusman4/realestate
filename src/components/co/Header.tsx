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
  const sheet = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const first = sheet.current?.querySelector<HTMLElement>("a");
    const raf = requestAnimationFrame(() => first?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !sheet.current) return;
      const items = [btn.current, ...Array.from(sheet.current.querySelectorAll<HTMLElement>("a"))].filter((x): x is HTMLElement => !!x);
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

  const close = () => setOpen(false);

  return (
    <>
      <a className={s.skip} href="#main">
        Skip to content
      </a>
      <div className={s.top}>
        <div className={`${s.wrap} ${s.topIn}`}>
          <span className={s.hideSm}>{SITE.address}</span>
          <span>
            <span className={s.hideSm}>{SITE.hours}</span>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </span>
        </div>
      </div>
      <header className={s.header}>
        <div className={`${s.wrap} ${s.headerIn}`}>
          <Link className={s.brand} href="/" onClick={close} aria-label={`${SITE.name}, home`}>
            <Image src="/brand/mark-light.png" alt="" width={224} height={292} priority />
            <span>
              <b>Ali Zeeshan Enterprises</b>
              <small>{SITE.tagline}</small>
            </span>
          </Link>
          <nav className={s.nav} aria-label="Main">
            {CO_NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link className={s.btn} href="/contact">
            Book a site visit
          </Link>
          <button ref={btn} type="button" className={s.menuBtn} aria-expanded={open} aria-controls="co-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
      <div id="co-menu" ref={sheet} className={s.sheet} hidden={!open}>
        <nav aria-label="Menu">
          {CO_NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={close}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className={s.row}>
          <Link className={s.btn} href="/contact" onClick={close}>
            Book a site visit
          </Link>
        </div>
      </div>
    </>
  );
}
