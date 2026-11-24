"use client";

import { useEffect } from "react";

/** Fades elements marked data-r into place the first time they scroll into view. */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-r]"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          // Stagger siblings that enter together.
          const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.hasAttribute("data-r")) : [];
          const idx = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = `${Math.min(idx, 5) * 70}ms`;
          el.setAttribute("data-in", "");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
