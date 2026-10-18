import { getListedAssets } from "@/lib/assets";
import type { MarketSnapshot } from "@/types/market";
import { createCoinMarketCapProvider } from "./coinmarketcap";
import { buildDemoSnapshot } from "./demo";

const DEFAULT_REVALIDATE_SECONDS = 300;

/**
 * Single entry point for market data. Server-only: never import this file into a client component.
 * - With COINMARKETCAP_API_KEY set: live quotes for every listed asset (cached on the server, so
 *   visitor traffic does not multiply API calls).
 * - Without a key, or if the provider fails: clearly labeled illustrative data. Never presented as live.
 */
export async function getMarketSnapshot(): Promise<MarketSnapshot> {
  const apiKey = process.env.COINMARKETCAP_API_KEY;
  if (!apiKey) return buildDemoSnapshot();

  const seconds = Number(process.env.MARKET_DATA_REVALIDATE_SECONDS);
  const revalidateSeconds = Number.isFinite(seconds) && seconds >= 60 ? seconds : DEFAULT_REVALIDATE_SECONDS;

  try {
    const quotes = await createCoinMarketCapProvider(apiKey, { revalidateSeconds }).fetchQuotes(getListedAssets());
    if (Object.keys(quotes).length === 0) throw new Error("CoinMarketCap returned no usable quotes");
    return { mode: "live", source: "CoinMarketCap", updatedAt: new Date().toISOString(), quotes };
  } catch (err) {
    console.error("[market-data]", err instanceof Error ? err.message : "unknown error");
    return buildDemoSnapshot("Live market data is temporarily unavailable. Showing illustrative figures.");
  }
}
