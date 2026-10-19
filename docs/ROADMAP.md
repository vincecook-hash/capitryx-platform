# Roadmap / owner requests

## Done
- Asset catalog with 49 coins in 4 risk tiers (majors, large-cap, mid-cap, high volatility incl. meme coins), spot-only vs perpetual flags, per-coin leverage caps, and status flags for new listings (`src/config/assets.ts`).
- Market data service: CoinMarketCap provider, server-side cache, labeled illustrative fallback, auto-refresh in the browser.
- Program selector (`/programs`) with category tabs, size picker, grouped rules, pair list, order summary, and checkout hand-off.

- Home page complete: hero, market table, Why Capitryx (Preview/Planned labels), How It Works (4 steps), evaluation model, Spot vs Futures comparison (numbers from config), Trust/transparency, Testimonials (hidden until verified reviews exist), FAQ (20 questions) and final CTA. `/faq` and `/how-it-works` pages.

- Trading Rules page (`/trading-rules`): separate spot and futures rules, conduct and policy rules (undecided ones marked TBC with what they will cover), how every limit is calculated, worked examples (static vs trailing, equity vs balance) and an interactive drawdown calculator.

## Next
- Spot Trading / Futures Trading landing pages (link into `/programs?category=...`).
- Full dashboard preview section with spot/futures switcher and recent activity.
- Authentication (Login), Contact form, draft legal documents.
- Live candlestick charts need a separate chart data source (CoinMarketCap OHLCV history is a paid feature); the hero chart is illustrative until then.

## Adding a new coin
Add one `asset(...)` line in `src/config/assets.ts` (see the comment at the top of that file). Use status `coming_soon` to announce it first.
