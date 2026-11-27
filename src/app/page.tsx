import CoShell from "@/components/co/Shell";
import Register from "@/components/co/Register";
import { Hero, Leaders, SectionHead, ServicesLedger, Spotlight, Statement, Visit } from "@/components/co/Parts";
import s from "@/components/co/co.module.css";
import { SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  description: SITE.description,
  telephone: SITE.phone,
  email: SITE.email,
  foundingDate: String(SITE.registered),
  address: { "@type": "PostalAddress", streetAddress: "Plot 25-B, Scheme-33", addressLocality: "Karachi", addressCountry: "PK" },
  areaServed: SITE.area,
};

export default function Home() {
  return (
    <CoShell>
      <Hero />
      <Statement />
      <section className={`${s.sec} ${s.onConcrete}`} aria-labelledby="reg-title">
        <div className={s.wrap}>
          <div className={s.head2}>
            <p className={s.label}>Projects</p>
            <h2 id="reg-title">Every project, finished and coming.</h2>
          </div>
          <Register />
        </div>
      </section>
      <Spotlight />
      <section className={s.sec}>
        <div className={s.wrap}>
          <SectionHead label="What we do" title="We build the building, develop the project and sell the apartments." />
          <ServicesLedger />
        </div>
      </section>
      <section className={`${s.sec} ${s.onConcrete}`}>
        <div className={s.wrap}>
          <SectionHead label="Leadership" title="The people who sign the work." />
          <Leaders />
        </div>
      </section>
      <Visit />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </CoShell>
  );
}
