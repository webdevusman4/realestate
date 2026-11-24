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
    "Ali Zeeshan Enterprises is a professionally managed business firm in Karachi, committed to quality products, reliable services and timely delivery.",
  phone: "+92 320 9281567", // CONFIRM: this is the Twin Tower site office mobile from the brochure
  phoneHref: "tel:+923209281567",
  whatsappHref: "https://wa.me/923209281567", // CONFIRM: same number on WhatsApp?
  email: "info@alizeeshan.pk", // CONFIRM
  hours: "Mon–Sat, 10am–7pm", // CONFIRM
  area: "Karachi",
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

/** Real facts from the Twin Tower brochure and payment schedules. */
export const TOWER_STATS = [
  { value: 8, suffix: "", label: "Speedy lifts" },
  { value: 3, suffix: "", label: "Apartment types" },
  { value: 60, suffix: "", label: "Monthly instalments" },
  { value: 10, suffix: "%", label: "Off on full cash payment" },
];

export const TOWER_KEYWORDS = [
  "3, 4 & 5 Room Apartments",
  "American Kitchen",
  "Wooden Flooring",
  "Elegant False Ceiling",
  "Tiled Washrooms",
  "Covered Car Parking",
  "24/7 Security",
  "Speedy Lifts",
  "Easy Instalments",
  "Bank Loan Option",
];

/** Photos for the three tower frames in the hero (left to right). */
export const HERO_TOWERS = [
  { src: "/photos/worker-helmet.jpg", alt: "Site engineer in a hard hat and safety vest", pos: "50% 30%" },
  { src: "/photos/structure-crane.jpg", alt: "Tower crane beside a building under construction", pos: "40% 50%" },
  { src: "/photos/villa-white.jpg", alt: "Finished modern villa with a pool", pos: "60% 50%" },
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
    href: "/alistwintower", // CONFIRM: swap in the real render or site photo
  },
  { name: "Gold Crest Villa", type: "Residential", meta: "1 Kanal · 6 bedrooms · Turnkey", image: "/photos/villa-pool.jpg", alt: "Modern villa with a pool and lawn" },
  { name: "Skyline Business Centre", type: "Commercial", meta: "9 floors · Offices & retail", image: "/photos/office-glass.jpg", alt: "Mid-rise office building with a glass facade" },
  { name: "Cedar Court Residence", type: "Residential", meta: "1 Kanal · Grey structure + finishing", image: "/photos/house-night.jpg", alt: "Modern house lit up at night" },
  { name: "Crescent Apartments", type: "Commercial", meta: "7 floors · 42 apartments", image: "/photos/apartments.jpg", alt: "Apartment building with balconies", pos: "50% 40%" },
  { name: "City Heights", type: "Ongoing", meta: "14 floors · Grey structure in progress", image: "/photos/cranes-city.jpg", alt: "Tower cranes over buildings under construction at dusk" },
  { name: "Lakeside Farmhouse", type: "Residential", meta: "4 Kanal · Farmhouse · Landscaping", image: "/photos/villa-dusk.jpg", alt: "Farmhouse with a pool and lawn" },
];

export const TOWER_PROMISES = [
  { icon: "quote", title: "Clear, written prices", text: "Every payment is in the schedule: booking, instalments, finishing and possession." },
  { icon: "materials", title: "Premium finishes", text: "Wooden flooring, elegant false ceilings, sleek cabinetry and tiled washrooms." },
  { icon: "updates", title: "Easy instalments", text: "60 monthly and 10 half-yearly instalments, with a bank loan option." },
  { icon: "schedule", title: "10% off for cash", text: "A 10% discount on full cash payment at the time of booking." },
] as const;

