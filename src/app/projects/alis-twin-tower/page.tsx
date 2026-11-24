import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import Shell from "@/components/Shell";
import { ApartmentCards, BookBand, PageHero, TowerWordmark } from "@/components/PageParts";
import { APARTMENTS, TWIN_TOWER, rs } from "@/lib/site";
import s from "@/components/site.module.css";

export const metadata: Metadata = {
  title: "Ali's Twin Tower: ultra luxury apartments",
  description: `${TWIN_TOWER.summary} Floor plans and payment schedules for Type A, B and C.`,
};

export default function TwinTowerPage() {
  const lowest = Math.min(...APARTMENTS.map((a) => a.total));
  return (
    <Shell>
      <PageHero
        variant="tower"
        eyebrow="New project"
        title={<TowerWordmark size="lg" />}
        text={TWIN_TOWER.summary}
        crumbs={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: TWIN_TOWER.name }]}
      />

      <section className={`${s.sec} ${s.secTint}`}>
        <div className={s.wrap}>
          <div className={s.secHead} data-r>
            <div>
              <p className={s.eyebrow}>Highlights</p>
              <h2 className={s.h2}>Finished the way you would finish your own home.</h2>
            </div>
            <p className={s.body}>
              Apartments from {rs(lowest)}, with an easy monthly plan and a bank loan option. Status: {TWIN_TOWER.status}.
            </p>
          </div>
          <ul className={s.ttFeatures}>
            {TWIN_TOWER.features.map((f) => (
              <li key={f.title} data-r>
                <span className={s.checkIcon}>
                  <Check size={16} strokeWidth={2.8} aria-hidden="true" />
                </span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="apartments" className={s.sec}>
        <div className={s.wrap}>
          <div className={s.secHead} data-r>
            <div>
              <p className={s.eyebrow}>Apartment types</p>
              <h2 className={s.h2}>Pick the layout that fits your family.</h2>
            </div>
            <p className={s.body}>Open any type to see its full floor plan and payment schedule.</p>
          </div>
          <ApartmentCards />
          <div data-r>
            <BookBand title="Ready to book, or want to visit first?" />
          </div>
        </div>
      </section>

      <section className={`${s.sec} ${s.secDark}`}>
        <div className={`${s.wrap} ${s.compare}`}>
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
                      <Link href={`/projects/${TWIN_TOWER.slug}/${a.slug}`}>{a.type}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Rooms</th>
                  {APARTMENTS.map((a) => (
                    <td key={a.slug}>{a.rooms}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Bedrooms</th>
                  {APARTMENTS.map((a) => (
                    <td key={a.slug}>{a.beds}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Bathrooms</th>
                  {APARTMENTS.map((a) => (
                    <td key={a.slug}>{a.baths}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Booking</th>
                  {APARTMENTS.map((a) => (
                    <td key={a.slug}>{rs(a.schedule[0].amount)}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Cash payable</th>
                  {APARTMENTS.map((a) => (
                    <td key={a.slug}>{rs(a.cashPayable)}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Expected loan</th>
                  {APARTMENTS.map((a) => (
                    <td key={a.slug}>{rs(a.loan)}</td>
                  ))}
                </tr>
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
    </Shell>
  );
}
