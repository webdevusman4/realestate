"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/site";
import s from "./site.module.css";

/** Stat strip whose numbers count up the first time it comes into view. */
export default function Stats() {
  const ref = useRef<HTMLDListElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setT(1));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now() + 350;
        const tick = (now: number) => {
          const p = Math.min(1, Math.max(0, (now - start) / 1600));
          setT(1 - Math.pow(1 - p, 3));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <dl className={s.stats} ref={ref}>
      {STATS.map((st) => (
        <div key={st.label}>
          <dt>{st.label}</dt>
          <dd>
            {/* The final value is always in the accessible text; only the visible digits animate. */}
            <span aria-hidden="true">
              {Math.round(st.value * t)}
              {st.suffix}
            </span>
            <span className={s.srOnly}>
              {st.value}
              {st.suffix}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
