import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import FloorPlan from "@/components/FloorPlan";
import { BookBand, PageHero, PaymentSchedule, RoomGallery } from "@/components/PageParts";
import { planFor } from "@/lib/plans";
import { APARTMENTS, TT, rs } from "@/lib/site";
import s from "@/components/site.module.css";

type Params = { type: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return APARTMENTS.map((a) => ({ type: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { type } = await params;
  const apt = APARTMENTS.find((a) => a.slug === type);
  if (!apt) return {};
  return {
    title: `${apt.type}: ${apt.rooms}-room apartment`,
    description: `${apt.headline} Total cost ${rs(apt.total)}. Floor plan and full payment schedule.`,
  };
}

export default async function ApartmentPage({ params }: { params: Promise<Params> }) {
  const { type } = await params;
  const apt = APARTMENTS.find((a) => a.slug === type);
  if (!apt) notFound();
  const others = APARTMENTS.filter((a) => a.slug !== apt.slug);

  return (
    <>
      <PageHero
        variant="tower"
        eyebrow={`${apt.rooms} rooms · ${apt.beds} bedroom${apt.beds > 1 ? "s" : ""}`}
        title={apt.type}
        text={apt.headline}
        crumbs={[
          { label: "Overview", href: TT },
          { label: "Apartments", href: `${TT}/apartments` },
          { label: apt.type },
        ]}
      />

      <section className={`${s.sec} ${s.secTint}`}>
        <div className={`${s.wrap} ${s.planGrid}`}>
          <figure className={s.planFig} data-r>
            <FloorPlan plan={planFor(apt.slug)} label={apt.planAlt} />
            <figcaption>Floor plan, not to scale. Sizes are as printed on the brochure.</figcaption>
          </figure>
          <div className={s.planInfo} data-r>
            <p className={s.eyebrow}>Floor plan</p>
            <h2 className={s.h2}>
              {apt.rooms} rooms, {apt.beds} bedroom{apt.beds > 1 ? "s" : ""}.
            </h2>
            <dl className={s.specs}>
              {apt.rooms_list.map((r) => (
                <div key={r.name}>
                  <dt>{r.name}</dt>
                  <dd>{r.size}</dd>
                </div>
              ))}
            </dl>
            <ul className={s.uniq}>
              {["American kitchen", "Wooden flooring", "Elegant false ceiling"].map((f) => (
                <li key={f}>
                  <Sparkles size={16} aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <div className={s.aptPrice}>
              <small>Total cost</small>
              <b>{rs(apt.total)}</b>
            </div>
          </div>
        </div>
      </section>

      <section className={s.sec}>
        <div className={s.wrap}>
          <div className={s.secHead} data-r>
            <div>
              <p className={s.eyebrow}>Room by room</p>
              <h2 className={s.h2}>Every room, up close.</h2>
            </div>
            <p className={s.body}>Each space from the {apt.type} plan, with its size.</p>
          </div>
          <RoomGallery apt={apt} />
        </div>
      </section>

      <section className={`${s.sec} ${s.secTint}`}>
        <div className={s.wrap}>
          <div className={s.secHead} data-r>
            <div>
              <p className={s.eyebrow}>Payment schedule</p>
              <h2 className={s.h2}>{apt.type} payment plan.</h2>
            </div>
            <p className={s.body}>
              Pay {rs(apt.cashPayable)} in cash over time, with an expected bank loan of {rs(apt.loan)}.
            </p>
          </div>
          <div data-r>
            <PaymentSchedule apt={apt} />
          </div>
          <BookBand title={`Interested in ${apt.type}?`} />
        </div>
      </section>

      <section className={`${s.sec} ${s.secDark}`}>
        <div className={s.wrap}>
          <div className={s.secHead} data-r>
            <div>
              <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Other types</p>
              <h2 className={s.h2}>See the other layouts.</h2>
            </div>
            <Link className={s.textLink} href={`${TT}/apartments`}>
              <ArrowLeft size={18} aria-hidden="true" />
              All apartments
            </Link>
          </div>
          <ul className={s.otherTypes}>
            {others.map((o) => (
              <li key={o.slug} data-r>
                <Link href={`${TT}/apartments/${o.slug}`}>
                  <span>
                    <b>{o.type}</b>
                    {o.beds} bed · {o.rooms} rooms
                  </span>
                  <em>{rs(o.total)}</em>
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
