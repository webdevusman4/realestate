/**
 * Single source of truth for the sample site's content.
 * Items marked SAMPLE or CONFIRM are placeholders for the mock-up: replace them with the client's real details.
 */

export const SITE = {
  name: "Ali Zeeshan Enterprises",
  short: "Ali Zeeshan",
  tagline: "Builders & Developers",
  url: "https://alizeeshan.example", // CONFIRM: real domain
  description:
    "Ali Zeeshan Enterprises builds homes, commercial buildings and turnkey projects, from the first drawing to handing over the keys.",
  phone: "+92 300 0000000", // CONFIRM
  phoneHref: "tel:+923000000000", // CONFIRM
  whatsappHref: "https://wa.me/923000000000", // CONFIRM
  email: "info@alizeeshan.pk", // CONFIRM
  hours: "Mon–Sat, 10am–7pm", // CONFIRM
  area: "Pakistan", // CONFIRM: city / head office address
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

/** SAMPLE figures for the mock-up. */
export const STATS = [
  { value: 15, suffix: "+", label: "Years building" },
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 2, suffix: "M+", label: "Sq ft constructed" },
  { value: 98, suffix: "%", label: "Handed over on time" },
];

export const KEYWORDS = [
  "Residential Construction",
  "Commercial Buildings",
  "Grey Structure",
  "Turnkey Projects",
  "Renovation",
  "Interior Finishing",
  "Architecture & Design",
  "Project Management",
  "Farmhouses",
  "Plazas & Offices",
];

/** Photos for the three tower frames in the hero (left to right). */
export const HERO_TOWERS = [
  { src: "/photos/worker-helmet.jpg", alt: "Site engineer in a hard hat and safety vest", pos: "50% 30%" },
  { src: "/photos/structure-crane.jpg", alt: "Tower crane beside a building under construction", pos: "40% 50%" },
  { src: "/photos/villa-white.jpg", alt: "Finished modern villa with a pool", pos: "60% 50%" },
];

/** SAMPLE: projects the hero card cycles through. */
export const LIVE_SITES = [
  { name: "Gold Crest Villa", stage: "Finishing works", pct: 82 },
  { name: "City Heights", stage: "Grey structure · floor 9 of 14", pct: 64 },
  { name: "Cedar Court Residence", stage: "Brickwork", pct: 41 },
];

export type Service = {
  id: string;
  title: string;
  text: string;
  tags: string[];
  image: string;
  alt: string;
};

export const SERVICES: Service[] = [
  {
    id: "residential",
    title: "Residential Construction",
    text: "Houses, villas and farmhouses built to your plan, from 5 Marla to multi-Kanal.",
    tags: ["Houses", "Villas", "Farmhouses"],
    image: "/photos/house-modern.jpg",
    alt: "Modern two-storey house with a pool",
  },
  {
    id: "commercial",
    title: "Commercial Buildings",
    text: "Plazas, offices, showrooms and apartment blocks, engineered for a long life.",
    tags: ["Plazas", "Offices", "Apartments"],
    image: "/photos/commercial-facade.jpg",
    alt: "Commercial building with a curved timber facade",
  },
  {
    id: "grey-structure",
    title: "Grey Structure",
    text: "Foundations, RCC frame, brickwork and roofing, done right the first time.",
    tags: ["Foundation", "RCC frame", "Masonry"],
    image: "/photos/structure-concrete.jpg",
    alt: "Concrete frame of a building under construction",
  },
  {
    id: "turnkey",
    title: "Turnkey & Finishing",
    text: "Grey structure to move-in ready: flooring, woodwork, electrics, plumbing and paint.",
    tags: ["Flooring", "Woodwork", "MEP"],
    image: "/photos/interior-lounge.jpg",
    alt: "Finished living room with a sofa and wall panels",
  },
  {
    id: "renovation",
    title: "Renovation & Remodeling",
    text: "Extensions, extra floors and full makeovers for homes and offices.",
    tags: ["Extensions", "Extra floors", "Makeovers"],
    image: "/photos/interior-window.jpg",
    alt: "Renovated living room with floor-to-ceiling windows",
  },
  {
    id: "architecture",
    title: "Architecture & Planning",
    text: "Drawings, 3D views, cost estimates and approvals before a brick is laid.",
    tags: ["Drawings", "3D views", "Approvals"],
    image: "/photos/architect-drafting.jpg",
    alt: "Architect drafting a building plan",
  },
];

export const PROJECT_FILTERS = ["All", "Residential", "Commercial", "Ongoing"] as const;
export type ProjectType = Exclude<(typeof PROJECT_FILTERS)[number], "All">;

