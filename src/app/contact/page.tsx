import type { Metadata } from "next";
import Shell from "@/components/Shell";
import EstimateForm from "@/components/EstimateForm";
import { LocationCard, PageHero } from "@/components/PageParts";
import { ContactDetails } from "@/components/Sections";
import s from "@/components/site.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, WhatsApp or request a free estimate. We reply within one working day.",
};

export default function ContactPage() {
  return (
    <Shell>
      <PageHero
        image="/photos/office-glass.jpg"
        imagePos="50% 40%"
        eyebrow="Contact"
        title="Let's talk about your new home."
        text="Visit the site office, call, message us on WhatsApp or send the form."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <section className={`${s.sec} ${s.secContact}`}>
        <div className={`${s.wrap} ${s.contactGrid}`}>
          <div data-r>
            <ContactDetails />
          </div>
          <div data-r>
            <EstimateForm />
          </div>
        </div>
      </section>
      <section className={s.sec} style={{ paddingTop: 0 }}>
        <div className={s.wrap} data-r>
          <LocationCard />
        </div>
      </section>
    </Shell>
  );
}
