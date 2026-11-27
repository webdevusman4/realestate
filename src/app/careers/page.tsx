import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { Details, PageHead } from "@/components/co/Parts";
import s from "@/components/co/co.module.css";
import { SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Careers",
  description: "Work with Ali Zeeshan Enterprises. No roles are listed yet. Send your details to the booking office.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <CoShell>
      <PageHead path="/careers" title="Work with us." text="We have no open roles listed right now." crumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
      <section className={s.sec}>
        <div className={`${s.wrap} ${s.cols2}`}>
          <div className={s.prose}>
            <p>We hire engineers, site supervisors, sales staff and office staff as projects grow. If you want to be considered, call the booking office or email your CV and the role you want.</p>
            <p>
              <a className={s.link} href={`mailto:${SITE.email}?subject=Careers`}>
                {SITE.email}
              </a>
            </p>
          </div>
          <Details />
        </div>
      </section>
    </CoShell>
  );
}
