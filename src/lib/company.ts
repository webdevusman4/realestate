/**
 * Company-level content for Ali Zeeshan Enterprises.
 * REAL (from the client's form): name, one-line description, hours, services, ABAD + PEC, 2019 registration,
 * project names, owner names. Everything marked `sample: true` or SAMPLE is dummy text to be replaced.
 *
 * NOTE: Existing exports imported by tower/legacy components (SERVICES, PROJECT_FILTERS, PROJECTS,
 * projectHref, FACTS, LEADERS, STORY) preserve their exact values and shapes.
 */
import { APARTMENTS, SITE, TT } from "@/lib/site";

export type Service = { id: string; title: string; text: string; tags: string[]; image: string; alt: string; sample?: boolean };

export const SERVICES: Service[] = [
  {
    id: "commercial",
    title: "Commercial Buildings",
    text: "Plazas, offices, showrooms and shop podiums, planned for footfall and built for the long run.",
    tags: ["Plazas", "Offices", "Showrooms"],
    image: "/photos/commercial-facade.jpg",
    alt: "Commercial building with a curved timber facade",
  },
  {
    id: "development",
    title: "Real Estate Development",
    text: "We buy the land, design the project, build it and sell it, so buyers deal with one trusted developer.",
    tags: ["Land", "Design", "Sales"],
    image: "/photos/cranes-city.jpg",
    alt: "Tower cranes over buildings under construction at dusk",
  },
  {
    id: "residential",
    title: "Residential Apartments",
    text: "Family apartments with good layouts, modern kitchens and the facilities a building needs. Ali's Twin Tower is our current project.", // SAMPLE wording
    tags: ["Apartments", "Family layouts", "Facilities"],
    image: "/photos/apartments.jpg",
    alt: "Apartment building with balconies",
    sample: true,
  },
  {
    id: "sales",
    title: "Booking & Sales Support",
    text: "Clear payment plans, site visits and a booking office that answers your questions before you decide.", // SAMPLE wording
    tags: ["Payment plans", "Site visits", "Booking"],
    image: "/photos/office-glass.jpg",
    alt: "Mid-rise office building with a glass facade",
    sample: true,
  },
];

export const PROJECT_FILTERS = ["All", "Now booking", "Completed", "Upcoming"] as const;
export type ProjectStatus = "Now booking" | "Completed" | "Upcoming";

