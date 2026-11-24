import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { TowerFooter, TowerHeader, TowerMobileBar } from "@/components/TowerParts";
import { TWIN_TOWER } from "@/lib/site";

export const metadata: Metadata = {
  title: { default: `${TWIN_TOWER.name} | ${TWIN_TOWER.kind}, Karachi`, template: `%s | ${TWIN_TOWER.name}` },
  description: `${TWIN_TOWER.summary} A project of Ali Zeeshan Enterprises.`,
  openGraph: {
    type: "website",
    siteName: TWIN_TOWER.name,
    title: `${TWIN_TOWER.name} | ${TWIN_TOWER.kind}`,
    description: TWIN_TOWER.summary,
    images: [{ url: "/hero/twin-tower-hero.jpg", width: 2000, height: 1125, alt: "Ali's Twin Tower at dusk (artist impression)" }],
  },
  twitter: { card: "summary_large_image", images: ["/hero/twin-tower-hero.jpg"] },
};

/** The Ali's Twin Tower project site: its own header, footer and logo, separate from the company site. */
export default function TowerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TowerHeader />
      <main id="main">{children}</main>
      <TowerFooter />
      <TowerMobileBar />
      <Reveal />
    </>
  );
}
