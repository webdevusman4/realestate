import type { Metadata } from "next";
import Link from "next/link";
import { BookBand, PageHero, PaymentNotes, PaymentSchedule } from "@/components/PageParts";
import { APARTMENTS, TT, rs } from "@/lib/site";
import s from "@/components/site.module.css";

export const metadata: Metadata = {
  title: "Payment plans",
  description: "Full payment schedules for Type A, B and C: booking, 60 monthly instalments, half-yearly instalments, loan option and 10% off for cash.",
};

export default function PaymentPlansPage() {
  return (
    <>
      <PageHero
        variant="tower"
        image="/heroes/payment.jpg"
        imagePos="50% 40%"
        eyebrow="Payment plans"
        title="Easy to plan. Easy to pay."
        text="Booking, 60 monthly instalments, half-yearly instalments and slab-casting payments, with an expected bank loan. 10% discount on full cash payment at booking."
        crumbs={[{ label: "Overview", href: TT }, { label: "Payment plans" }]}
      />
      <section className={s.sec}>
        <div className={s.wrap}>
          <nav className={s.jump} aria-label="Jump to a type">
            {APARTMENTS.map((a) => (
              <a key={a.slug} href={`#${a.slug}`}>
                {a.type} · {rs(a.total)}
              </a>
            ))}
          </nav>
          {APARTMENTS.map((a) => (
            <div key={a.slug} id={a.slug} className={s.payBlock}>
              <div className={s.secHead} data-r>
                <div>
                  <p className={s.eyebrow}>
                    {a.rooms} rooms · {a.beds} bedroom{a.beds > 1 ? "s" : ""}
                  </p>
                  <h2 className={s.h2}>{a.type}</h2>
                </div>
                <Link className={s.textLink} href={`${TT}/apartments/${a.slug}`}>
                  Floor plan
                </Link>
              </div>
              <div data-r>
                <PaymentSchedule apt={a} aside={false} />
              </div>
            </div>
          ))}
          <div data-r>
            <PaymentNotes />
          </div>
          <BookBand title="Want a plan that fits your budget?" />
        </div>
      </section>
    </>
  );
}
