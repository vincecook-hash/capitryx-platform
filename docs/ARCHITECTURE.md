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

## Quality checks
See `tests/e2e/README.md`. Do not add a root `loading.tsx`: it makes pages stream their content after the footer (caught by `html-order-check.mjs`).

## Performance and SEO decisions
- Fonts are self-hosted through `next/font/local` (preloaded, size-matched fallback). CSS is inlined (`experimental.inlineCss`).
- `htmlLimitedBots: /.*/` makes Next send title and description in `<head>` on dynamic pages (otherwise they are streamed after load).
- Without `NEXT_PUBLIC_SITE_URL` the site is `noindex` and robots.txt disallows everything.
- Production security headers (CSP, HSTS, COOP) are set in `next.config.mjs`. The CSP allows inline scripts and styles because Next's bootstrap needs them; a nonce-based policy would force dynamic rendering.