export type Project = {
  slug: string;
  name: string;
  type: "Residential" | "Commercial";
  status: ProjectStatus;
  location: string;
  year: string;
  size: string;
  summary: string;
  highlights: string[];
  image: string;
  alt: string;
  pos?: string;
  gallery: { src: string; alt: string }[];
  /** Own project site (Ali's Twin Tower). */
  href?: string;
  /** Dummy details to be replaced with the client's real information. */
  sample?: boolean;
  /** Optional v2 details (sample-flagged when placeholder). */
  facts?: { label: string; value: string; sample?: boolean }[];
  unitsNote?: string;
  paymentNote?: string;
  imageCredit?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "alis-twin-tower",
    name: "Ali's Twin Tower",
    type: "Residential",
    status: "Now booking",
    location: "Scheme-33, Karachi",
    year: "Booking open",
    size: "3, 4 & 5 room apartments · showroom",
    summary: "Ultra luxury apartments with an American kitchen, wooden flooring and elegant false ceilings. Full floor plans and payment plans are on the project site.",
    highlights: ["Type A, B and C apartments", "8 speedy lifts, 24/7 security, masjid", "60 monthly instalments, bank loan option"],
    image: "/hero/twin-tower-hero-mobile.jpg",
    alt: "Ali's Twin Tower at dusk (artist impression)",
    pos: "50% 40%",
    gallery: [],
    href: TT,
  },
  {
    slug: "zeeshan-pride",
    name: "Zeeshan Pride",
    type: "Residential",
    status: "Completed",
    location: "Karachi", // SAMPLE
    year: "2022", // SAMPLE
    size: "12 floors · 48 apartments", // SAMPLE
    summary: "A family apartment building with covered parking, lifts and a quiet entrance lobby.", // SAMPLE
    highlights: ["2 and 3 bedroom layouts", "Covered parking", "Lifts and 24/7 security"],
    image: "/photos/apartments.jpg",
    alt: "Apartment building with balconies",
    pos: "50% 40%",
    gallery: [
      { src: "/photos/interior-lounge.jpg", alt: "Finished living room with a sofa and wall panels" },
      { src: "/photos/interior-window.jpg", alt: "Living room with floor-to-ceiling windows" },
      { src: "/photos/house-modern.jpg", alt: "Modern building with a pool" },
    ],
    sample: true,
  },
  {
    slug: "alis-tower",
    name: "Ali's Tower",
    type: "Commercial",
    status: "Completed",
    location: "Karachi", // SAMPLE
    year: "2021", // SAMPLE
    size: "9 floors · offices and retail", // SAMPLE
    summary: "A mid-rise commercial tower with retail on the ground floor and offices above.", // SAMPLE
    highlights: ["Ground-floor retail", "Open-plan office floors", "Lifts and generator backup"],
    image: "/photos/office-glass.jpg",
    alt: "Mid-rise office building with a glass facade",
    gallery: [
      { src: "/photos/commercial-facade.jpg", alt: "Commercial building with a curved timber facade" },
      { src: "/photos/structure-concrete.jpg", alt: "Concrete frame of a building" },
      { src: "/photos/blueprints-team.jpg", alt: "Engineers reviewing building drawings" },
    ],
    sample: true,
  },
  {
    slug: "ali-complex",
    name: "Ali Complex",
    type: "Commercial",
    status: "Completed",
    location: "Karachi", // SAMPLE
    year: "2020", // SAMPLE
    size: "4 floors · shops and offices", // SAMPLE
    summary: "A shopping and office complex on a busy road, with wide frontage and customer parking.", // SAMPLE
    highlights: ["Shops with wide frontage", "Offices upstairs", "Customer parking"],
    image: "/photos/commercial-facade.jpg",
    alt: "Commercial building with a curved timber facade",
    gallery: [
      { src: "/photos/office-glass.jpg", alt: "Office building with a glass facade" },
      { src: "/photos/structure-crane.jpg", alt: "Crane beside a building under construction" },
      { src: "/photos/engineer-site.jpg", alt: "Construction crew on site" },
    ],
    sample: true,
  },
  {
    slug: "alis-bridge-view",
    name: "Ali's Bridge View",
    type: "Residential",
    status: "Upcoming",
    location: "Karachi", // SAMPLE
    year: "Coming soon", // SAMPLE
    size: "Apartments (details to follow)", // SAMPLE
    summary: "Our next residential project. Details, plans and prices will be announced soon.", // SAMPLE
    highlights: ["Launch details to follow", "Register your interest", "Updates by call or WhatsApp"],
    image: "/photos/hero-crane-sunset.jpg",
    alt: "Crane against a sunset sky over a building site",
    gallery: [
      { src: "/photos/cranes-city.jpg", alt: "Tower cranes over buildings at dusk" },
      { src: "/photos/structure-crane.jpg", alt: "Crane beside a building under construction" },
      { src: "/photos/architect-drafting.jpg", alt: "Architect drafting a building plan" },
    ],
    sample: true,
  },
  {
    slug: "ali-skyline",
    name: "Ali Skyline",
    type: "Commercial",
    status: "Upcoming",
    location: "Karachi", // SAMPLE
    year: "Coming soon", // SAMPLE
    size: "Details to follow", // SAMPLE
    summary: "A future high-rise development. Location, plans and launch date will be shared soon.", // SAMPLE
    highlights: ["Launch details to follow", "Register your interest", "Updates by call or WhatsApp"],
    image: "/photos/cranes-city.jpg",
    alt: "Tower cranes over buildings under construction at dusk",
    gallery: [
      { src: "/photos/hero-crane-sunset.jpg", alt: "Crane against a sunset sky" },
      { src: "/photos/office-glass.jpg", alt: "Office building with a glass facade" },
      { src: "/photos/blueprints-team.jpg", alt: "Engineers reviewing drawings" },
    ],
    sample: true,
  },
];

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const projectHref = (p: Project) => p.href ?? `/projects/${p.slug}`;

