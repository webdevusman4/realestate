import { APARTMENTS, SITE, SITE_ORIGIN, TOWER_OFFICE, TT, TWIN_TOWER, rs } from "@/lib/site";
import { PROJECTS, projectHref } from "@/lib/company";

export const dynamic = "force-static";

/** Plain-text summary for AI assistants and search tools (the llms.txt convention). */
export function GET() {
  const o = SITE_ORIGIN;
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${SITE.tagline} in ${SITE.area}. Registered ${SITE.registered}. Member of ABAD and PEC.`,
    `Booking office: ${SITE.address.replace(/^Booking office:\s*/, "")}.`,
    `Hours: ${SITE.hours}. Phone: ${SITE.phone}.`,
    "",
    "## Pages",
    `- [Home](${o}/): company overview, project register, featured Twin Tower, buying steps, services, FAQ`,
    `- [Projects](${o}/projects): all six projects (filterable by status and type)`,
    `- [Payment plans](${o}/payment-plans): Ali's Twin Tower payment schedules (60 monthly instalments, bank loan option, 10% cash discount); other projects announce plans at launch`,
    `- [Buying guide](${o}/buying-guide): booking steps, payment plan basics, document checklist, possession`,
    `- [Services](${o}/services): commercial buildings, real estate development, residential apartments, booking support`,
    `- [Updates](${o}/updates): booking news and sample progress post format`,
    `- [About](${o}/about): company story, leadership, ABAD & PEC memberships, timeline`,
    `- [FAQ](${o}/faq): company, buying and payment questions`,
    `- [Careers](${o}/careers): enquiry details`,
    `- [Contact](${o}/contact): book a site visit, click-to-call, WhatsApp, map`,
    "",
    "## Projects",
    ...PROJECTS.map(
      (p) =>
        `- [${p.name}](${o}${projectHref(p)}): ${p.status}, ${p.type.toLowerCase()}, ${p.location}${p.sample ? " (placeholder/sample details)" : " (confirmed real project)"}`
    ),
    "",
    `## ${TWIN_TOWER.name} (Project site)`,
    "",
    `${TWIN_TOWER.summary}`,
    `Location: ${TOWER_OFFICE.address}. Site office phone: ${TOWER_OFFICE.phone}.`,
    "Apartments are for sale (no rentals). Prices and payment plans below come from official schedules.",
    ...APARTMENTS.map(
      (a) => `- [${a.type}](${o}${TT}/apartments/${a.slug}): ${a.rooms} rooms, ${a.beds} bedroom${a.beds > 1 ? "s" : ""}, ${a.baths} baths. Total cost ${rs(a.total)}.`
    ),
    `- [Project Home](${o}${TT})`,
    `- [Project Payment plans](${o}${TT}/payment-plans)`,
    `- [Lifestyle and features](${o}${TT}/lifestyle)`,
    `- [Location](${o}${TT}/location)`,
    `- [Book a visit](${o}${TT}/contact)`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
