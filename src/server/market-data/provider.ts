import type { CatalogAsset } from "@/config/assets";
import type { AssetQuote } from "@/types/market";

export interface MarketDataProvider {
  fetchQuotes(assets: CatalogAsset[]): Promise<Record<string, AssetQuote>>;
}
