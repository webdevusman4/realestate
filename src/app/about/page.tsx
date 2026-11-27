import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { Facts, Leaders, PageHead, SectionHead, Steps, Visit } from "@/components/co/Parts";
import s from "@/components/co/co.module.css";
import { STORY } from "@/lib/company";

export const metadata: Metadata = {
  title: "About us",
  description: "Ali Zeeshan Enterprises: a Karachi builder and real estate developer registered in 2019, member of ABAD and PEC.",
};

export default function AboutPage() {
  return (
    <CoShell>
      <PageHead title="A builder and developer in Karachi." text="Commercial buildings and residential projects, built and sold by one company." crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <section className={s.sec}>
        <div className={s.wrap}>
          <div className={s.cols2}>
            <div className={s.prose}>
              {STORY.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <Facts />
          </div>
        </div>
      </section>
      <section className={`${s.sec} ${s.onConcrete}`}>
        <div className={s.wrap}>
          <SectionHead label="Leadership" title="The people who sign the work." />
          <Leaders />
        </div>
      </section>
      <section className={s.sec}>
        <div className={s.wrap}>
          <SectionHead label="How a project runs" title="From the first visit to the keys." />
          <Steps />
        </div>
      </section>
      <Visit />
    </CoShell>
  );
}
