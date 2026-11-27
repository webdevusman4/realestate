import type { Metadata } from "next";
import CoShell from "@/components/co/Shell";
import Register from "@/components/co/Register";
import { PageHead, Visit } from "@/components/co/Parts";
import s from "@/components/co/co.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ali's Twin Tower, Zeeshan Pride, Ali's Tower, Ali Complex and our upcoming projects Ali's Bridge View and Ali Skyline.",
};

export default function ProjectsPage() {
  return (
    <CoShell>
      <PageHead title="Our projects." text="The project open for booking now, our finished buildings and what comes next." crumbs={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
      <section className={s.sec}>
        <div className={s.wrap}>
          <Register filters />
        </div>
      </section>
      <Visit />
    </CoShell>
  );
}
