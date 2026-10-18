import { z } from "zod";
import type { CatalogAsset } from "@/config/assets";
import type { AssetQuote } from "@/types/market";
import type { MarketDataProvider } from "./provider";

const CMC_BASE = "https://pro-api.coinmarketcap.com";

const entrySchema = z.object({
  id: z.number(),
  name: z.string(),
  symbol: z.string(),
  cmc_rank: z.number().nullable().optional(),
  quote: z.object({
    USD: z.object({
      price: z.number().nullable(),
      percent_change_24h: z.number().nullable().optional(),
      market_cap: z.number().nullable().optional(),
    }),
  }),
});
type CmcEntry = z.infer<typeof entrySchema>;

/** Rank used only to choose between tokens that share a ticker: lower is better, unranked last. */
const rankKey = (e: CmcEntry) => e.cmc_rank ?? Number.MAX_SAFE_INTEGER;

/**
 * Maps a CoinMarketCap quotes response to our quotes. Written against CMC's documented
 * `/v2/cryptocurrency/quotes/latest` shape (symbol -> array of entries; the older v1 shape of a single
 * object is also accepted). Invalid entries are skipped instead of crashing the page.
 */
export function parseCmcQuotes(json: unknown, catalog: CatalogAsset[]): Record<string, AssetQuote> {
  const data = (json as { data?: Record<string, unknown> } | null)?.data;
  const out: Record<string, AssetQuote> = {};
  if (!data || typeof data !== "object") return out;

  for (const asset of catalog) {
    const raw = data[asset.symbol];
    const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const valid = list.flatMap((item) => {
      const parsed = entrySchema.safeParse(item);
      return parsed.success && parsed.data.quote.USD.price !== null ? [parsed.data] : [];
    });
    const chosen =
      asset.cmcId !== undefined ? valid.find((e) => e.id === asset.cmcId) : [...valid].sort((a, b) => rankKey(a) - rankKey(b))[0];
    if (!chosen) continue;
    const usd = chosen.quote.USD;
    out[asset.symbol] = {
      symbol: asset.symbol,
      name: asset.name,
      rank: chosen.cmc_rank ?? null,
      priceUsd: usd.price as number,
      change24hPct: usd.percent_change_24h ?? null,
      marketCapUsd: usd.market_cap ?? null,
    };
  }
  return out;
}

export function createCoinMarketCapProvider(
  apiKey: string,
  options: { revalidateSeconds?: number; fetchImpl?: typeof fetch } = {},
): MarketDataProvider {
  const { revalidateSeconds = 300, fetchImpl = fetch } = options;
  return {
    async fetchQuotes(catalog) {
      const symbols = [...new Set(catalog.map((a) => a.symbol))];
      const url = `${CMC_BASE}/v2/cryptocurrency/quotes/latest?symbol=${symbols.join(",")}&convert=USD&skip_invalid=true`;
      // The key travels only in a server-side header. It is never logged or put in an error message.
      const res = await fetchImpl(url, {
        headers: { "X-CMC_PRO_API_KEY": apiKey, Accept: "application/json" },
        next: { revalidate: revalidateSeconds },
      });
      if (!res.ok) throw new Error(`CoinMarketCap request failed with status ${res.status}`);
      return parseCmcQuotes(await res.json(), catalog);
    },
  };
}
