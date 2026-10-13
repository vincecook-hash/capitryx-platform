# Reference Research: Pivex Funded selling page

Researched: 2026-10-13. **Nothing here is copied; Capitryx will be original in code, copy, and design.**

## Access limits
- The reference URL is rendered client-side. Fetching it returned only a loading screen, so its layout, copy, and checkout steps could **not** be inspected directly.
- Findings below come from third-party review/aggregator sites. They **disagree with each other** in places (flagged below). Treat all of it as unverified market context, not as fact about the reference firm.

## What the product appears to be
- One-step evaluation on simulated capital, Match Trader platform.
- Markets: Forex, indices, commodities. One source also lists crypto and stocks (conflict).
- Account sizes reported: $5K to $200K (another source: $10K to $200K).
- Two purchase models: one-time fee, or monthly subscription that rebills and grants a new attempt each cycle until pass or cancel.

## Rule patterns reported
| Area | Reported pattern |
|---|---|
| Profit target | 10% |
| Daily loss | 4%, static |
| Max drawdown | 6%, static |
| Minimum days | 5 trading days |
| Time limit | None |
| Consistency | No single day above 50% of total profit (blocks rewards, not a fail) |
| Position size | Combined margin per instrument group capped at 70% of balance |
| Inactivity | 30 days without a trade deactivates account |
| News | Allowed in evaluation; restricted on funded stage (5 min window) |
| Hedging | Cross-account hedging prohibited |
| Rewards | 80% split, 90% with add-on; payouts every 14 days (one source) |
| Scaling | +30% each quarter after hitting 15% |
| Refund | Fee returned with third payout (one-time plan) |
| Retry | Discounted retry if target missed but rules followed |

## Conflicts and unknowns
- **Prices differ between sources** (e.g. monthly figures vs one-time figures that do not line up). No price is usable.
- Trust signals conflict: one source reports a 2.6 rating from 4 reviews, another 4.1. The site shows a Trustpilot badge with no score or link.
- Funded-stage drawdown rules not published in the sources found.

## Conversion patterns worth learning from (concepts only)
1. Single account-size selector driving price and rules.
2. Clear choice between one-time and subscription billing.
3. Refund and retry options stated near price.
4. Optional add-ons (profit split boost).
5. Visible scaling roadmap and dashboard preview.
6. Email campaign entry: URL parameters (`source`, `campaign`, `email_id`) suggest tracked email-to-selling-page funnel.

## Implications for Capitryx
- Differentiate on **crypto-native spot and futures**, separate rules per category.
- Do not copy rule values. Use labeled demo values; owner decides real terms.
- Do not use unverified trust claims (ratings, payout totals, "funded" promises).
- Add to the program model: billing model (one-time / subscription), consistency rule, inactivity rule, add-ons, scaling plan, retry discount, news rule, refund conditions.
- Support campaign parameters (UTM-style) on the selling flow for the owner's email marketing.
