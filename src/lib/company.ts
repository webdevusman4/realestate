/**
 * Company-level content for Ali Zeeshan Enterprises.
 * REAL (from the client's form): name, one-line description, hours, services, ABAD + PEC, 2019 registration,
 * project names, owner names. Everything marked `sample: true` or SAMPLE is dummy text to be replaced.
 */
import { SITE, TT } from "@/lib/site";

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
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
