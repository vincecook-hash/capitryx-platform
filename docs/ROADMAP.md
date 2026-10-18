# Roadmap / owner requests

## Done
- Asset catalog with 49 coins in 4 risk tiers (majors, large-cap, mid-cap, high volatility incl. meme coins), spot-only vs perpetual flags, per-coin leverage caps, and status flags for new listings (`src/config/assets.ts`).
- Market data service: CoinMarketCap provider, server-side cache, labeled illustrative fallback, auto-refresh in the browser.
- Program selector (`/programs`) with category tabs, size picker, grouped rules, pair list, order summary, and checkout hand-off.

## Next
- Remaining home sections: Why Capitryx, Spot vs Futures comparison, Trading Rules page content, Trust/transparency, FAQ accordion, final CTA.
- Spot Trading / Futures Trading landing pages (link into `/programs?category=...`).
- Full dashboard preview section with spot/futures switcher and recent activity.
- Authentication (Login), Contact form, draft legal documents.
- Live candlestick charts need a separate chart data source (CoinMarketCap OHLCV history is a paid feature); the hero chart is illustrative until then.

## Adding a new coin
Add one `asset(...)` line in `src/config/assets.ts` (see the comment at the top of that file). Use status `coming_soon` to announce it first.
