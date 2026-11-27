import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import { PageHead, Tag, Visit } from "@/components/co/Parts";
import { UpdatesList } from "@/components/co/Sections";
import s from "@/components/co/co.module.css";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Project updates",
  description: "Booking and construction updates from Ali Zeeshan Enterprises, starting with Ali's Twin Tower.",
  path: "/updates",
});

export default function UpdatesPage() {
  return (
    <CoShell>
      <PageHead path="/updates" title="Project updates." text="Booking news and construction progress, newest first." crumbs={[{ label: "Home", href: "/" }, { label: "Updates" }]} />
      <section className={s.sec}>
        <div className={s.wrap}>
          <p className={s.note} style={{ marginTop: 0, marginBottom: 28 }}>
            <Tag>Example posts</Tag> Posts marked as examples show the format. Real progress posts and dates will replace them.
          </p>
          <UpdatesList />
        </div>
      </section>
      <Visit />
    </CoShell>
  );
}
