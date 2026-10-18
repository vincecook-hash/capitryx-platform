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
