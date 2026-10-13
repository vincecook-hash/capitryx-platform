# Architecture
- `src/config/*` — all business values (demo vs confirmed)
- `src/lib/*` — pure logic (pricing, validation)
- `src/server/*` — server-only integrations (payments)
- `src/components/*` — presentation, grouped by feature
- `src/app/*` — routes and API handlers

## Brand
- Official logo supplied by owner. Processed variants live in `public/brand/` (`logo-horizontal`, `logo-mark`, `logo-full`, `og-image`); favicons are `src/app/icon.png` and `apple-icon.png`.
- Accent color is the logo blue (not teal). Green and red are reserved for market gains and losses.
