import type { Metadata } from "next";
import Link from "next/link";
import { ApartmentCards, BookBand, PageHero } from "@/components/PageParts";
import { APARTMENTS, TT, rs } from "@/lib/site";
import s from "@/components/site.module.css";

export const metadata: Metadata = {
  title: "Apartments: Type A, B & C",
  description: "Compare the 5, 4 and 3 room apartments at Ali's Twin Tower with floor plans, sizes and total cost.",
};

export default function ApartmentsPage() {
  return (
    <>
      <PageHero
        variant="tower"
        image="/hero/twin-tower-hero.jpg"
        imagePos="75% 55%"
        eyebrow="Apartments"
        title="Pick the layout that fits your family."
        text="Three layouts with 3, 2 or 1 bedrooms. Open any type for its floor plan and full payment schedule."
        crumbs={[{ label: "Overview", href: TT }, { label: "Apartments" }]}
      />
      <section className={s.sec}>
        <div className={s.wrap}>
          <ApartmentCards />
          <div data-r>
            <BookBand title="Not sure which type is right for you?" />
          </div>
        </div>
      </section>
      <section className={`${s.sec} ${s.secDark}`}>
        <div className={s.wrap}>
          <div className={s.secHead} data-r>
            <div>
              <p className={`${s.eyebrow} ${s.eyebrowDark}`}>Compare</p>
              <h2 className={s.h2}>The three types side by side.</h2>
            </div>
          </div>
          <div className={s.compareScroll} data-r>
            <table className={s.compareTable}>
              <thead>
                <tr>
                  <th scope="col"></th>
                  {APARTMENTS.map((a) => (
                    <th key={a.slug} scope="col">
                      <Link href={`${TT}/apartments/${a.slug}`}>{a.type}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Rooms", (a) => a.rooms],
                    ["Bedrooms", (a) => a.beds],
                    ["Bathrooms", (a) => a.baths],
                    ["Booking", (a) => rs(a.schedule[0].amount)],
                    ["Monthly instalment (× 60)", (a) => rs(a.monthly)],
                    ["Cash payable", (a) => rs(a.cashPayable)],
                    ["Expected loan", (a) => rs(a.loan)],
                  ] as [string, (a: (typeof APARTMENTS)[number]) => string | number][]
                ).map(([label, fn]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {APARTMENTS.map((a) => (
                      <td key={a.slug}>{fn(a)}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row">Total cost</th>
                  {APARTMENTS.map((a) => (
                    <td key={a.slug}>
                      <b>{rs(a.total)}</b>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
