import type { Metadata } from "next";
import EstimateForm from "@/components/EstimateForm";
import { PageHero } from "@/components/PageParts";
import { TowerContactDetails } from "@/components/TowerParts";
import { TOWER_OFFICE, TT } from "@/lib/site";
import s from "@/components/site.module.css";

export const metadata: Metadata = {
  title: "Book a visit",
  description: "Call, WhatsApp or send the form to book a visit to Ali's Twin Tower or ask for prices.",
};

const TYPES = ["Apartment: Type A (3 bedrooms)", "Apartment: Type B (2 bedrooms)", "Apartment: Type C (1 bedroom)", "Showroom / commercial", "Something else"];

export default function TowerContactPage() {
  return (
    <>
      <PageHero
        variant="tower"
        image="/amenities/lobby.jpg"
        imagePos="50% 50%"
        eyebrow="Contact"
        title="Book a visit or ask for prices."
        text="Visit the site office, call, message us on WhatsApp or send the form."
        crumbs={[{ label: "Overview", href: TT }, { label: "Contact" }]}
      />
      <section className={`${s.sec} ${s.secContact}`}>
        <div className={`${s.wrap} ${s.contactGrid}`}>
          <div data-r>
            <TowerContactDetails />
          </div>
          <div data-r>
            <EstimateForm
              title="Book a visit or ask for prices"
              types={TYPES}
              source="Ali's Twin Tower site"
              plot={false}
              phone={{ label: TOWER_OFFICE.phone, href: TOWER_OFFICE.phoneHref }}
              whatsappHref={TOWER_OFFICE.whatsappHref}
            />
          </div>
        </div>
      </section>
    </>
  );
}