export const PROCESS = [
  { title: "Consultation", text: "We visit the plot, listen to your plans and check the site." },
  { title: "Design & estimate", text: "Drawings, 3D views and an itemised quote for you to approve." },
  { title: "Approvals & planning", text: "Authority approvals, schedule and material plan in place." },
  { title: "Construction", text: "Grey structure to finishing, with weekly photo updates." },
  { title: "Handover", text: "Final inspection, snag list cleared, keys in your hand." },
];

export const PROJECT_TYPES = [
  "Apartment: Type A (3 bedrooms)",
  "Apartment: Type B (2 bedrooms)",
  "Apartment: Type C (1 bedroom)",
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
  slug: "alistwintower",
  name: "Ali's Twin Tower",
  short: "Twin Tower",
  tagline: "Where Prestige Lives, Future Belongs.",
  kind: "Luxury Apartments & Showroom",
  summary:
    "Ultra luxury 3, 4 and 5 room apartments in Scheme-33, Karachi, with an American kitchen, wooden flooring and elegant false ceilings.",
  /** Text from the brochure ("The Project"). */
  story: [
    "Ali's Twin Tower is a prestigious and landmark development by Ali Zeeshan Enterprises, crafted with a vision to redefine the standards of modern living and commercial excellence. Standing tall as a symbol of architectural brilliance and thoughtful design, the project offers a perfect blend of luxury, comfort and functionality for discerning buyers and investors.",
    "The tower proudly presents 3, 4 & 5 Rooms Ultra Luxury Apartments, meticulously designed to cater to the refined tastes of modern families. Every apartment features spacious layouts, premium finishes, elegant interiors and abundant natural light, creating an environment where comfort meets sophistication.",
  ],
  location: "Scheme-33, Karachi",
  status: "Now booking", // CONFIRM: launch / construction status and handover date
  features: [
    { title: "American kitchen", text: "Open kitchen joined to the dining and lounge area." },
    { title: "Wooden flooring", text: "Warm wooden floors in the bedrooms and living areas." },
    { title: "Elegant false ceiling", text: "Finished ceilings with lighting built in." },
    { title: "Private terrace", text: "A terrace attached to the bedrooms in every type." },
  ],
};

/** Salient features from the brochure. */
export const AMENITIES = [
  { icon: "masjid", title: "Masjid" },
  { icon: "parking", title: "Covered car parking" },
  { icon: "cctv", title: "CCTV cameras" },
  { icon: "security", title: "24/7 security system" },
  { icon: "lifts", title: "8 speedy lifts" },
  { icon: "play", title: "Children play area" },
  { icon: "lobby", title: "Lobby" },
  { icon: "standby", title: "Standby generator" }, // CONFIRM: brochure text is cut off after "Standby"
] as const;

/** "Unmatched Lifestyle" text from the brochure, one card per space. Images go in public/renders/<id>.jpg. */
export const LIFESTYLE = [
  { id: "kitchen", title: "American kitchen", text: "A modern American kitchen with premium fittings, sleek cabinetry and a smart layout." },
  { id: "washroom", title: "Tiled washrooms", text: "Elegantly finished with high-quality tiles and contemporary fixtures: clean, stylish and refreshing." },
  { id: "bedroom", title: "Main bedroom", text: "A private retreat with spacious dimensions, premium flooring and ample natural light." },
  { id: "living", title: "Living room", text: "A generous layout for relaxation and entertainment, made for family gatherings and social events." },
  { id: "drawing", title: "Drawing room", text: "A sophisticated, separate space for hosting guests with elegance and privacy." },
] as const;

export type PayRow = { label: string; amount: number };

