# Architecture
- `src/config/*` — all business values (demo vs confirmed)
- `src/lib/*` — pure logic (pricing, validation)
- `src/server/*` — server-only integrations (payments)
- `src/components/*` — presentation, grouped by feature
- `src/app/*` — routes and API handlers

## Brand
- Official logo supplied by owner. Processed variants live in `public/brand/` (`logo-horizontal`, `logo-mark`, `logo-full`, `og-image`); favicons are `src/app/icon.png` and `apple-icon.png`.
- Accent color is the logo blue (not teal). Green and red are reserved for market gains and losses.

## Market data and assets
- `src/config/assets.ts` is the coin catalog (what can be traded). `src/lib/assets.ts` has the helpers.
- `src/server/market-data/` is server-only: `coinmarketcap.ts` (provider), `demo.ts` (labeled fallback), `index.ts` (picks one; never labels demo data as live).
- `/api/market` serves the snapshot; `useMarketSnapshot` keeps pages fresh. Program pair lists are derived from the catalog.
- Selection state for `/programs` lives in the URL (`?category=futures&size=25000`) and is validated by `src/lib/selection.ts`.

## Quality checks (run with the site running)
- `tests/e2e/overflow-check.mjs`: no sideways scrolling at 8 screen widths (needs `puppeteer-core` and `@sparticuz/chromium`, installed with `--no-save`).
- `tests/e2e/html-order-check.mjs`: raw HTML is complete and ordered (no browser needed). Do not add a root `loading.tsx`: it makes pages stream content after the footer.
