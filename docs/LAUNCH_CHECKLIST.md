# Launch checklist

Nothing below is optional unless marked. Tick items as they are done.

## 1. Business decisions
- [ ] Answer everything in `docs/BUSINESS_DECISIONS.md` and replace demo values in `src/config/` (then set `dataStatus: "confirmed"`).
- [ ] Decide simulated vs live trading environment and state it consistently.
- [ ] Choose the real coin list, spot-only vs perpetual flags and leverage caps; pin `cmcId` for ambiguous tickers.

## 2. Legal and compliance (needs qualified professionals)
- [ ] Lawyer reviews and completes Terms, Privacy Policy, Refund Policy and Risk Disclosure; fill every `[placeholder]`.
- [ ] Decide eligible countries and verification requirements; check licensing and marketing rules for crypto and derivatives in each.
- [ ] Remove `robots: { index: false }` from `src/app/legal/*/page.tsx` once final.
- [ ] Confirm cookie and consent needs for your markets (the site sets no analytics or advertising cookies today).
- [ ] Add company legal name, address and contact to About, Terms and Privacy.

## 3. Payments and orders (not connected)
- [ ] Choose a payment provider (and decide whether crypto payments are enabled).
- [ ] Implement `PaymentProvider` in `src/server/payments/` (create session, verify webhook signature).
- [ ] Add an order database and implement `OrderStore` in `src/server/orders/`; make the webhook idempotent and write "paid" only after verified confirmation.
- [ ] Set `PAYMENT_*` secrets as server environment variables.
- [ ] Test failure, cancel, pending and duplicate-webhook cases end to end.

## 4. Accounts and messaging
- [ ] Build authentication and protected routes (Login is an honest placeholder).
- [ ] Implement `ContactSink` in `src/server/contact/` (email or helpdesk); the form stays disabled until then.
- [ ] List real support channels on the Contact page.

## 5. Market data
- [ ] Get a CoinMarketCap key, set `COINMARKETCAP_API_KEY`, check plan limits and attribution terms.
- [ ] Verify live data against the real API and watch logs for `[market-data]` errors (the integration was only tested against sample data).
- [ ] Choose a candle data source; the hero chart is illustrative until then.

## 6. Content
- [ ] Add verified customer reviews in `src/lib/testimonials.ts` (section appears automatically). Never add unverified quotes.
- [ ] Add trust indicators only if they can be verified.
- [ ] Re-read every "demonstration" label and remove those that no longer apply.

## 7. Deployment
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain (this switches on indexing, canonical URLs, structured data and the sitemap).
- [ ] Serve over HTTPS; check security headers on the live domain.
- [ ] Replace the in-memory rate limiter (`src/lib/rate-limit.ts`) with a shared store if running more than one server.
- [ ] Add error monitoring, uptime checks and backups for the order database.
- [ ] Run `tests/e2e/lighthouse-check.mjs` and `axe-check.mjs` against the live site. Sandbox Lighthouse numbers were 94 to 100 for performance; the simulated mobile "largest paint" was about 2.8 s on a throttled slow connection (about 1 s unthrottled), so confirm on real hardware.
- [ ] Manual accessibility pass with a screen reader and keyboard only.

## 8. Maintenance
- [ ] `npm audit` reports 0 vulnerabilities in production dependencies. Remaining advisories are in development tools only (vitest, tailwindcss 3, eslint-config-next) and need major upgrades; schedule a dedicated pass.
- [ ] Keep `package.json` `overrides` (patched PostCSS inside Next) until Next ships a fixed dependency.
- [ ] Optional: enable CI by moving `docs/ci-workflow.yml` to `.github/workflows/ci.yml`.
