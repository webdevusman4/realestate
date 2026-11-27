import Link from "next/link";
import CoShell from "@/components/co/Shell";
import s from "@/components/co/co.module.css";
import { SITE } from "@/lib/site";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <CoShell>
      <section className={s.lost}>
        <div className={s.wrap}>
          <p className={s.lostNum} aria-hidden="true">404</p>
          <h1>This page does not exist.</h1>
          <p>The link may be old or mistyped. Try our projects, or call the booking office on {SITE.phone}.</p>
          <div className={s.row}>
            <Link className={`${s.btn} ${s.btnGold}`} href="/projects">
              See our projects
            </Link>
            <Link className={`${s.btn} ${s.btnLineLight}`} href="/">
              Go to the home page
            </Link>
          </div>
        </div>
      </section>
    </CoShell>
  );
}