/** SAMPLE projects for the mock-up (stock photos). */
export const PROJECTS: {
  name: string;
  type: ProjectType;
  meta: string;
  image: string;
  alt: string;
  pos?: string;
  href?: string;
}[] = [
  {
    name: "Ali's Twin Tower",
    type: "Residential",
    meta: "Ultra luxury apartments · 3, 4 & 5 rooms",
    image: "/photos/apartments.jpg",
    alt: "Apartment building with balconies",
    pos: "50% 40%",
    href: "/projects/alis-twin-tower", // CONFIRM: swap in the real render or site photo
  },
  { name: "Gold Crest Villa", type: "Residential", meta: "1 Kanal · 6 bedrooms · Turnkey", image: "/photos/villa-pool.jpg", alt: "Modern villa with a pool and lawn" },
  { name: "Skyline Business Centre", type: "Commercial", meta: "9 floors · Offices & retail", image: "/photos/office-glass.jpg", alt: "Mid-rise office building with a glass facade" },
  { name: "Cedar Court Residence", type: "Residential", meta: "1 Kanal · Grey structure + finishing", image: "/photos/house-night.jpg", alt: "Modern house lit up at night" },
  { name: "Crescent Apartments", type: "Commercial", meta: "7 floors · 42 apartments", image: "/photos/apartments.jpg", alt: "Apartment building with balconies", pos: "50% 40%" },
  { name: "City Heights", type: "Ongoing", meta: "14 floors · Grey structure in progress", image: "/photos/cranes-city.jpg", alt: "Tower cranes over buildings under construction at dusk" },
  { name: "Lakeside Farmhouse", type: "Residential", meta: "4 Kanal · Farmhouse · Landscaping", image: "/photos/villa-dusk.jpg", alt: "Farmhouse with a pool and lawn" },
];

export const PROMISES = [
  { icon: "quote", title: "Itemised, fixed quotes", text: "You see the full cost before work starts. No surprise bills." },
  { icon: "materials", title: "Grade-A materials", text: "Approved cement, steel and fittings, with receipts shared." },
  { icon: "updates", title: "Weekly site updates", text: "Photos and progress on WhatsApp, every week." },
  { icon: "schedule", title: "On-time handover", text: "A written schedule with milestones we are held to." },
] as const;

export const PROCESS = [
  { title: "Consultation", text: "We visit the plot, listen to your plans and check the site." },
  { title: "Design & estimate", text: "Drawings, 3D views and an itemised quote for you to approve." },
  { title: "Approvals & planning", text: "Authority approvals, schedule and material plan in place." },
  { title: "Construction", text: "Grey structure to finishing, with weekly photo updates." },
  { title: "Handover", text: "Final inspection, snag list cleared, keys in your hand." },
];

export const PROJECT_TYPES = [
  "New house",
  "Commercial building",
  "Grey structure only",
  "Turnkey / finishing",
  "Renovation",
  "Something else",
];

/* ------------------------------------------------------------------------------------------------
 * Ali's Twin Tower: new apartment project (figures copied from the client's payment-schedule brochures).
 * CONFIRM items need checking with the client before going live.
 * ---------------------------------------------------------------------------------------------- */

export const TWIN_TOWER = {
  slug: "alis-twin-tower",
  name: "Ali's Twin Tower",
  short: "Twin Tower",
  tagline: "Ultra Luxury Apartments",
  summary:
    "Ultra luxury apartments in two towers, in 3, 4 and 5 room layouts with an American kitchen, wooden flooring and elegant false ceilings.",
  location: "Pakistan", // CONFIRM: city, area and address of the project
  status: "Now booking", // CONFIRM: launch / construction status and handover date
  features: [
    { title: "American kitchen", text: "Open kitchen joined to the dining and lounge area." },
    { title: "Wooden flooring", text: "Warm wooden floors in the bedrooms and living areas." },
    { title: "Elegant false ceiling", text: "Finished ceilings with lighting built in." },
    { title: "Private terrace", text: "A terrace attached to the bedrooms in every type." },
  ],
};

export type PayRow = { label: string; amount: number };

export type Apartment = {
  slug: "type-a" | "type-b" | "type-c";
  type: string;
  rooms: number;
  beds: number;
  baths: number;
  headline: string;
  plan: string;
  planAlt: string;
  /** Sizes read from the floor plan. */
  rooms_list: { name: string; size: string }[];
  schedule: PayRow[];
  cashPayable: number;
  loan: number;
  total: number;
};

/** Extra charges, same for every type. */
export const EXTRA_CHARGES = [
  { label: "Road facing charges", amount: 300000 },
  { label: "Corner charges", amount: 300000 },
  { label: "West open charges", amount: 300000 },
];

export const PAYMENT_NOTES = [
  "All installments must be paid by the 10th of each month.",
  "Allocation of the unit shall remain provisional until the company receives the full and final payment.",
  "All extra charges must be paid within 90 days from the date of booking.",
  "The cost of the unit does not include Ground Rent, Sub-Lease Execution, Documentation, Registration Charges, Connection and Meter Deposit Charges for Gas, Electricity, Water and Sewerage, etc. These additional charges and expenses, including any miscellaneous costs incurred by the Builder/Company in fulfilling departmental formalities, are payable separately by the Allottee on demand, as they are not included in the above-mentioned cost.",
  "The Terms & Conditions mentioned in the Application Form are an integral part of this Payment Schedule, and the Applicant/Allottee agrees to abide by them.",
  "A 10% discount is offered on full cash payment at the time of booking.",
  "All discounts are subject to regular payment compliance and will be adjusted in the final installments.",
];

