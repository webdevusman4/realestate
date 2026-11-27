import type { Metadata } from "next";
import { SITE, SITE_ORIGIN } from "@/lib/site";

export const OG_IMAGE = { url: "/og/company.jpg", width: 1200, height: 630, alt: "Ali's Twin Tower at dusk (artist impression)" };

/** Per-page metadata for the company site: title, description, canonical and social preview. */
export function pageMeta({ title, description, path, noindex }: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  const full = title === SITE.name ? title : `${title} | ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { type: "website", siteName: SITE.name, title: full, description, url: path, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: [OG_IMAGE.url] },
  };
}

export const abs = (path: string) => `${SITE_ORIGIN}${path}`;

export function breadcrumbLd(crumbs: { label: string; href?: string }[], currentPath?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: c.href ? abs(c.href) : currentPath ? abs(currentPath) : undefined,
    })),
  };
}

/** Organization and RealEstateAgent for the whole company. */
export function companyLd() {
  const address = { "@type": "PostalAddress", streetAddress: "Plot 25-B, Scheme-33", addressLocality: "Karachi", addressCountry: "PK" };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_ORIGIN}/#org`,
        name: SITE.name,
        description: SITE.description,
        url: SITE_ORIGIN,
        logo: abs("/brand/logo-light.png"),
        telephone: SITE.phone,
        email: SITE.email,
        foundingDate: String(SITE.registered),
        address,
        areaServed: SITE.area,
        memberOf: [
          { "@type": "Organization", name: "Association of Builders & Developers of Pakistan (ABAD)" },
          { "@type": "Organization", name: "Pakistan Engineering Council (PEC)" },
        ],
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE_ORIGIN}/#office`,
        name: `${SITE.name} booking office`,
        url: SITE_ORIGIN,
        image: abs(OG_IMAGE.url),
        telephone: SITE.phone,
        address,
        areaServed: SITE.area,
        openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", opens: "10:00", closes: "20:00" }],
        parentOrganization: { "@id": `${SITE_ORIGIN}/#org` },
      },
    ],
  };
}
