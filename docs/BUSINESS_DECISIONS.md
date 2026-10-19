# Business decisions needed from owner
- [ ] Real program names, sizes, prices (config/programs.ts)
- [ ] Simulated vs live environment per program
- [ ] Drawdown rules (static/trailing, balance/equity), leverage, fees, funding
- [ ] Profit split, payout schedule, refund policy
- [ ] Payment provider; whether crypto payments are enabled
- [ ] Eligible countries, KYC requirements
- [ ] Legal documents (currently drafts) and compliance review

## Market data (CoinMarketCap)
- [ ] Create a CoinMarketCap API key and set `COINMARKETCAP_API_KEY` (server-side only, never in frontend code).
- [ ] Check your plan's monthly call/credit limit. The site caches responses for `MARKET_DATA_REVALIDATE_SECONDS` (default 300) so traffic does not multiply calls.
- [ ] Confirm CoinMarketCap's terms for displaying their data (attribution, redistribution). The site shows "Market data provided by CoinMarketCap" when live.
- [ ] First live test: the integration was built from CoinMarketCap's documented response format and tested against sample data only. Verify with a real key and watch the server log for `[market-data]` errors.
- [ ] Decide which coins to list, which are spot-only vs perpetual, and each coin's leverage cap (currently demo values).
- [ ] Pin `cmcId` on any coin whose ticker is shared by several tokens (especially meme coins) so the right one is quoted.
- [ ] Chart candle data: choose a source (the hero chart is illustrative).

## Content needing owner input (FAQ marks these "Pending owner review")
- [ ] What exactly a purchase includes (access period, platform access)
- [ ] Simulated vs live trading environment
- [ ] What happens on a fail (retry terms) and after a pass (verification steps, reward stage)
- [ ] Reward share, payout schedule and conditions
- [ ] Fees and funding costs (demo values: 0.10% spot, 0.05% futures, funding every 8h)
- [ ] One-time vs subscription billing
- [ ] Refund policy, payment methods, support channels, identity verification, eligible countries
- [ ] Verified customer reviews: add to `src/lib/testimonials.ts` (section appears automatically). Never add unverified quotes.
- [ ] Any verified trust indicators (only add what can be checked)

## Trading rules decisions (shown as "To be confirmed" on /trading-rules)
- [ ] Margin mode for futures: isolated or cross
- [ ] News-event restrictions
- [ ] Automated trading / bots, and API trading permissions
- [ ] Restricted strategies (each needs a clear definition)
- [ ] Reward eligibility and how rewards are paid
- [ ] What a breach leads to (fail, retry terms)
- [ ] When a trading day starts (time zone and cut-off), what counts as a trading day
- [ ] Whether open (unrealized) profit counts toward the profit target
- [ ] Review the DRAFT wording for market manipulation, prohibited conduct and program progression with legal advice
- [ ] Confirm the drawdown method shown (percent of starting size, equity-based, static) or change it in `src/config/programs.ts`
