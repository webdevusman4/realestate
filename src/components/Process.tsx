"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/lib/site";
import s from "./site.module.css";

/**
 * Five steps on a rail. As the section scrolls through the viewport the gold line fills and each step lights up,
 * like a building going up floor by floor.
 */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const [done, setDone] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      const id = requestAnimationFrame(() => setDone(PROCESS.length - 1));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (r.bottom < -100 || r.top > vh + 100) return;
        // 0 when the rail's top reaches 85% of the viewport, 1 when its bottom reaches 45%.
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
        el.style.setProperty("--p", p.toFixed(3));
        setDone(Math.min(PROCESS.length - 1, Math.floor(p * PROCESS.length + 0.15) - 1));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="process" className={`${s.sec} ${s.secTint}`}>
      <div className={s.wrap}>
        <div className={s.secHead} data-r>
          <div>
            <p className={s.eyebrow}>How we work</p>
            <h2 className={s.h2}>From plot to keys in five steps.</h2>
          </div>
          <p className={s.body}>A clear plan, a fixed price and a schedule you can hold us to.</p>
        </div>
        <ol className={s.rail} ref={ref}>
          <i className={s.railFill} aria-hidden="true" />
          {PROCESS.map((st, i) => (
            <li key={st.title} className={i <= done ? s.stepOn : undefined}>
              <span className={s.stepDot} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