export const APARTMENTS: Apartment[] = [
  {
    slug: "type-a",
    type: "Type A",
    rooms: 5,
    beds: 3,
    baths: 4, // CONFIRM: counted from the plan
    headline: "Three bedrooms, drawing room and a large kitchen and dining lounge.",
    plan: "/plans/type-a.jpg",
    planAlt: "Floor plan of Type A: three bedrooms with attached baths, terrace, drawing room and kitchen with dining lounge",
    rooms_list: [
      { name: "Bedrooms (3)", size: "11'-6\" × 17'-6\"" },
      { name: "Drawing room", size: "14' × 14'" },
      { name: "Baths", size: "8' × 7' (6'-6\" × 7' by the drawing room)" },
      { name: "Kitchen, dining & lounge", size: "Open plan" },
      { name: "Terrace", size: "Attached to the bedroom wing" },
    ],
    schedule: [
      { label: "Booking", amount: 750000 },
      { label: "On allocation", amount: 750000 },
      { label: "On confirmation", amount: 750000 },
      { label: "On start of work", amount: 750000 },
      { label: "60 monthly installments (150,000 × 60)", amount: 9000000 },
      { label: "10 half-yearly installments (200,000 × 10)", amount: 2000000 },
      { label: "12 slab casting (150,000 × 12)", amount: 1800000 },
      { label: "On finishing", amount: 850000 },
      { label: "On possession", amount: 850000 },
    ],
    cashPayable: 17500000,
    loan: 7500000,
    total: 25000000,
  },
  {
    slug: "type-b",
    type: "Type B",
    rooms: 4,
    beds: 2,
    baths: 3,
    headline: "Two bedrooms with attached baths, drawing room and an open kitchen and dining lounge.",
    plan: "/plans/type-b.jpg",
    planAlt: "Floor plan of Type B: two bedrooms with attached baths, terrace, drawing room and kitchen with dining lounge",
    rooms_list: [
      { name: "Bedrooms (2)", size: "11'-6\" × 16'" },
      { name: "Drawing room", size: "12'-6\" × 14'" },
      { name: "Baths (3)", size: "7' × 7'" },
      { name: "Kitchen, dining & lounge", size: "Open plan" },
      { name: "Terrace", size: "Between the two bedrooms" },
    ],
    schedule: [
      { label: "Booking", amount: 650000 },
      { label: "On allocation", amount: 650000 },
      { label: "On confirmation", amount: 650000 },
      { label: "On start of work", amount: 650000 },
      { label: "60 monthly installments (100,000 × 60)", amount: 6000000 },
      { label: "10 half-yearly installments (150,000 × 10)", amount: 1500000 },
      { label: "12 slab casting (100,000 × 12)", amount: 1200000 },
      { label: "On finishing", amount: 650000 },
      { label: "On possession", amount: 681000 },
    ],
    cashPayable: 12631000,
    loan: 5000000,
    total: 17631000,
  },
  {
    slug: "type-c",
    type: "Type C",
    rooms: 3,
    beds: 1,
    baths: 2,
    headline: "One bedroom with a wardrobe, drawing room and a kitchen with dining and TV lounge.",
    plan: "/plans/type-c.jpg",
    planAlt: "Floor plan of Type C: one bedroom with bath and terrace, drawing room and kitchen with dining and TV lounge",
    rooms_list: [
      { name: "Bedroom", size: "11'-6\" × 16' with wardrobe" },
      { name: "Drawing room", size: "12'-4\" × 14'" },
      { name: "Baths (2)", size: "7' × 7'" },
      { name: "Kitchen, dining & TV lounge", size: "15' × 11'-6\"" },
      { name: "Terrace", size: "Attached to the bedroom" },
    ],
    schedule: [
      { label: "Booking", amount: 350000 },
      { label: "On allocation", amount: 350000 },
      { label: "On confirmation", amount: 350000 },
      { label: "On start of work", amount: 350000 },
      { label: "60 monthly installments (75,000 × 60)", amount: 4500000 },
      { label: "10 half-yearly installments (100,000 × 10)", amount: 1000000 },
      { label: "12 slab casting (100,000 × 12)", amount: 1200000 },
      { label: "On finishing", amount: 600000 }, // CONFIRM: photo is blurry; 600,000 makes the cash total add up
      { label: "On possession", amount: 414000 },
    ],
    cashPayable: 9114000,
    loan: 3900000,
    total: 13014000,
  },
];

export const rs = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;
