# Roadmap / owner requests

## Asset catalog (requested by owner, build with configurator + rules)
- Offer a **large list of trading pairs**, including **meme / low-cap coins**, not just majors.
- **Room for new listings**: pairs live in one config file (`src/config/assets.ts`, to be created) with tiers
  (major / large-cap / mid-cap / high-volatility), so adding a coin is one entry and no UI change.
- High-volatility assets should be able to carry their own limits (max leverage, per-asset position cap).
- Risk copy must say these assets can move sharply and have thinner liquidity. No claims about returns.
- Owner decides the actual list; every entry stays `demo` until confirmed.
