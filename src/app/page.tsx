import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Projects from "@/components/Projects";
import { About, CtaBand, Footer, Leadership, Marquee, MobileBar, Services, Why } from "@/components/Sections";
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
    <>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Projects />
        <About />
        <Services />
        <Why />
        <Leadership />
        <CtaBand />
      </main>
      <Footer />
      <MobileBar />
      <Reveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
