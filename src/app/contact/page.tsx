import type { Metadata } from "next";
import Shell from "@/components/Shell";
import EstimateForm from "@/components/EstimateForm";
import { PageHero } from "@/components/PageParts";
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
        eyebrow="Contact"
        title="Let's talk about your project."
        text="Call, message us on WhatsApp or send the form. We reply within one working day."
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
    </Shell>
  );
}
