import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { PageHead } from "@/components/co/Parts";
import s from "@/components/co/co.module.css";
import { LEGAL_DRAFT } from "@/lib/company";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Terms of use", description: "Terms for using the Ali Zeeshan Enterprises website.", path: "/terms", noindex: true });

export default function Page() {
  return (
    <CoShell>
      <PageHead path="/terms" title="Terms of use" crumbs={[{ label: "Home", href: "/" }, { label: "Terms of use" }]} />
      <section className={s.sec}>
        <div className={s.wrap}>
          <p className={s.draftBar}>{LEGAL_DRAFT}</p>
          <div className={`${s.prose} ${s.legalText}`}>
            <h2>Information on this site</h2>
            <p>Renders, plans and descriptions are for illustration. Prices, payment schedules and availability are confirmed only in writing by the booking office.</p>
            <h2>No offer</h2>
            <p>Nothing on this website is an offer or a contract. A booking is made only through the application form and the company&apos;s terms and conditions.</p>
            <h2>Sample content</h2>
            <p>Some details on this site are marked as sample and will change as the company confirms them.</p>
            <h2>Contact</h2>
            <p>Questions about these terms: {SITE.phone} or {SITE.email}.</p>
          </div>
        </div>
      </section>
    </CoShell>
  );
}