/** Trust strip. Memberships and the registration year are from the client's form. */
export const FACTS = [
  { value: String(SITE.registered), label: "Registered company" },
  { value: "ABAD", label: "Association of Builders & Developers" }, // CONFIRM full name and membership status
  { value: "PEC", label: "Pakistan Engineering Council" }, // CONFIRM registration type
  { value: String(PROJECTS.length), label: "Projects, finished and coming" },
] as const;

/** Names are from the form (the second "Khan" was crossed out, so Aman Khan is left out until confirmed). Roles are SAMPLE. */
export const LEADERS = [
  { name: "Kamran Ali Khan", role: "Director", sample: true },
  { name: "Shariq Aziz", role: "Director", sample: true },
] as const;

/** SAMPLE company story: replace with the owner's own words. */
export const STORY = [
  "Ali Zeeshan Enterprises is a Karachi builder and real estate developer, registered in 2019. We build commercial buildings and residential projects, and we sell them ourselves, so buyers deal with one company from the first visit to the keys.",
  "Our newest project, Ali's Twin Tower in Scheme-33, brings luxury apartments to families who want more space, better finishes and a payment plan they can follow.",
];

export const CO_NAV = [
  { label: "Projects", href: "/projects" },
  { label: "Payment plans", href: "/payment-plans" },
  { label: "Buying guide", href: "/buying-guide" },
  { label: "Updates", href: "/updates" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------------------------------------
 * Added in the professional redesign. Items with `sample: true` are placeholders until the client confirms them.
 * ---------------------------------------------------------------------------------------------- */

export const TYPE_FILTERS = ["All types", "Residential", "Commercial"] as const;

/** Reasons to buy from us. Each one can be checked on the project site or at the booking office. */
export const WHY_US = [
  { title: "One company from land to keys", text: "We develop, build and sell our own projects. You deal with us, not a chain of agents." },
  { title: "Prices written down", text: "Every Twin Tower apartment type has a full payment schedule: booking, instalments, finishing and possession." },
  { title: "A way to pay that fits", text: "60 monthly instalments, a bank loan option and 10% off for full cash payment at booking." },
  { title: "Registered and answerable", text: `Registered in ${SITE.registered}. Member of ABAD and PEC. The booking office is open ${SITE.hours}.` },
] as const;

export const BUY_STEPS = [
  { title: "Visit or call", text: "Come to the booking office or call us. Ask anything. Seeing the plans in person is the best first step." },
  { title: "Choose your apartment", text: "Compare Type A, B and C by rooms, size and total cost. The project site has the floor plans." },
  { title: "Book with the booking amount", text: "You pay the booking amount and sign the application form. The unit stays provisional until full payment is received." },
  { title: "Follow the payment schedule", text: "Pay on allocation, confirmation and start of work, then monthly and half-yearly instalments and the slab payments. Instalments are due by the 10th of each month." },
  { title: "Finishing and possession", text: "The last payments fall on finishing and possession. Ask the booking office for the handover timeline." },
] as const;

/** SAMPLE: confirm the real checklist with the booking office. */
export const DOCUMENTS = [
  "Copy of CNIC (both sides)",
  "Passport-size photographs",
  "Filled application form from the booking office",
  "Booking amount by cheque or bank transfer",
  "For overseas buyers: copy of passport and a local contact",
];

export const PAYMENT_BASICS = [
  { k: "Booking", v: "You pay the booking amount first. The amount depends on the apartment type." },
  { k: "Instalments", v: "60 monthly and 10 half-yearly instalments, plus 12 slab-casting payments." },
  { k: "Bank loan", v: "Each schedule shows an expected bank loan. Ask the booking office what applies to you." },
  { k: "Cash discount", v: "10% off for full cash payment at the time of booking." },
  { k: "Not included", v: "Ground rent, sub-lease, documentation, registration and utility connection charges are paid separately." },
  { k: "Extra charges", v: "Road facing, corner and west open units carry extra charges, due within 90 days of booking." },
] as const;

/** Company-level FAQ. Answers use confirmed facts; anything unknown points to the booking office. */
export const FAQ: { q: string; a: string; group: "Buying" | "Payment" | "Company" }[] = [
  { group: "Company", q: "Who is Ali Zeeshan Enterprises?", a: `We are a Karachi builder and real estate developer, registered in ${SITE.registered}. We are members of ABAD and PEC.` },
  { group: "Company", q: "Which project can I book now?", a: "Ali's Twin Tower in Scheme-33, Karachi. It has 3, 4 and 5 room apartments. Floor plans and payment plans are on the project site." },
  { group: "Company", q: "Where is the booking office?", a: `${SITE.address.replace(/^Booking office:\s*/, "")}. It is open ${SITE.hours}. Call ${SITE.phone}.` },
  { group: "Buying", q: "Can I visit before I book?", a: "Yes. Use Book a site visit, call, or message us on WhatsApp. Tell us a day and time and the booking office will confirm." },
  { group: "Buying", q: "What happens after I book?", a: "Your unit is allocated provisionally. It stays provisional until the company receives full and final payment, as the payment schedule states." },
  { group: "Buying", q: "When will I get possession?", a: "Ask the booking office for the current handover timeline. We do not publish a date on this site until it is confirmed." },
  { group: "Payment", q: "How do the instalments work?", a: "After booking, allocation, confirmation and start of work, you pay 60 monthly and 10 half-yearly instalments, plus 12 slab-casting payments, then the finishing and possession payments. Monthly instalments are due by the 10th." },
  { group: "Payment", q: "Is a bank loan possible?", a: "Each Twin Tower payment schedule shows an expected bank loan figure. Ask the booking office for the loan steps that apply to you." },
  { group: "Payment", q: "Is there a discount for cash?", a: "Yes. 10% off for full cash payment at the time of booking. Discounts depend on regular payment and are adjusted in the final instalments." },
  { group: "Payment", q: "What costs are not in the apartment price?", a: "Ground rent, sub-lease execution, documentation, registration and gas, electricity, water and sewerage connection and meter deposits are paid separately." },
];

/** Values stated as things we do. Wording comes from the brochure's values; confirm with the client. */
export const VALUES_ACTIONS = [
  { title: "We put prices in writing", text: "Each apartment type has a payment schedule you can read before you decide." },
  { title: "We answer by phone", text: `Call ${SITE.phone} between ${SITE.hours}. A person from the booking office picks up.` },
  { title: "We build to be handed over", text: "The aim is on-time delivery and long-term relationships with our buyers." },
  { title: "We say what we do not know yet", text: "If a date or detail is not confirmed, this site says so and points you to the booking office." },
] as const;

/** Timeline. Only 2019 and the Twin Tower launch are from the client; other years are SAMPLE. */
export const TIMELINE: { when: string; title: string; text: string; sample?: boolean }[] = [
  { when: String(SITE.registered), title: "Company registered", text: "Ali Zeeshan Enterprises starts as a Karachi builder and developer." },
  { when: "2020", title: "Ali Complex", text: "Shops and offices on a busy road.", sample: true },
  { when: "2021", title: "Ali's Tower", text: "A mid-rise commercial tower.", sample: true },
  { when: "2022", title: "Zeeshan Pride", text: "A family apartment building.", sample: true },
  { when: "Now", title: "Ali's Twin Tower", text: "Apartments in Scheme-33, open for booking." },
];

export type Update = { slug: string; title: string; date?: string; project: string; text: string; sample?: boolean; image?: string; alt?: string };

/** Construction and booking updates. Only the first post is real; the others show how progress posts will look. */
export const UPDATES: Update[] = [
  {
    slug: "twin-tower-open-for-booking",
    title: "Ali's Twin Tower is open for booking",
    project: "Ali's Twin Tower",
    text: "Type A, B and C apartments can be booked at the booking office in Scheme-33. Payment schedules for each type are on the project site.",
    image: "/hero/twin-tower-hero-mobile.jpg",
    alt: "Ali's Twin Tower at dusk (artist impression)",
  },
  {
    slug: "sample-progress-structure",
    title: "Structure progress: example post",
    date: "Date to follow",
    project: "Ali's Twin Tower",
    text: "Progress posts will name the floor reached, the work done that month and what comes next, with site photos. This one shows the format only.",
    image: "/photos/structure-concrete.jpg", // SAMPLE
    alt: "Multi-storey reinforced concrete building frame under construction", // SAMPLE
    sample: true,
  },
  {
    slug: "sample-progress-facilities",
    title: "Facilities update: example post",
    date: "Date to follow",
    project: "Ali's Twin Tower",
    text: "Posts about lifts, parking, the masjid and security will appear here as each part is built. This one shows the format only.",
    image: "/photos/structure-crane.jpg", // SAMPLE
    alt: "Tower crane beside a concrete multi-storey apartment structure", // SAMPLE
    sample: true,
  },
];

export const LEGAL_DRAFT = "Draft for review by the company's lawyer. Not final legal text.";

/* ------------------------------------------------------------------------------------------------
 * v2 Additions (single source of truth for audited images, project notes, service media, and payment comparison)
 * ---------------------------------------------------------------------------------------------- */

export type ProjectImageEntry = {
  banner: string;
  bannerAlt: string;
  bannerPos?: string;
  card: string;
  cardAlt: string;
  cardPos?: string;
  gallery: { src: string; alt: string }[];
  isArtistImpression?: boolean;
};

/**
 * Single source of truth for v2 project images.
 * Every slot avoids rejected/villa photos and guarantees zero duplicate image URLs on any single page
 * (Banner + Gallery 3 + Related 4).
 */
export const IMAGE_MAP: Record<string, ProjectImageEntry> = {
  "alis-twin-tower": {
    banner: "/hero/twin-tower-hero.jpg",
    bannerAlt: "Ali's Twin Tower at dusk (artist impression)",
    bannerPos: "75% 40%",
    card: "/hero/twin-tower-hero-mobile.jpg",
    cardAlt: "Ali's Twin Tower at dusk (artist impression)",
    cardPos: "50% 40%",
    gallery: [],
    isArtistImpression: true,
  },
  "zeeshan-pride": {
    banner: "/photos/residential-facade-dusk.jpg", // SAMPLE
    bannerAlt: "Sandstone and concrete apartment building with recessed balconies at dusk", // SAMPLE
    bannerPos: "50% 45%",
    card: "/photos/apartments.jpg", // SAMPLE
    cardAlt: "Modern concrete apartment facade with glass windows", // SAMPLE
    cardPos: "50% 40%",
    gallery: [
      { src: "/photos/interior-lounge.jpg", alt: "Finished apartment living room with warm ceiling cove lighting and wood panelling" }, // SAMPLE
      { src: "/photos/interior-window.jpg", alt: "Quiet residential living room with floor-to-ceiling windows" }, // SAMPLE
      { src: "/photos/apartments.jpg", alt: "Detailed concrete and glass apartment facade" }, // SAMPLE
    ],
  },
  "alis-tower": {
    banner: "/photos/office-glass.jpg", // SAMPLE
    bannerAlt: "Curved glass commercial office building facade at dusk", // SAMPLE
    bannerPos: "50% 45%",
    card: "/photos/office-glass.jpg", // SAMPLE
    cardAlt: "Curved glass office building", // SAMPLE
    cardPos: "50% 45%",
    gallery: [
      { src: "/photos/plaza-glass-sunset.jpg", alt: "Curved commercial glass facade reflecting warm sunset light" }, // SAMPLE
      { src: "/photos/structure-concrete.jpg", alt: "Reinforced concrete building frame with steel formwork" }, // SAMPLE
      { src: "/photos/planning-desk.jpg", alt: "Hands reviewing printed architectural floor plans with a scale ruler and pencil" }, // SAMPLE
    ],
  },
  "ali-complex": {
    banner: "/photos/commercial-facade.jpg", // SAMPLE
    bannerAlt: "Commercial building with vertical warm timber-toned louvres", // SAMPLE
    bannerPos: "50% 42%",
    card: "/photos/commercial-facade.jpg", // SAMPLE
    cardAlt: "Commercial plaza facade", // SAMPLE
    cardPos: "50% 42%",
    gallery: [
      { src: "/photos/plaza-glass-sunset.jpg", alt: "Commercial glass facade reflecting golden sunset tones" }, // SAMPLE
      { src: "/photos/structure-crane.jpg", alt: "Multi-storey reinforced concrete structure with a tower crane above" }, // SAMPLE
      { src: "/photos/structure-concrete.jpg", alt: "Multi-storey concrete slab construction frame" }, // SAMPLE
    ],
  },
  "alis-bridge-view": {
    banner: "/photos/hero-crane-sunset.jpg", // SAMPLE
    bannerAlt: "Tower crane silhouetted against a warm sunset sky over a rising building", // SAMPLE
    bannerPos: "50% 45%",
    card: "/photos/hero-crane-sunset.jpg", // SAMPLE
    cardAlt: "Construction crane silhouetted at sunset", // SAMPLE
    cardPos: "50% 45%",
    gallery: [
      { src: "/photos/cranes-golden-hour.jpg", alt: "Tower cranes over a rising multi-storey building at golden hour" }, // SAMPLE
      { src: "/photos/structure-crane.jpg", alt: "Concrete structure frame beside a tower crane" }, // SAMPLE
      { src: "/photos/planning-desk.jpg", alt: "Hands marking residential floor plans on an oak drafting desk" }, // SAMPLE
    ],
  },
  "ali-skyline": {
    banner: "/photos/cranes-city.jpg", // SAMPLE
    bannerAlt: "Twin tower cranes over modern city buildings at dusk", // SAMPLE
    bannerPos: "50% 45%",
    card: "/photos/cranes-city.jpg", // SAMPLE
    cardAlt: "City development skyline with cranes at dusk", // SAMPLE
    cardPos: "50% 45%",
    gallery: [
      { src: "/photos/skyline-cranes-amber.jpg", alt: "Urban skyline and tower cranes against an amber sunset sky" }, // SAMPLE
      { src: "/photos/plaza-glass-sunset.jpg", alt: "Commercial glass curtain wall reflecting dusk sunlight" }, // SAMPLE
      { src: "/photos/planning-desk.jpg", alt: "Hands reviewing printed architectural drawings" }, // SAMPLE
    ],
  },
};

/** v2 service media & destination links (keeps SERVICES export untouched, avoids duplicate images on Home). */
export const SERVICE_V2: Record<string, { image: string; alt: string; href: string; cta: string }> = {
  commercial: {
    image: "/photos/plaza-glass-sunset.jpg", // SAMPLE
    alt: "Curved commercial glass building reflecting warm sunset light",
    href: "/projects",
    cta: "See commercial projects",
  },
  development: {
    image: "/photos/skyline-cranes-amber.jpg", // SAMPLE
    alt: "Tower cranes across a city horizon in warm amber light",
    href: "/about",
    cta: "How we work",
  },
  residential: {
    image: "/photos/interior-lounge.jpg", // SAMPLE
    alt: "Finished apartment living room with cove ceiling lighting",
    href: "/projects",
    cta: "See residential projects",
  },
  sales: {
    image: "/photos/planning-desk.jpg", // SAMPLE
    alt: "Hands with a pencil and brass scale ruler over apartment floor plans",
    href: "/buying-guide",
    cta: "Read the buying guide",
  },
};

/** Payment comparison derived directly from APARTMENTS — no hand-typed numbers. */
export type PaymentCompareRow = {
  slug: string;
  type: string;
  rooms: number;
  beds: number;
  total: number;
  booking: number;
  monthly: number;
  loan: number;
  cashPayable: number;
};

export const PAYMENT_COMPARE: PaymentCompareRow[] = APARTMENTS.map((a) => ({
  slug: a.slug,
  type: a.type,
  rooms: a.rooms,
  beds: a.beds,
  total: a.total,
  booking: a.schedule.find((r) => r.label === "Booking")?.amount ?? 0,
  monthly: a.monthly,
  loan: a.loan,
  cashPayable: a.cashPayable,
}));
