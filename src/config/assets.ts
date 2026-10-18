/**
 * ASSET CATALOG: every coin Capitryx could offer, in one place.
 *
 * ALL ENTRIES ARE DEMONSTRATION VALUES. Which coins are really tradable, spot-only or
 * perpetual-enabled, and their leverage caps are business decisions for the owner.
 *
 * HOW TO ADD A NEW LISTING: add one line to `assets` below using `asset(...)`.
 *   - Set status "coming_soon" to show it as announced but not yet tradable.
 *   - Set status "listed" when it goes live; "delisted" hides it without deleting history.
 *   - Optional `cmcId` pins the exact CoinMarketCap entry (use it when a ticker is shared by several tokens).
 * Nothing else needs to change: the selector, pair lists and market data pick it up automatically.
 */

export type AssetTier = "major" | "large_cap" | "mid_cap" | "high_volatility";
export type AssetStatus = "listed" | "coming_soon" | "delisted";
export type AssetTag = "meme" | "layer1" | "layer2" | "defi" | "payments" | "infrastructure" | "exchange";

export interface CatalogAsset {
  /** Base ticker; the pair is always quoted in USDT (e.g. BTC/USDT). */
  symbol: string;
  name: string;
  tier: AssetTier;
  tags: AssetTag[];
  status: AssetStatus;
  spot: boolean;
  /** Perpetual futures available. */
  perp: boolean;
  /** Per-asset leverage cap for futures (the lower of this and the program cap applies). */
  maxLeverage: number;
  /** Optional exact CoinMarketCap id to avoid ticker collisions. */
  cmcId?: number;
}

export const TIER_LABELS: Record<AssetTier, string> = {
  major: "Majors",
  large_cap: "Large-cap",
  mid_cap: "Mid-cap",
  high_volatility: "High volatility",
};

export const TIER_ORDER: AssetTier[] = ["major", "large_cap", "mid_cap", "high_volatility"];

/** Demo leverage caps by tier: riskier tiers get lower caps. */
const TIER_LEVERAGE_CAP: Record<AssetTier, number> = { major: 5, large_cap: 5, mid_cap: 3, high_volatility: 2 };

function asset(
  symbol: string,
  name: string,
  tier: AssetTier,
  tags: AssetTag[] = [],
  opts: Partial<Pick<CatalogAsset, "status" | "spot" | "perp" | "maxLeverage" | "cmcId">> = {},
): CatalogAsset {
  return { symbol, name, tier, tags, status: "listed", spot: true, perp: true, maxLeverage: TIER_LEVERAGE_CAP[tier], ...opts };
}

export const assets: CatalogAsset[] = [
  // Majors
  asset("BTC", "Bitcoin", "major"),
  asset("ETH", "Ethereum", "major", ["layer1"]),

  // Large-cap
  asset("BNB", "BNB", "large_cap", ["exchange", "layer1"]),
  asset("XRP", "XRP", "large_cap", ["payments"]),
  asset("SOL", "Solana", "large_cap", ["layer1"]),
  asset("DOGE", "Dogecoin", "large_cap", ["meme"]),
  asset("ADA", "Cardano", "large_cap", ["layer1"]),
  asset("TRX", "TRON", "large_cap", ["layer1"]),
  asset("AVAX", "Avalanche", "large_cap", ["layer1"]),
  asset("LINK", "Chainlink", "large_cap", ["infrastructure"]),
  asset("TON", "Toncoin", "large_cap", ["layer1"]),
  asset("DOT", "Polkadot", "large_cap", ["layer1"]),
  asset("LTC", "Litecoin", "large_cap", ["payments"]),
  asset("BCH", "Bitcoin Cash", "large_cap", ["payments"]),
  asset("XLM", "Stellar", "large_cap", ["payments"]),
  asset("SUI", "Sui", "large_cap", ["layer1"]),
  asset("HBAR", "Hedera", "large_cap", ["layer1"]),
  asset("ATOM", "Cosmos", "large_cap", ["layer1"]),
  asset("NEAR", "NEAR Protocol", "large_cap", ["layer1"]),
  asset("UNI", "Uniswap", "large_cap", ["defi"]),
  asset("AAVE", "Aave", "large_cap", ["defi"]),
  asset("ETC", "Ethereum Classic", "large_cap", ["layer1"]),
  asset("ICP", "Internet Computer", "large_cap", ["infrastructure"]),
  asset("FIL", "Filecoin", "large_cap", ["infrastructure"]),

  // Mid-cap
  asset("APT", "Aptos", "mid_cap", ["layer1"]),
  asset("ARB", "Arbitrum", "mid_cap", ["layer2"]),
  asset("OP", "Optimism", "mid_cap", ["layer2"]),
  asset("INJ", "Injective", "mid_cap", ["defi"]),
  asset("SEI", "Sei", "mid_cap", ["layer1"]),
  asset("TIA", "Celestia", "mid_cap", ["infrastructure"]),
  asset("RUNE", "THORChain", "mid_cap", ["defi"]),
  asset("ALGO", "Algorand", "mid_cap", ["layer1"]),
  asset("GRT", "The Graph", "mid_cap", ["infrastructure"]),
  asset("LDO", "Lido DAO", "mid_cap", ["defi"]),
  asset("STX", "Stacks", "mid_cap", ["layer2"]),

  // High volatility: meme and other small-cap coins. Thinner liquidity, sharper moves.
  asset("SHIB", "Shiba Inu", "high_volatility", ["meme"]),
  asset("PEPE", "Pepe", "high_volatility", ["meme"]),
  asset("WIF", "dogwifhat", "high_volatility", ["meme"]),
  asset("BONK", "Bonk", "high_volatility", ["meme"]),
  asset("FLOKI", "Floki", "high_volatility", ["meme"]),
  asset("BRETT", "Brett", "high_volatility", ["meme"]),
  asset("POPCAT", "Popcat", "high_volatility", ["meme"]),
  asset("BOME", "BOOK OF MEME", "high_volatility", ["meme"]),
  asset("TURBO", "Turbo", "high_volatility", ["meme"]),
  asset("NEIRO", "Neiro", "high_volatility", ["meme"]),
  asset("PNUT", "Peanut the Squirrel", "high_volatility", ["meme"]),
  asset("MEME", "Memecoin", "high_volatility", ["meme"]),
  // Spot-only examples (no perpetual contract offered)
  asset("MEW", "cat in a dogs world", "high_volatility", ["meme"], { perp: false }),
  asset("DOGS", "Dogs", "high_volatility", ["meme"], { perp: false }),
];
