import type { MetadataRoute } from "next";
import { APARTMENTS, SITE_ORIGIN, TT } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/services",
    "/projects",
    "/contact",
    TT,
    `${TT}/apartments`,
    ...APARTMENTS.map((a) => `${TT}/apartments/${a.slug}`),
    `${TT}/payment-plans`,
    `${TT}/lifestyle`,
    `${TT}/location`,
    `${TT}/contact`,
  ];
  return paths.map((p) => ({ url: `${SITE_ORIGIN}${p}`, priority: p === "/" || p === TT ? 1 : 0.7 }));
}
