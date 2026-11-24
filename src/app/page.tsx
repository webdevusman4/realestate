import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { TwinTowerFeature } from "@/components/PageParts";
import { About, CtaBand, Footer, Marquee, MobileBar, Services, Why } from "@/components/Sections";
import { SERVICES, SITE } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: SITE.name,
  description: SITE.description,
  telephone: SITE.phone,
  email: SITE.email,
  areaServed: SITE.area,
  makesOffer: SERVICES.map((sv) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: sv.title } })),
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <TwinTowerFeature />
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
