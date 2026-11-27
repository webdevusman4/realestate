# Ali Zeeshan Enterprises: Company & Project Website (Next.js)

Multi-page website for **Ali Zeeshan Enterprises** (Builders & Real Estate Developers, Karachi), paired with the separate **Ali's Twin Tower** project site (`/alistwintower`).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static)
```

## Stack

- Next.js 16 (App Router) + React 19, TypeScript
- Company site styles scoped to `src/components/co/co.module.css` ("Zeeshan Black & Gold": ink `#14110D`, warm ivory `#F6F2EA` / `#EFE9DD`, gold `#C99A3F` / `#7A5A1F`)
- Twin Tower project site uses `src/components/site.module.css` + `src/app/globals.css` (unchanged)
- Self-hosted variable fonts via `next/font/local`: Archivo (wide headings), Newsreader (statements & editorial headings), Inter (body & UI)
- `lucide-react` icons; no extra runtime dependencies

## Two sites in one app

| Company site (v2 Black & Gold) | Content |
| --- | --- |
| `/` | Hero, trust strip, company statement, interactive project register, Twin Tower featured block, why buy from us, 5-step buying summary, services with 4:3 photos, 5 FAQs, Final CTA, Visit us |
| `/projects` | Filterable project register (status & type), Twin Tower featured block, Visit us, Final CTA |
| `/projects/[slug]` | Individual project page (facts, highlights, 3-photo gallery, text-only location, payment note, enquiry form, related projects, Final CTA) |
| `/payment-plans` | Payment plan basics, Type A/B/C comparison table (from `APARTMENTS`), extra charges & exclusions, schedule terms verbatim, links to schedules |
| `/buying-guide` | 5 booking steps beside interior photo, payment plan basics, document checklist, possession note, 6 FAQs, Final CTA |
| `/about` | Story, facts, 3:2 planning/site photo strip, leadership monogram blocks, ABAD & PEC memberships, values ledger, timeline |
| `/services` | 4 service rows with 4:3 images, tags & destination links; 5-step project process |
| `/updates` | Booking announcement (real) + example construction/facilities post format |
| `/contact` | Booking office details, click-to-call, WhatsApp, lazy map, validated site-visit form |
| `/faq` | Grouped accordion (Company, Buying, Payment) + `FAQPage` JSON-LD |
| `/careers` | Honest enquiry note + office details |
| `/privacy`, `/terms` | Draft legal pages (`noindex`, excluded from `sitemap.xml`) |

| Project site (`/alistwintower`, unchanged) | Content |
| --- | --- |
| `/alistwintower` | Hero with logo, story, highlights, apartment cards, payment snapshot, lifestyle, amenities, location |
| `/alistwintower/apartments` | Type A/B/C cards and comparison table |
| `/alistwintower/apartments/type-a` (`-b`, `-c`) | Floor plan, room-by-room close-ups, full payment schedule |
| `/alistwintower/payment-plans` | All three payment schedules, extra charges and notes |
| `/alistwintower/lifestyle` | Room cards and salient features |
| `/alistwintower/location` | Site office, Google Maps link |
| `/alistwintower/contact` | Book a visit form (tagged "Ali's Twin Tower site") |

## Real vs dummy content

**Real (confirmed by the client):**
- Company name `Ali Zeeshan Enterprises`, `"Builder & Real Estate Developer"`, registered `2019`
- Memberships: `ABAD` and `PEC` (membership numbers/categories to confirm)
- Phone `+92 320 9281567`, booking office `Plot 25-B, Scheme-33, Karachi`, hours `10:00 am – 8:00 pm` (days to confirm)
- Services: `Commercial Buildings`, `Real Estate Development`
- Project names: `Ali's Twin Tower`, `Zeeshan Pride`, `Ali's Tower`, `Ali Complex`, `Ali's Bridge View`, `Ali Skyline`
- Owner names: `Kamran Ali Khan`, `Shariq Aziz` (roles are sample placeholders)
- All `Ali's Twin Tower` pricing, payment schedules, floor plans, features and FAQ in `src/lib/site.ts` and `src/lib/plans.ts`

**Dummy / placeholder (tagged `sample: true` in `src/lib/company.ts` and badged with `<Tag>` in UI):**
- Project sizes, years, locations and summaries for all 5 non-tower projects (`Zeeshan Pride`, `Ali's Tower`, `Ali Complex`, `Ali's Bridge View`, `Ali Skyline`)
- Company story (`STORY`), director roles, timeline years `2020`–`2022`, `Residential Apartments` and `Booking & Sales Support` wording, `PROCESS` steps
- Document checklist on `/buying-guide`, two example progress posts on `/updates`
- Draft email `info@alizeeshan.pk`, ABAD/PEC registration numbers, `/privacy` and `/terms` drafts (awaiting lawyer review)

## Images & how to swap in real photos

All photography for non-tower projects and company sections is representative and mapped centrally via `IMAGE_MAP`, `SERVICE_V2`, and `UPDATES` in `src/lib/company.ts`. Credits and audit verdicts live in `public/photos/CREDITS.md`.

To process, crop and warm-grade replacement photos with `sharp` (banners ≤ 350 KB, cards ≤ 160 KB, max long edge ≤ 2600 px):

```bash
node scripts/prepare-images.mjs
```

To replace a stock photo with a real site photo:
1. Drop the real high-resolution photo into `public/photos/` (matching or adding a slug entry in `IMAGE_MAP`).
2. Run `node scripts/prepare-images.mjs` (or compress ≤ 350 KB for banners, ≤ 160 KB for cards).
3. Update the caption/credit in `public/photos/CREDITS.md` and remove `"Representative image"` / `sample` tags once confirmed.

## SEO, forms & optional assistant

- `SITE_ORIGIN` (in `src/lib/site.ts`) uses `NEXT_PUBLIC_SITE_URL` (or Netlify `URL`) for canonical links, OpenGraph, `/sitemap.xml`, and `/llms.txt`.
- The enquiry / visit form posts to Netlify Forms (`public/__forms.html`, form name `estimate`), with Pakistani phone validation and click-to-call / WhatsApp fallback on error.
- Root site assistant: off by default. Set `NEXT_PUBLIC_ROOT_ASSISTANT=1` to mount the existing `TowerAssistant` on company pages without modifying any assistant code.
