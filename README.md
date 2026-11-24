# Ali Zeeshan Enterprises: sample website (Next.js)

Multi-page sample site for **Ali Zeeshan Enterprises** (Builders & Developers), made as a mock-up to show the client. It now also has a project section for the new **Ali's Twin Tower** apartments.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static)
```

## Stack

- Next.js 16.3 (App Router) + React 19.2, TypeScript: same stack as the HiScale and Azuma sites
- One CSS module (`src/components/site.module.css`) with design tokens in `src/app/globals.css`
- Archivo (variable width, for the wide headings that echo the logo) + Inter, self-hosted via `next/font/local`
- lucide-react icons; no other runtime dependencies

## Design

- **Theme "Black & Gold"**, taken from the logo: warm ink `#15120E`, ivory `#F6F2EA` (never plain white),
  and the logo's gold gradient (`#8B6522 → #F1D58E → #7D5A1A`) as the accent.
- **Logo**: `public/brand/` has the original plus transparent versions for light (`*-light.png`) and dark
  (`*-dark.png`, ivory + brightened gold) backgrounds, the mark on its own, and the wordmark. The favicon is
  generated from the mark.
- **Signature hero**: three photo "towers" shaped like the three buildings in the logo, rising on load with a
  gold blueprint outline, a slow zoom and pointer parallax, plus a "Live on site" card that cycles project progress.
- **Alive**: count-up stats, a keyword marquee with the gold triangle from the logo's "A", scroll reveals,
  a process rail that fills as you scroll, hover zooms, filterable projects. All motion respects
  `prefers-reduced-motion`.
- **Phones**: full-screen menu and a fixed Call / WhatsApp / Free estimate bar.

## Two sites in one app

**Ali Zeeshan Enterprises** is the company portfolio. **Ali's Twin Tower** is a separate project site with its own
logo, navy theme, header, footer and mobile bar. Clients are expected to spend most of their time on the project site.
Each project gets its own section like this (the next project can copy `src/app/alistwintower/`).

| Company site | Content |
| --- | --- |
| `/` | Hero, marquee, current-project teaser, About, Services, Why us |
| `/about`, `/services`, `/contact` | Company pages |
| `/projects` | Project list (links to the project site) |

| Project site | Content |
| --- | --- |
| `/alistwintower` | Hero with logo, story, highlights, apartment cards, payment snapshot, lifestyle, amenities, location |
| `/alistwintower/apartments` | Type A/B/C cards and comparison table |
| `/alistwintower/apartments/type-a` (`-b`, `-c`) | Floor plan, room-by-room close-ups, full payment schedule |
| `/alistwintower/payment-plans` | All three payment schedules, extra charges and notes |
| `/alistwintower/lifestyle` | Room cards and salient features |
| `/alistwintower/location` | Site office, Google Maps link |
| `/alistwintower/contact` | Book a visit form (tagged "Ali's Twin Tower site") |

Old `/projects/alis-twin-tower/...` and `/alis-twin-tower/...` links redirect to the new paths.

**Subdomain later** (`alistwintower.<company domain>`): the project's base path is the single constant `TT` in
`src/lib/site.ts`. Moving it to a subdomain means adding the domain in Netlify and a host-based rewrite to
`/alistwintower`, then setting `TT` to `""` for that deployment. Project data lives in `src/lib/site.ts` (`TWIN_TOWER`, `APARTMENTS`, `TOWER_OFFICE`, `TOWER_NAV`);
the logo files are in `public/brand/twin-tower/`.

## Placeholders to replace before going live

Everything marked `SAMPLE` or `CONFIRM` in `src/lib/site.ts`:

- [ ] Twin Tower: status/handover date, "Standby generator" (brochure text is cut off), spelling of "Deh Songhal", WhatsApp on the same number, office hours, email, logo file (`public/brand/`), architect drawings to check the redrawn floor plans (`src/lib/plans.ts`), area in sq ft, bath counts, Type C "On finishing" (600,000 inferred)
- [ ] Phone, WhatsApp number, email, office hours, city / office address
- [ ] Stats (15+ years, 120+ projects, 2M+ sq ft, 98% on time) and the "15+ years" badge
- [ ] Project names, sizes and photos (currently stock photos with made-up names)
- [ ] The "Live on site" projects in the hero
- [ ] Services list and promises (fixed quotes, weekly updates, etc.): confirm they offer these
- [ ] Photos: stock photos from Unsplash (credits in `public/photos/CREDITS.md`); swap in the client's own

## Form

The estimate form posts to Netlify Forms (registered in `public/__forms.html`). On another host the post fails
gracefully and visitors are shown the phone number and WhatsApp instead.

## Real content from the brochure

Site office (Plot 25B, Scheme-33, Deh Songhal, Karachi, 0320-9281567), the project story, "Unmatched Lifestyle" text,
salient features (masjid, covered parking, CCTV, 24/7 security, 8 lifts, play area, lobby, standby), and the
Type A/B/C plans and payment schedules are all in `src/lib/site.ts`.

AI room images: drop `kitchen.jpg`, `washroom.jpg`, `bedroom.jpg`, `living.jpg`, `drawing.jpg` into `public/renders/`
and rebuild. They replace the icon cards and get an "Artist impression" tag.

The old sample project gallery (`Projects.tsx`, `PROJECTS` in `site.ts`) is no longer shown: those names and photos were made up.
