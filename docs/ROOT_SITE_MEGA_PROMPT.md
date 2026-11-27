# MEGA PROMPT: Ali Zeeshan Enterprises root website (v2: black-and-gold, project-site depth)

Paste everything below this line into Claude Code, run from the repo root.

---

## 0. Your role and the job

You are a senior product designer and front-end engineer. Rebuild the **company site at `/`** of Ali Zeeshan Enterprises so it feels as deep, specific and trustworthy as the Ali's Twin Tower project site (`/alistwintower`), but with the **company's own identity**: the black-and-gold of the Zeeshan logo (not the tower's navy).

Repo: `webdevusman4/realestate`, branch `main`. Next.js 16 App Router, React 19, TypeScript, CSS Modules, no Tailwind. Find `package.json` first.

### Current state (read before touching anything)
- Commit `2e6b00d` already ships a redesign on the concrete/brass theme: `src/components/co/*` (Header, Shell, Register, Form, Parts, Sections, co.module.css), `src/lib/company.ts`, `src/lib/seo.ts`, pages `/`, `/about`, `/services`, `/projects`, `/projects/[slug]`, `/contact`, `/buying-guide`, `/faq`, `/updates`, `/careers`, `/privacy`, `/terms`, `not-found.tsx`.
- This job is **v2**: re-theme to the logo's black-and-gold, add `/payment-plans`, deepen every page to the section lists below, and replace weak imagery.
- Read first: `README.md`, `src/lib/company.ts`, `src/lib/site.ts`, `src/lib/seo.ts`, `src/components/co/*`, `src/app/layout.tsx`, and the tower files for reference only: `src/components/TowerParts.tsx`, `src/components/PageParts.tsx`, `src/app/alistwintower/**`.

### Do NOT change (the tower must look and behave exactly as now)
`src/app/alistwintower/**`, `src/components/TowerParts.tsx`, `src/components/PageParts.tsx`, `src/components/assistant/**`, `src/app/api/assistant/**`, `src/components/site.module.css`, `src/components/Sections.tsx`, `src/components/Hero.tsx`, `src/components/Projects.tsx`, and every **existing export** of `src/lib/site.ts` and `src/lib/company.ts` that those files import (`FACTS`, `PROJECT_FILTERS`, `PROJECTS`, `SERVICES`, `LEADERS`, `STORY`, `projectHref`). Only add to those files, never change a shape. Scope all new CSS to `co.module.css` or new `.module.css` files under `src/components/co/`. Do not edit `src/app/globals.css` colour tokens (the tower reads them).
Prove it: screenshot `/alistwintower`, `/alistwintower/apartments`, `/alistwintower/payment-plans` at 1440 and 390 px before and after; the PNGs must be byte-identical.

---

## 1. Hard rules

### Real versus dummy
**Real (use as given):** company name Ali Zeeshan Enterprises; "Builder & Real Estate Developer"; registered 2019; ABAD and PEC members; phone +92 320 9281567; booking office Plot 25-B, Scheme-33, Karachi; hours 10:00 am to 8:00 pm; services: commercial buildings, real estate development; project names (Ali's Twin Tower, Zeeshan Pride, Ali's Tower, Ali Complex, Ali's Bridge View, Ali Skyline); owner names Kamran Ali Khan and Shariq Aziz (roles are dummy); all Ali's Twin Tower data in `src/lib/site.ts` and `src/lib/plans.ts` (prices, schedules, plans, features, FAQ).

**Dummy but best:** everything else. Dummy content must be **realistic, specific and well written**, not lorem ipsum, and must carry the existing visible marker: `sample: true` in data and the `Tag` ("Sample details", "Sample wording", "Example post", "Confirm with the office") in the UI. Add a `// SAMPLE` comment on each dummy value.

**Never invent:** phone numbers, email addresses beyond the existing `info@alizeeshan.pk` (already marked CONFIRM), prices or payment amounts for any project other than Twin Tower, awards, certificate numbers, testimonials or reviews, customer counts, "years of experience", square-feet totals, delivery dates, handover dates, bank names, RERA/authority approval numbers, press mentions, partner logos. If a fact is missing, say "Ask the booking office" or "To be announced", with a Tag.

### Copy rules (apply the stop-slop and copy-editing standards)
- Plain English a Karachi buyer reads in one pass. Short sentences. One idea per sentence.
- Banned: elevate, seamless, world-class, cutting-edge, state-of-the-art, premier, curated, bespoke, unparalleled, redefine, journey, "we are passionate", "in today's fast-paced world", rhetorical questions as headings, three-adjective lists, em-dash chains, "not just X, but Y".
- Headlines are statements of fact or action. Buttons are verbs: "Book a site visit", "See payment plans", "Call the booking office".
- Numbers: write "Rs 13,014,000" (existing `rs()` helper). Dates and times as "10:00 am – 8:00 pm".
- The primary CTA everywhere is **"Book a site visit"**.

### Other
- Never commit secrets. `GEMINI_API_KEY` stays an env var only.
- Do not send personal or project data to outside services.
- Do not mention any AI model name in code, copy, commits or comments.
- No new heavy libraries. Reuse the self-hosted fonts and `lucide-react`.
- Commit as `webdevusman4 <webdevusman4@users.noreply.github.com>`.

---

## 2. Brand and theme: "Zeeshan Black & Gold" (taken from the logo)

The logo (`public/brand/logo-light.png`, `logo-dark.png`, `mark-*.png`, `wordmark-*.png`) is: heavy black line-art of three stepped towers; a **gold gradient "A" and "Z" strokes** running from dark bronze through mid gold to pale gold; a wide, geometric, all-caps wordmark (ALI / ZEESHAN / ENTERPRISES) with thin gold rules either side. Build the whole site from that.

### Colour tokens (define on `.root` in `co.module.css`; replace the concrete/brass set)
```
--ink:        #14110d   /* logo black, warm */
--ink-2:      #1e1a15
--ink-3:      #2a251e
--ivory:      #f6f2ea   /* page background; never plain white */
--ivory-2:    #efe9dd   /* alternate section band */
--paper:      #fbf9f4   /* cards and form fields */
--line:       #ddd3c1   /* hairlines on light */
--line-dark:  rgba(246,242,234,.18)  /* hairlines on dark */
--text:       #4a443a   /* body on light, 8.9:1 on ivory */
--text-dark:  rgba(246,242,234,.78)  /* body on ink */
--gold-300:   #f1d58e
--gold-400:   #ddb25a
--gold-500:   #c99a3f
--gold-700:   #7d5a1a
--gold-ink:   #7a5a1f   /* gold as TEXT on light; passes AA */
--gold-grad:  linear-gradient(115deg,#8b6522 0%,#d9ae55 32%,#f1d58e 50%,#c99a3f 68%,#7d5a1a 100%)
--ok:         #2f5d3a
--err:        #8a2a22
```
Rules:
- Rhythm of bands: **ink (hero, featured project, CTA band, footer) alternating with ivory and ivory-2.** About 30% of the page is ink.
- Gold is an **accent**: hairlines, numerals, the "A/Z" gradient on one headline word per page at most, active states, the primary button on dark. Never gold body text on ivory (use `--gold-ink`). Never a gold gradient behind long text.
- Primary button on ivory: ink fill, ivory text, gold underline slide on hover. Primary button on ink: gold-gradient fill, ink text. Secondary: 1px outline.
- No navy, no blue accents, no purple, no gradients other than the gold one, no glassmorphism, no drop-shadow cards (use hairlines and tonal bands), no emoji, no icon-in-circle feature grids.
- Check every text/background pair for WCAG AA (4.5:1; 3:1 for 24px+). List the pairs and ratios in your final report.

### Type
- **Headings:** Archivo, using its width axis (`font-stretch: 112%–125%`) in uppercase for H1 and section titles only where short (≤ 6 words), to echo the wide ZEESHAN wordmark. Weight 600–700. Letter-spacing 0.02em on uppercase.
- **Statements and large pull-quotes:** Newsreader (already loaded), weight 300–400, sentence case. This is the "editorial" voice from the current site and stays.
- **Body and UI:** Inter 400/500, 17px base, line-height 1.65, max line length 68ch.
- Scale: H1 `clamp(40px, 5vw, 76px)`, H2 `clamp(30px, 3.6vw, 52px)`, H3 24–30px, eyebrow 13px uppercase, tracking 0.14em, gold-ink with a 28px gold hairline before it.
- Numerals in tables use `font-variant-numeric: tabular-nums`.

### Layout and components
- 12-column grid, max content width 1360px, gutter `clamp(20px,4vw,56px)`, section padding `clamp(72px,9vw,136px)`.
- Section header pattern: 3-column label (eyebrow) + 9-column title, as now.
- **Signature motifs from the logo (use sparingly, one per page):** (a) the stepped-tower silhouette as a faint 4% line watermark behind the hero or CTA band (inline SVG derived from `mark-dark.png` outline, `aria-hidden`); (b) the logo's "gold rule - text - gold rule" divider above the footer wordmark and above the FinalCta title.
- Cards: no shadow, 1px `--line` border, 0 radius (the logo is all sharp corners). Images 0 radius.
- Tables: hairline rows, header row with 1px ink bottom border, sticky first column on mobile scroll.
- Forms: 48px fields, visible labels (never placeholder-only), inline errors with `aria-describedby`, focus ring 2px gold, error border `--err`.
- Tags: 1px gold border, `--gold-ink` text, 12px, used for every "Sample" marker.
- Motion: only (1) hero image slow zoom 1.0 → 1.04 over 14s, (2) fade-up on scroll for sections (8px, 400ms), (3) button underline slide, (4) accordion open. All wrapped in `@media (prefers-reduced-motion: no-preference)`. No parallax, no counters, no marquee.
- Header: ink background, ivory text, logo `mark-dark.png` + wordmark, gold underline on the active link, "Book a site visit" gold button. Collapses to a full-screen sheet at ≤ 1120px with focus trap (the current `Header.tsx` already does this; keep the behaviour, change the skin).

---

## 3. Image direction: be picky

All photography is **dummy**, but it must look like one coherent, expensive shoot. If an image fails any rule below, do not use it.

### Global rules (every image)
1. **Subject:** mid- and high-rise concrete and glass buildings, residential balconies, construction frames, cranes, drawings, finished interiors. This company builds **apartments and commercial buildings**. **Reject villas, bungalows, private pools, lawns, resort houses.**
2. **Light:** warm. Golden hour, dusk, blue hour with lit windows, or soft overcast. **Reject flat saturated-blue midday skies, harsh noon glare, HDR halos, oversaturated "stock" greens.**
3. **Colour grade:** warm, slightly desaturated, matching the ivory-black-gold palette. If a good photo is cool, correct white balance warmer by ~5–8% and lower saturation ~10% with `sharp` at build time (script in `scripts/`), never with a CSS filter.
4. **People:** **no identifiable faces. No staff or "team" stock photos. No foreign-looking crews.** Hands on drawings, backs of heads at distance, or no people. Never present stock people as the company's staff or as customers.
5. **Text and brands:** reject any image with a readable logo, brand, shirt text, signage, licence plate or watermark (for example `architect-drafting.jpg` shows a brand on a shirt; `worker-helmet.jpg` shows a safety logo).
6. **Place:** prefer South Asian or Gulf urban context (low-rise Karachi-like skyline, dense mid-rise, concrete and tiled facades). Reject obvious Western or East-Asian signage, snow, European architecture, left-hand-drive road scenes.
7. **Composition:** a clear subject, quiet area for text overlay on the left third for heroes, straight verticals (reject tilted, dutch-angle), no clutter.
8. **Quality:** ≥ 2400 px on the long edge for heroes, ≥ 1600 px for banners, ≥ 1200 px for cards; sharp; no compression artefacts; no AI-looking distortions (warped windows, melted rails, extra floors).
9. **Truthfulness:** every stock image is labelled in the UI as "Representative image" (small caption or tag) and recorded in `public/photos/CREDITS.md` with file, photographer, source URL, licence, and which page uses it. Ali's Twin Tower **renders** are the only images that may stand for a real project, and only for Twin Tower.

### Audit of the current `public/photos/` (verdicts; apply them)
| File | Verdict | Reason / use |
| --- | --- | --- |
| `hero-crane-sunset.jpg` | KEEP | Warm dusk crane. Updates banner, Ali's Bridge View banner. |
| `cranes-city.jpg` | KEEP | Warm dusk cranes. Real estate development service, Ali Skyline banner. |
| `commercial-facade.jpg` | KEEP | Warm timber facade. Commercial buildings service, Ali Complex card. Cool sky: warm-grade it. |
| `structure-concrete.jpg` | KEEP | Concrete frame. Construction updates, "How we build" strip. |
| `office-glass.jpg` | KEEP, regrade | Curved glass, strong. Ali's Tower banner. Sky is cold: warm-grade. |
| `interior-lounge.jpg` | KEEP | Warm finished lounge. Residential gallery, Zeeshan Pride. |
| `interior-window.jpg` | KEEP | Calm neutral room. Zeeshan Pride gallery. |
| `blueprints-team.jpg` | KEEP, crop | Hands and plans only. Crop below the wrists. About, buying guide. |
| `structure-crane.jpg` | KEEP, regrade | Frame with crane. Blue sky: warm-grade. Updates post image. |
| `apartments.jpg` | KEEP as detail | Abstract facade. Card texture only, never a hero. |
| `architect-drafting.jpg` | REPLACE | Brand text on shirt, partial face. |
| `worker-helmet.jpg` | REPLACE | Visible safety logo, person in frame. |
| `engineer-site.jpg` | REPLACE | Foreign-looking crew, faces visible. |
| `villa-pool.jpg`, `villa-dusk.jpg`, `villa-white.jpg`, `house-modern.jpg`, `house-night.jpg` | REMOVE from the company site | Villas and pools: wrong product. Delete only if no tower file imports them (`grep` first); otherwise just stop using them. |

### Shot list: find or generate replacements (dummy but best)
Search free-licence sources (Unsplash, Pexels) if tools are available; otherwise list the exact queries in the final report and keep the best KEEP images in the slot. Prefer images that already match Karachi's look. Queries:
- Hero alternates (Home): "Karachi skyline dusk", "residential high-rise concrete balconies golden hour", "apartment tower blue hour lit windows low angle".
- Residential banner: "apartment building balconies sunset concrete", "mid-rise residential facade warm light".
- Commercial banner: "commercial plaza facade dusk", "glass office building warm sunset reflection".
- Construction: "reinforced concrete frame building site golden hour", "tower crane silhouette sunrise", "rebar slab close up warm light".
- Planning: "architectural drawings hands pencil close up warm desk" (hands only), "site plan model close up".
- Interiors: "modern apartment living room wooden floor warm light", "apartment kitchen open plan wood", "apartment bedroom natural light neutral".
- Texture strips: "concrete wall texture warm", "wood panel texture".
For each chosen file, record: query used, why it passed rules 1–9, crop, and grade applied.

### Per-slot image plan
| Slot | Image | Crop and size | Notes |
| --- | --- | --- | --- |
| Home hero | Ali's Twin Tower render `/hero/twin-tower-hero.jpg` (desktop), `-mobile.jpg` (≤ 700px) | 16:9 / 4:5 | `priority`, `sizes` set. This is real. |
| Home featured block | Twin Tower render, different crop (right 60%) | 16:11 | Alt describes the building. |
| Register previews | one image per project (table below) | 4:5 preview, 84×64 thumbnail on mobile | |
| Project banners | table below | 21:9 desktop, 4:3 mobile | `object-position` set per image |
| Service rows | commercial-facade, cranes-city, interior-lounge, office-glass | 4:3 | |
| Updates | Twin Tower render, structure-concrete, structure-crane | 4:3 | Sample posts tagged. |
| About band | blueprints-team cropped to hands, structure-concrete | 3:2 | No faces. |
| Buying guide | none in hero; one interior (interior-lounge) beside the steps | 4:5 | |
| OG / social | `public/og/company.jpg` 1200×630 from the Twin Tower hero | | Already exists. |

Project image map:
| Project | Register / card | Banner | Gallery (3) |
| --- | --- | --- | --- |
| Ali's Twin Tower | hero-mobile render | render | project site only |
| Zeeshan Pride | apartments | interior-lounge crop | interior-lounge, interior-window, apartments |
| Ali's Tower | office-glass | office-glass | commercial-facade, structure-concrete, blueprints-team |
| Ali Complex | commercial-facade | commercial-facade | office-glass, structure-crane, structure-concrete |
| Ali's Bridge View | hero-crane-sunset | hero-crane-sunset | cranes-city, structure-crane, blueprints-team |
| Ali Skyline | cranes-city | cranes-city | hero-crane-sunset, office-glass, blueprints-team |
Replace any gallery slot that used a REPLACE/REMOVE file. No image may appear twice on the same page.

### Technical image rules
- Everything through `next/image` with `sizes` that match the layout; `priority` only on the single LCP image per page; `loading="lazy"` default; explicit aspect ratios (container `aspect-ratio`) so there is no layout shift.
- Alt text describes what is visible, in one sentence, no "image of". Decorative images use `alt=""`.
- Quality 78, AVIF/WebP via Next. Source JPEG ≤ 350 KB for banners, ≤ 160 KB for cards. Run `sharp` in a `scripts/prepare-images.mjs` to resize, crop and grade; commit outputs, not originals above 2600 px.
- Add a visible "Representative image" micro-caption (12px, ivory on ink bar at the image's bottom-left) to stock images; none on Twin Tower renders (label those "Artist impression").

---

## 4. Global elements (every root page)

1. **Skip link** "Skip to content" (first focusable).
2. **Top strip** (ink, 13.5px): left "Booking office: Plot 25-B, Scheme-33, Karachi"; right "10:00 am – 8:00 pm" and the phone as a `tel:` link. Hidden address on ≤ 1120px; phone stays.
3. **Header**: logo mark + "Ali Zeeshan Enterprises / Builders & Real Estate Developers"; nav: Projects, Payment plans, Buying guide, Updates, About, Contact (Services and FAQ live in the footer and on Home); right: gold "Book a site visit". Sticky, 72px.
4. **Mobile bar** (≤ 900px, fixed bottom, 58px): Call · WhatsApp · Book a site visit (gold). Body gets bottom padding so nothing hides behind it.
5. **Final CTA band** (ink, tower silhouette watermark, gold-rule divider): title + "Book a site visit" + "Call +92 320 9281567". Above the footer on every page except Contact, legal pages and 404.
6. **Footer** (ink): logo, one-sentence description, then columns Projects (all six), Company (About, Services, Updates, Careers, FAQ), Buy (Payment plans, Buying guide, Contact, Ali's Twin Tower site), Booking office (address, hours, phone, email, WhatsApp). Bottom bar: © year, "Registered 2019. Member of ABAD and PEC.", Privacy, Terms, "Renders and plans are for illustration."
7. **Optional AI chat** (flag `NEXT_PUBLIC_ROOT_ASSISTANT`, default off): do not build a second chat. If the flag is on, mount the existing assistant component unchanged; if not, render nothing. Do not edit assistant files.
8. **Breadcrumb** + BreadcrumbList JSON-LD on every inner page (existing `PageHead`).
9. **Tap targets** ≥ 44px; visible gold focus ring on every interactive element.

---

## 5. Pages, sections and details (13 pages + project pages)

For each section: purpose, elements in order, content, data source, image. "Sample" means tag it.

### 5.1 Home `/`  (9 sections)
Meta: title "Ali Zeeshan Enterprises | Builders & Real Estate Developers, Karachi"; description from `SITE.description`; JSON-LD `Organization` + `RealEstateAgent` (`companyLd()`).
1. **Hero** (ink, full viewport minus header). Left (5 cols): eyebrow "Open for booking · Scheme-33, Karachi"; H1 "Apartments and commercial buildings in Karachi." (one word, "Karachi", in gold gradient); lede "We build and sell our own projects. Ali's Twin Tower is open for booking. Visit the booking office and see the plans."; buttons "See our projects" (gold) and "Book a site visit" (outline). Right (7 cols): Twin Tower render with slow zoom; bottom-left plate: "Now booking · Ali's Twin Tower · Apartments from Rs 13,014,000" linking to `/alistwintower`. Tower-silhouette watermark behind text.
2. **Trust row** (ivory): four cells divided by hairlines: "Registered 2019 / Karachi builder and developer"; "ABAD member / Association of Builders & Developers"; "PEC member / Pakistan Engineering Council"; "10:00 am – 8:00 pm / Booking office hours". Tag "Confirm membership numbers" on a small line below.
3. **Statement** (ivory-2): label "The company"; Newsreader statement (STORY[0], sample); tag "Sample wording".
4. **Project register** (ivory, the one bold element): table with columns Project, Type, Location, Status; hover or focus brings a 4:5 image on the right with caption "name: size"; mobile rows show an 84×64 thumbnail. Rows link to project pages (Twin Tower to `/alistwintower`). Note under table: "Details for projects marked as sample are placeholders."
5. **Featured project** (ink): left render 16:11; right: eyebrow "Open for booking", H2 "Ali's Twin Tower, Scheme-33.", one sentence, 3-row mini table (Instalments: 60 monthly, 10 half-yearly / Cash payment: 10% off at booking / Bank loan: option shown in each schedule), buttons "Visit the project site" and "See payment plans".
6. **Why buy from us** (ivory): H2 "Four things you can check yourself."; numbered ledger 01–04 from `WHY_US` (one company from land to keys; prices written down; a way to pay that fits; registered and answerable).
7. **How buying works** (ivory-2): H2 "Five steps from first visit to possession."; numbered rows 01–05 (compact text); link "Read the full buying guide".
8. **What we do** (ivory): H2 "We build the building, develop the project and sell the apartments."; four service rows with a 4:3 image, title, one sentence, tags; sample tags where `sample: true`.
9. **Questions** (ivory-2): five accordion items from `FAQ`; link "All 10 questions".
Then **Final CTA** and a **Visit us** block (address, hours, phone, email, "Book a site visit", "Open in Google Maps", lazy map iframe).
(Leadership moves to About; the home page stays focused.)

### 5.2 Projects `/projects`  (4 sections)
Meta: "Projects"; list all six.
1. **Page head** (ink band): breadcrumb; H1 "Our projects."; one sentence.
2. **Filters + register**: two filter groups, status (All, Now booking, Completed, Upcoming) and type (All types, Residential, Commercial) as `aria-pressed` buttons, 44px; live count (`role=status`, visually hidden); empty state "No projects match these filters. Try 'All'."
3. **Featured block** (same as Home 5).
4. **Visit us** + Final CTA.

### 5.3 Project detail `/projects/[slug]`  (9 sections; generated for the five non-tower projects)
Meta per project; BreadcrumbList; no invented structured data.
1. **Page head** + banner (21:9): H1 project name, summary; "Representative image" caption.
2. **Facts table**: Status, Type, Location, Year or Launch, Size, Developer (all sample except Twin Tower); a Tag when `sample`.
3. **Highlights**: three ruled lines.
4. **Gallery**: 3 images, 4:3, captions "Representative photo".
5. **Location**: text only (no map pin for sample locations): "Karachi (exact address to follow)". Tag.
6. **Payment**: "Payment plan: ask the booking office" or "Announced at launch" for Upcoming; link to `/payment-plans` and `/buying-guide`. Never show invented prices.
7. **Enquiry form**: pre-filled project, visit date/time hidden for Upcoming ("Register interest").
8. **Related projects**: four cards, same-type first, 4:3 images.
9. **Final CTA**.

### 5.4 Payment plans `/payment-plans`  (new, 6 sections)
Meta: "Payment plans for Ali's Twin Tower and how our plans work"; description with booking, 60 instalments, loan, 10% cash discount.
1. **Page head**: H1 "Payment plans."; sentence "Real figures from the Ali's Twin Tower schedules. Other projects announce plans at launch."
2. **Basics** (`PAYMENT_BASICS`): six hairline rows.
3. **Compare the three types**: table (Type, Rooms, Bedrooms, Total cost, Booking, Monthly instalment, Expected bank loan, Cash payable). Data from `APARTMENTS`; no hand-typed numbers. Sticky first column, horizontal scroll on mobile with a visible scroll hint.
4. **Extra charges and exclusions**: from `EXTRA_CHARGES` and the "not included" note in `PAYMENT_NOTES`.
5. **Terms**: `PAYMENT_NOTES` as numbered list, verbatim.
6. **Links**: per-type schedules on the project site (`/alistwintower/apartments/type-a` …), CTA band.
Add a visible line: "Prices and schedules are for Ali's Twin Tower and are confirmed only in writing by the booking office."

### 5.5 Buying guide `/buying-guide`  (6 sections)
1. **Page head**: H1 "How to buy an apartment."
2. **Five booking steps**: full text from `BUY_STEPS`.
3. **Payment basics** beside an intro (two columns).
4. **Documents**: checklist `DOCUMENTS`; Tag "Confirm with the office".
5. **Possession**: short paragraph; no date.
6. **FAQ** (first six) + Final CTA.

### 5.6 About `/about`  (7 sections)
1. **Page head**: H1 "A builder and developer in Karachi."
2. **Story + facts**: `STORY` (sample tag) beside a four-cell facts list (2019, ABAD, PEC, office hours).
3. **Leadership**: two ledger rows (names real, roles sample). **No photos** (none supplied); use a monogram block (initials in gold on ink) instead of stock people.
4. **Memberships**: ABAD and PEC rows with "Confirm membership number" tags.
5. **How we work**: four actions (`VALUES_ACTIONS`), as a ledger.
6. **Timeline**: 2019 registered (real) → 2020 / 2021 / 2022 sample projects (tagged) → Now: Twin Tower.
7. **Final CTA** + Visit us.

### 5.7 Services `/services`  (3 sections)
1. **Page head**: H1 "What we do."
2. **Four service rows**: Commercial Buildings, Real Estate Development (real); Residential Apartments, Booking & Sales Support (sample wording, tagged). Each: image, title, two sentences, tag chips, link to the relevant page (Projects, Buying guide).
3. **How a project runs** (the five `PROCESS` steps, sample tag) + Final CTA.

### 5.8 Updates `/updates`  (3 sections)
1. **Page head**: H1 "Project updates."
2. **Notice**: Tag "Example posts" + "Posts marked as examples show the format."
3. **Post list**: each row: project, date, title, two-sentence text, 4:3 image. Post 1 (real): "Ali's Twin Tower is open for booking." Posts 2–3 sample ("Structure progress", "Facilities update"), no invented percentages or floors.

### 5.9 Contact `/contact`  (4 sections)
1. **Page head**: H1 "Book a site visit."
2. **Left column**: details table (office, hours, phone, email); buttons "Call +92 320 9281567" and "WhatsApp" (pre-filled message); lazy map iframe (`loading="lazy"`, fixed height) + "Open in Google Maps" link.
3. **Right column, visit form**: Full name*, Phone or WhatsApp*, Email (optional), I am interested in (select), Preferred visit date (min = today), Preferred time (10:00 am to 7:00 pm slots), Message, honeypot, privacy line. Client validation (Pakistani phone formats; optional email), error summary, focus to first invalid field, `aria-live` status, success panel "Thank you. We have your details." with next steps, failure panel with phone and WhatsApp fallback. Netlify form `estimate` fields registered in `public/__forms.html`.
4. **Office hours note**: "Open 10:00 am – 8:00 pm. Days to be confirmed." Tag.

### 5.10 FAQ `/faq`  (2 sections)
1. **Page head**: H1 "Questions and answers."
2. **Accordion in three groups** (Company, Buying, Payment) from `FAQ`; native `<details>`; **FAQPage JSON-LD** from the same data. Answers must use confirmed facts or point to the booking office.

### 5.11 Careers `/careers`  (2 sections)
Head "Work with us." and one honest paragraph: no open roles; email CV and role; office details.

### 5.12 Privacy `/privacy` and Terms `/terms`  (draft)
Plain-language sections; top banner "Draft for review by the company's lawyer. Not final legal text."; `noindex`. Privacy covers what the form collects, use, where it goes (website host's form service), and how to ask for deletion.

### 5.13 Not found
Large "404"; H1 "This page does not exist."; two buttons (See our projects, Go to the home page); phone line. `noindex`.

---

## 6. Data model (add to `src/lib/company.ts`, do not change existing exports)
- Extend `Project` with optional `facts`, `unitsNote`, `paymentNote`, `imageCredit` (all optional, sample-flagged).
- Add `PAYMENT_COMPARE` derived from `APARTMENTS` (no typed numbers).
- Add `IMAGE_MAP` linking project slug to banner, card and gallery (single source of truth for section 3).
- Keep every dummy field commented `// SAMPLE`.

## 7. SEO and GEO
- Per-page `pageMeta()` (title, description 120–160 chars, canonical, OpenGraph, Twitter), one `<h1>` per page, logical heading order.
- JSON-LD: `Organization` + `RealEstateAgent` (Home), `BreadcrumbList` (inner pages), `FAQPage` (FAQ). No `Review`, `AggregateRating`, `Offer` or `Product` for projects with sample data.
- `sitemap.ts` and `llms.txt` list every page including `/payment-plans`; legal pages excluded from the sitemap.
- `robots.ts` unchanged. Self-referencing canonicals. `lang="en"`.
- `llms.txt`: company summary first, then pages, then Twin Tower facts; state which projects are placeholders.

## 8. Accessibility and performance (hard targets)
- WCAG 2.2 AA: contrast, visible focus, keyboard-operable menu and filters, `aria-pressed`, `aria-expanded`, labelled landmarks, error text linked to fields, reduced motion respected, no content only in images.
- Responsive from 360 to 1920 px; test 390, 768, 1024, 1440.
- No layout shift (CLS < 0.05), LCP < 2.5 s on mobile (hero image `priority`, preloaded, AVIF), no render-blocking third-party scripts, map iframe lazy, JS only where needed (header, register, form, accordion is native).
- No horizontal scroll at any width.

## 9. Process (follow in order)
1. Analyse the repo and the tower site; write a short design plan (palette, type, layout, principles), review it against generic AI-site defaults (hero gradient blobs, three icon cards, counters, fake logos, testimonial carousels), revise, then show it in chat.
2. Use the available skills where tools exist (frontend-design, stop-slop, copywriting, copy-editing, web-design-guidelines, a11y, perf, site-audit). Skip any that are unavailable; do not stall.
3. Build in this order: tokens and global shell, image preparation script and image map, data additions, Home, Projects and detail template, Payment plans, Buying guide, About, Services, Updates, Contact, FAQ, Careers, legal, 404, SEO files.
4. After each step run `npx tsc --noEmit && npx eslint src && npx next build`.
5. Screenshot every root page at 1440 and 390 px with Playwright, view them at readable crop size (not a single tiny full-page image), fix issues. Screenshot the three tower pages before and after and prove byte-equality.
6. Run an automated audit script over every page: one h1, no horizontal overflow, tap targets ≥ 44px, images with alt, JSON-LD parses, canonical present, CLS and LCP.
7. Update `README.md` (real versus dummy list, new pages, image rules, how to swap in real photos) and `public/photos/CREDITS.md` (every image, source, licence, page).
8. Commit and push to `main` as `webdevusman4`.

## 10. Final report format (plain English, short)
- What changed, page by page.
- Every image used: slot, file, why it passed the rules; every image removed or replaced and why; queries used for new ones.
- Colour pairs and contrast ratios.
- Audit results (CLS, LCP, overflow, targets).
- Tower proof (byte-identical screenshots).
- What is still dummy, and the exact list the client must confirm: real photos, project facts, membership numbers, email, WhatsApp number, hours by day, handover date, company story, document checklist, lawyer review of privacy and terms, real domain (`NEXT_PUBLIC_SITE_URL`).
