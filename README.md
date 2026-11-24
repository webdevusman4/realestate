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

## Pages

| Route | Content |
| --- | --- |
| `/` | Hero, marquee, Twin Tower feature, About, Services, Why us, CTA |
| `/about` | About, stats, Why us, Process |
| `/services` | 6 services, Process |
| `/projects` | Twin Tower feature + filterable project gallery |
| `/projects/alis-twin-tower` | Highlights, Type A/B/C cards, side-by-side comparison |
| `/projects/alis-twin-tower/type-a` (`-b`, `-c`) | Floor plan, room sizes, full payment schedule, extra charges, notes |
| `/contact` | Details + free-estimate form |

Twin Tower prices, plans and payment schedules live in `src/lib/site.ts` (`APARTMENTS`, `EXTRA_CHARGES`, `PAYMENT_NOTES`).

## Placeholders to replace before going live

Everything marked `SAMPLE` or `CONFIRM` in `src/lib/site.ts`:

- [ ] Twin Tower: location, status/handover date, logo file (`public/brand/`), architect drawings to check the redrawn floor plans (`src/lib/plans.ts`), area in sq ft, bath counts, Type C "On finishing" (600,000 inferred)
- [ ] Phone, WhatsApp number, email, office hours, city / office address
- [ ] Stats (15+ years, 120+ projects, 2M+ sq ft, 98% on time) and the "15+ years" badge
- [ ] Project names, sizes and photos (currently stock photos with made-up names)
- [ ] The "Live on site" projects in the hero
- [ ] Services list and promises (fixed quotes, weekly updates, etc.): confirm they offer these
- [ ] Photos: stock photos from Unsplash (credits in `public/photos/CREDITS.md`); swap in the client's own

## Form

The estimate form posts to Netlify Forms (registered in `public/__forms.html`). On another host the post fails
gracefully and visitors are shown the phone number and WhatsApp instead.
