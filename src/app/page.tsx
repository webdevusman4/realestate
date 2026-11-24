import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { ProjectTeaser } from "@/components/PageParts";
import { About, CtaBand, Footer, Marquee, MobileBar, Services, Why } from "@/components/Sections";
import { SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  description: SITE.description,
  telephone: SITE.phone,
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: "Plot 25B, Scheme-33, Deh Songhal", addressLocality: "Karachi", addressCountry: "PK" },
  areaServed: SITE.area,
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <ProjectTeaser />
        <About />
        <Services />
        <Why />
        <CtaBand />
      </main>
      <Footer />
      <MobileBar />
      <Reveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
