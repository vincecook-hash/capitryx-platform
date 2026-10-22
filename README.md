# Capitryx

**Capital Meets Capability.** A crypto spot and futures trader-evaluation website: program selector, trading rules with worked
examples, dashboard preview, checkout architecture and draft legal pages.

> **Status: pre-launch.** All programs, prices, rules and market figures are **demonstration values** until the owner confirms
> real terms. Payments, accounts and message delivery are intentionally *not* connected (they fail closed). See
> [`docs/LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md).

## Run it locally

Requires Node.js 20.9 or newer (`nvm use` picks 22 from `.nvmrc`).

```bash
npm install
npm run dev -- -H 127.0.0.1      # http://127.0.0.1:3000
```

Production build:

```bash
npm run build
npx next start -p 3000 -H 127.0.0.1
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run check` | Typecheck + lint + unit tests |
| `npm run typecheck`, `npm run lint`, `npm test` | The three checks on their own |

## Environment variables

Copy `.env.example` to `.env.local`. **Never commit real secrets**; none belong in frontend code.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your production domain, e.g. `https://www.example.com`. **Until set, the site tells search engines not to index it.** When set it enables canonical URLs, structured data, a real robots.txt and sitemap. |
| `COINMARKETCAP_API_KEY` | Live market data (server-side only). Without it the site shows clearly labeled illustrative figures. |
| `MARKET_DATA_REVALIDATE_SECONDS` | Market data cache time (60 or more, default 300). |
| `PAYMENT_PROVIDER`, `PAYMENT_API_KEY`, `PAYMENT_WEBHOOK_SECRET` | Reserved for the payment integration. |
| `ENABLE_CRYPTO_PAYMENTS` | Owner opt-in for crypto payments (default `false`). |
| `SHOW_SAMPLE_TESTIMONIALS` | Development only: show labeled sample reviews. Ignored in production. |

## Pages and routes

| Route | Page |
|---|---|
| `/` | Home: hero, markets, why Capitryx, how it works, spot vs futures, transparency, FAQ |
| `/programs` | Program selector (spot or futures, size, rules, pairs, order summary). Deep links: `?category=futures&size=50000` |
| `/spot-trading`, `/futures-trading` | Category landing pages |
| `/how-it-works`, `/faq`, `/about`, `/contact`, `/login` | Information pages (contact and login are honest placeholders) |
| `/trading-rules` | Per-category rules, how violations are calculated, worked examples, drawdown calculator |
| `/checkout`, `/checkout/success`, `/checkout/pending`, `/checkout/cancelled` | Checkout and payment states |
| `/legal/terms`, `/legal/privacy`, `/legal/refund-policy`, `/legal/risk-disclosure` | **Drafts**, not reviewed by a lawyer |
| `POST /api/checkout`, `POST /api/contact`, `GET /api/market`, `POST /api/webhooks/payments` | API (checkout, contact and webhook return 503 until configured) |

## Where to change the business terms

Everything business-specific lives in `src/config/`. Replace the demo values and set `dataStatus` to `"confirmed"`; no component changes needed.

| File | Contents |
|---|---|
| `programs.ts` | Program sizes, prices, phases, drawdown, leverage, fees, rewards |
| `assets.ts` | The coin catalog (49 coins in 4 risk tiers). Add a coin with one line; use `coming_soon` to announce it first |
| `trading-rules.ts` | Conduct and policy rules (undecided ones are `TBD`) |
| `faq.ts`, `features.ts`, `category-pages.ts` | Page content; numbers are read from the files above |
| `site.ts`, `announcement.ts`, `legal.ts`, `payments.ts` | Site info, announcement bar (off), legal drafts, payment flags |

Rule values can be `set`, `not_applicable` or `tbd`. A `tbd` shows as "To be confirmed" everywhere, so nothing is invented.

## Project structure

```
src/app/            routes and API handlers
src/components/     ui, layout, sections, configurator, rules, dashboard, charts, market, checkout, legal
src/config/         business configuration (see above)
src/lib/            pure logic: pricing, drawdown, rules, comparison, SEO, validation (all unit tested)
src/server/         server-only integrations: market-data, payments, orders, contact
src/styles/         design tokens (colors, type, shadows, motion)
tests/unit/         unit tests (npm test)
tests/e2e/          browser and raw-HTML checks (see tests/e2e/README.md)
docs/               business decisions, launch checklist, architecture, roadmap, research
```

## Quality checks

`npm run check` runs 114 unit tests (pricing, drawdown maths, rules, config integrity, API routes, SEO, FAQ honesty, legal drafts,
payment-state safety), TypeScript in strict mode and ESLint. `tests/e2e/` adds raw-HTML ordering, no-sideways-scroll at 8
widths, a WCAG 2.2 AA audit (axe), a Content-Security-Policy check and Lighthouse. Last full run: see the project report.

## Security notes

- Prices are computed on the server from config; the checkout API never reads a client-sent price.
- An order can only be shown as paid when the server holds a verified "paid" record. No payment provider or order store is connected, so nothing can be shown as paid today.
- API keys are server-side only. Inputs are validated with Zod, and API routes are rate-limited (in-memory; replace with a shared store such as Redis for multiple servers).
- Production responses send a Content-Security-Policy, HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` and `Permissions-Policy`.

## Not built yet

Real payments, trader accounts and sign-in, an order database, message delivery for the contact form, live candlestick data, and
the lawyer-reviewed legal text. Each has a clear integration point; see the launch checklist.
