import { APARTMENTS, SITE, SITE_ORIGIN, TOWER_OFFICE, TT, TWIN_TOWER, rs } from "@/lib/site";
import { PROJECTS, projectHref } from "@/lib/company";

export const dynamic = "force-static";

/** Plain-text summary for AI assistants and search tools (the llms.txt convention). */
export function GET() {
  const o = SITE_ORIGIN;
  const lines = [
    `# ${TWIN_TOWER.name}`,
    "",
    `> ${TWIN_TOWER.summary} A project of ${SITE.name}.`,
    "",
    `Location: ${TOWER_OFFICE.address}.`,
    `Site office phone: ${TOWER_OFFICE.phone}.`,
    "Apartments are for sale (no rentals). Prices and payment plans below come from the project's official payment schedules.",
    "",
    "## Apartments",
    ...APARTMENTS.map((a) => `- [${a.type}](${o}${TT}/apartments/${a.slug}): ${a.rooms} rooms, ${a.beds} bedroom${a.beds > 1 ? "s" : ""}, ${a.baths} baths. Total cost ${rs(a.total)}.`),
    "",
    "## Pages",
    `- [Home](${o}${TT}): the project, highlights and features`,
    `- [Payment plans](${o}${TT}/payment-plans): booking, 60 monthly instalments, loan option, 10% discount for full cash payment`,
    `- [Lifestyle and features](${o}${TT}/lifestyle)`,
    `- [Location](${o}${TT}/location)`,
    `- [Contact / book a visit](${o}${TT}/contact)`,
    "",
    "## Company",
    `- [Buying guide](${o}/buying-guide): booking steps, payment basics, documents, possession`,
    `- [FAQ](${o}/faq): common buyer questions`,
    `- [Updates](${o}/updates): booking and construction news`,
    `- [Contact](${o}/contact): book a site visit, ${SITE.phone}, ${SITE.hours}`,
    `- [${SITE.name}](${o}/): ${SITE.tagline}, ${SITE.area}. Registered ${SITE.registered}; ABAD and PEC.`,
    ...PROJECTS.map((p) => `- [${p.name}](${o}${projectHref(p)}): ${p.status}, ${p.type.toLowerCase()}${p.sample ? " (details are placeholders)" : ""}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
