import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { Facts, Leaders, PageHead, SectionHead, Tag, Visit } from "@/components/co/Parts";
import { Certifications, FinalCta, Timeline, Values } from "@/components/co/Sections";
import s from "@/components/co/co.module.css";
import { STORY } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About us",
  description: "Ali Zeeshan Enterprises: a Karachi builder and real estate developer registered in 2019, member of ABAD and PEC.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <CoShell>
      <PageHead path="/about" title="A builder and developer in Karachi." text="Commercial buildings and residential projects, built and sold by one company." crumbs={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <section className={s.sec}>
        <div className={s.wrap}>
          <div className={s.cols2}>
            <div className={s.prose}>
              {STORY.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                <Tag>Sample wording</Tag> This story is placeholder text until the owners send their own.
              </p>
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
          <SectionHead label="Memberships" title="Registered with the bodies buyers look for." />
          <Certifications />
        </div>
      </section>
      <section className={`${s.sec} ${s.onConcrete}`}>
        <div className={s.wrap}>
          <SectionHead label="How we work" title="What we do, not what we claim." />
          <Values />
        </div>
      </section>
      <section className={s.sec}>
        <div className={s.wrap}>
          <SectionHead label="Timeline" title="From registration to Ali's Twin Tower." />
          <Timeline />
        </div>
      </section>
      <FinalCta title="Meet the team at the booking office." />
      <Visit />
    </CoShell>
  );
}