export type Apartment = {
  slug: "type-a" | "type-b" | "type-c";
  type: string;
  rooms: number;
  beds: number;
  baths: number;
  headline: string;
  planAlt: string;
  /** Sizes read from the floor plan. */
  rooms_list: { name: string; size: string }[];
  schedule: PayRow[];
  /** Monthly instalment (paid 60 times). */
  monthly: number;
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
    planAlt: "Floor plan of Type A: three bedrooms with attached baths, terrace, drawing room and kitchen with dining lounge",
    rooms_list: [
      { name: "Bedrooms (3)", size: "11'-6\" × 13'-4\"" },
      { name: "Drawing room", size: "14' × 14'" },
      { name: "Baths (4)", size: "8' × 5' (three), 5'-6\" × 7'" },
      { name: "Kitchen, dining & lounge", size: "Open plan" },
      { name: "Terrace", size: "Large terrace" },
      { name: "Balcony", size: "8' × 3'" },
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
    monthly: 150000,
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
    planAlt: "Floor plan of Type B: two bedrooms with attached baths, terrace, drawing room and kitchen with dining lounge",
    rooms_list: [
      { name: "Bedrooms (2)", size: "11'-6\" × 16'" },
      { name: "Drawing room", size: "12'-6\" × 14'" },
      { name: "Baths (3)", size: "7' × 5'" },
      { name: "Kitchen, dining & lounge", size: "16'-5\" × 11'-6\"" },
      { name: "Terrace", size: "8'-7\" × 4'-1\"" },
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
    monthly: 100000,
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
    planAlt: "Floor plan of Type C: one bedroom with bath and terrace, drawing room and kitchen with dining and TV lounge",
    rooms_list: [
      { name: "Bedroom", size: "11'-6\" × 16', with wardrobe" },
      { name: "Drawing room", size: "12'-4\" × 13'-6\"" },
      { name: "Baths (2)", size: "7' × 7' and 5' × 7'" },
      { name: "Kitchen, dining & TV lounge", size: "15' × 11'-6\"" },
      { name: "Terrace", size: "5' × 5'-6\"" },
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
    monthly: 75000,
    cashPayable: 9114000,
    loan: 3900000,
    total: 13014000,
  },
];

export const rs = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

/* ------------------------------------------------------------------------------------------------
 * Company-level content for the Ali Zeeshan Enterprises portfolio site (the project site has its own, above).
 * ---------------------------------------------------------------------------------------------- */

/** CONFIRM: what the company actually offers. */
export const KEYWORDS = [
  "Residential Construction",
  "Commercial Buildings",
  "Apartments & Showrooms",
  "Turnkey Projects",
  "Renovation",
  "Interior Finishing",
  "Architecture & Design",
  "Project Management",
];

/** Company values, from the brochure's About text. */
export const PROMISES = [
  { icon: "quote", title: "Integrity", text: "Clear prices and honest dealing, written down for every client." },
  { icon: "materials", title: "Quality products", text: "Quality products and reliable services for our valued customers." },
  { icon: "updates", title: "Customer satisfaction", text: "A dedicated team and a customer-centric approach." },
  { icon: "schedule", title: "Timely delivery", text: "Long-term relationships built on trust and on-time delivery." },
] as const;

/** Base path of the Ali's Twin Tower project site. */
export const TT = "/alistwintower";

export const TOWER_NAV = [
  { label: "Overview", href: TT },
  { label: "Apartments", href: `${TT}/apartments` },
  { label: "Payment plans", href: `${TT}/payment-plans` },
  { label: "Lifestyle", href: `${TT}/lifestyle` },
  { label: "Location", href: `${TT}/location` },
  { label: "Contact", href: `${TT}/contact` },
] as const;

/** Site office, from the brochure. */
export const TOWER_OFFICE = {
  name: "Ali's Twin Towers site office",
  address: "Plot 25B, Scheme-33, Deh Songhal, Karachi", // CONFIRM spelling of "Songhal"
  phone: "+92 320 9281567",
  phoneHref: "tel:+923209281567",
  whatsappHref: "https://wa.me/923209281567", // CONFIRM: same number on WhatsApp?
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Plot+25B+Scheme+33+Deh+Songhal+Karachi",
  email: "info@alizeeshan.pk", // CONFIRM
  hours: "Mon–Sat, 10am–7pm", // CONFIRM
};
