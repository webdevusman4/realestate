import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { PageHead } from "@/components/co/Parts";
import s from "@/components/co/co.module.css";
import { LEGAL_DRAFT } from "@/lib/company";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Privacy", description: "How Ali Zeeshan Enterprises handles the details you send through this website.", path: "/privacy", noindex: true });

export default function Page() {
  return (
    <CoShell>
      <PageHead path="/privacy" title="Privacy" crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <section className={s.sec}>
        <div className={s.wrap}>
          <p className={s.draftBar}>{LEGAL_DRAFT}</p>
          <div className={`${s.prose} ${s.legalText}`}>
            <h2>What we collect</h2>
            <p>When you send a form we receive the details you type: your name, phone number, optional email, project interest, preferred visit time and message.</p>
            <h2>How we use it</h2>
            <p>We use these details only to contact you about your enquiry or site visit. We do not sell them.</p>
            <h2>Where it goes</h2>
            <p>Form entries are received through our website host&apos;s form service and read by {SITE.name} staff.</p>
            <h2>Your choices</h2>
            <p>To see or delete your details, call {SITE.phone} or write to {SITE.email}.</p>
          </div>
        </div>
      </section>
    </CoShell>
  );
}
