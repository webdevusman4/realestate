import type { Metadata } from "next";
import Link from "next/link";
import CoShell from "@/components/co/Shell";
import { PageHead, Tag } from "@/components/co/Parts";
import { FinalCta } from "@/components/co/Sections";
import s from "@/components/co/co.module.css";
import { PAYMENT_BASICS, PAYMENT_COMPARE } from "@/lib/company";
import { APARTMENTS, EXTRA_CHARGES, PAYMENT_NOTES, TT, rs } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Payment plans for Ali's Twin Tower and how our plans work",
  description:
    "Payment plans from Ali Zeeshan Enterprises: booking amount, 60 monthly instalments, bank loan option and 10% cash discount for Ali's Twin Tower.",
  path: "/payment-plans",
});

export default function PaymentPlansPage() {
  return (
    <CoShell>
      {/* 1. Page head */}
      <PageHead
        path="/payment-plans"
        title="Payment plans."
        text="Real figures from the Ali's Twin Tower schedules. Other projects announce plans at launch."
        crumbs={[{ label: "Home", href: "/" }, { label: "Payment plans" }]}
      />

      {/* 2. Basics (PAYMENT_BASICS) */}
      <section className={s.sec}>
        <div className={s.wrap}>
          <div className={s.head2}>
            <p className={s.label}>How it works</p>
            <h2>Six things to know before you book.</h2>
          </div>
          <dl className={s.payBasics}>
            {PAYMENT_BASICS.map((p) => (
              <div key={p.k}>
                <dt>{p.k}</dt>
                <dd>{p.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3. Compare the three types (derived from APARTMENTS via PAYMENT_COMPARE) */}
      <section className={`${s.sec} ${s.onIvory2}`}>
        <div className={s.wrap}>
          <div className={s.head2}>
            <p className={s.label}>Ali&apos;s Twin Tower</p>
            <h2>Compare the three apartment types.</h2>
          </div>
          <p className={s.plansHint} aria-hidden="true">Scroll table horizontally →</p>
          <div className={s.plansScroll}>
            <table className={s.plansTable}>
              <caption className={s.sr}>Ali&apos;s Twin Tower payment plan comparison</caption>
              <thead>
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Rooms</th>
                  <th scope="col">Bedrooms</th>
                  <th scope="col">Total cost</th>
                  <th scope="col">Booking</th>
                  <th scope="col">Monthly instalment</th>
                  <th scope="col">Expected bank loan</th>
                  <th scope="col">Cash payable (10% off)</th>
                </tr>
              </thead>
              <tbody>
                {PAYMENT_COMPARE.map((a) => (
                  <tr key={a.slug}>
                    <th scope="row">
                      <Link href={`${TT}/apartments/${a.slug}`}>{a.type}</Link>
                    </th>
                    <td>{a.rooms}</td>
                    <td>{a.beds}</td>
                    <td>{rs(a.total)}</td>
                    <td>{rs(a.booking)}</td>
                    <td>{rs(a.monthly)}</td>
                    <td>{rs(a.loan)}</td>
                    <td>{rs(a.cashPayable)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={s.note}>
            Prices and schedules are for Ali&apos;s Twin Tower and are confirmed only in writing by the booking office.
          </p>
        </div>
      </section>

      {/* 4. Extra charges and exclusions */}
      <section className={s.sec}>
        <div className={s.wrap}>
          <div className={s.head2}>
            <p className={s.label}>Extra charges and exclusions</p>
            <h2>What is extra and what is not included.</h2>
          </div>
          <dl className={s.payBasics}>
            {EXTRA_CHARGES.map((c) => (
              <div key={c.label}>
                <dt>{c.label}</dt>
                <dd>{rs(c.amount)} (payable within 90 days of booking)</dd>
              </div>
            ))}
            <div>
              <dt>Not included</dt>
              <dd>{PAYMENT_NOTES[3]}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 5. Terms verbatim */}
      <section className={`${s.sec} ${s.onIvory2}`}>
        <div className={s.wrap}>
          <div className={s.head2}>
            <p className={s.label}>Terms</p>
            <h2>Payment terms from the schedule.</h2>
          </div>
          <ol className={s.payNotes}>
            {PAYMENT_NOTES.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Per-type schedule links */}
      <section className={s.sec}>
        <div className={s.wrap}>
          <div className={s.head2}>
            <p className={s.label}>Full schedules</p>
            <h2>See every payment for each apartment type.</h2>
          </div>
          <ul className={s.checks}>
            {APARTMENTS.map((a) => (
              <li key={a.slug}>
                <Link href={`${TT}/apartments/${a.slug}`} className={s.link}>
                  {a.type}: {a.rooms} rooms, {a.beds} bedrooms, total {rs(a.total)}
                </Link>
              </li>
            ))}
          </ul>
          <p className={s.note} style={{ marginTop: 24 }}>
            Prices and schedules are for Ali&apos;s Twin Tower and are confirmed only in writing by the booking office.{" "}
            <Tag>Confirm with the office</Tag> Other projects announce payment plans at launch.
          </p>
        </div>
      </section>

      <FinalCta title="See the payment schedule in full at the booking office." />
    </CoShell>
  );
}
