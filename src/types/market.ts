export interface AssetQuote {
  symbol: string;
  name: string;
  /** Market-cap rank (CoinMarketCap rank when live). */
  rank: number | null;
  priceUsd: number;
  change24hPct: number | null;
  marketCapUsd: number | null;
}

export interface MarketSnapshot {
  /** "live" only when real provider data was fetched successfully. */
  mode: "live" | "illustrative";
  source: "CoinMarketCap" | "Illustrative";
  /** ISO timestamp of when this snapshot was produced. */
  updatedAt: string;
  /** Quotes keyed by base symbol (e.g. "BTC"). Assets without a quote are simply absent. */
  quotes: Record<string, AssetQuote>;
  /** Shown to the user when live data was expected but unavailable. */
  notice?: string;
}
