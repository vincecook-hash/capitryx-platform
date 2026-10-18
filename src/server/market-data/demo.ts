import { demoMarkets } from "@/lib/demo-market";
import type { AssetQuote, MarketSnapshot } from "@/types/market";

/**
 * ILLUSTRATIVE quotes for a handful of flagship assets, used when no market data key is configured
 * or the provider is unreachable. Round placeholder numbers, clearly labeled in the UI. Other coins show "—".
 * BTC and ETH match the hero chart's demo series so the page is internally consistent.
 */
const btc = demoMarkets.find((m) => m.id === "btc");
const eth = demoMarkets.find((m) => m.id === "eth");

const rows: Array<{ symbol: string; name: string; price: number; change: number; mcap: number }> = [
  { symbol: "BTC", name: "Bitcoin", price: btc?.last ?? 64_000, change: btc?.changePct ?? 1.5, mcap: 1.28e12 },
  { symbol: "ETH", name: "Ethereum", price: eth?.last ?? 3_100, change: eth?.changePct ?? -0.7, mcap: 3.8e11 },
  { symbol: "BNB", name: "BNB", price: 590, change: 0.8, mcap: 8.6e10 },
  { symbol: "SOL", name: "Solana", price: 150, change: 2.1, mcap: 7.0e10 },
  { symbol: "XRP", name: "XRP", price: 0.52, change: -0.4, mcap: 3.0e10 },
  { symbol: "DOGE", name: "Dogecoin", price: 0.15, change: 3.2, mcap: 2.2e10 },
  { symbol: "ADA", name: "Cardano", price: 0.45, change: -1.1, mcap: 1.6e10 },
  { symbol: "AVAX", name: "Avalanche", price: 35, change: 1.3, mcap: 1.4e10 },
];

export function buildDemoSnapshot(notice?: string): MarketSnapshot {
  const ranked = [...rows].sort((a, b) => b.mcap - a.mcap);
  const quotes: Record<string, AssetQuote> = {};
  ranked.forEach((r, i) => {
    quotes[r.symbol] = { symbol: r.symbol, name: r.name, rank: i + 1, priceUsd: r.price, change24hPct: r.change, marketCapUsd: r.mcap };
  });
  return { mode: "illustrative", source: "Illustrative", updatedAt: new Date().toISOString(), quotes, ...(notice ? { notice } : {}) };
}
