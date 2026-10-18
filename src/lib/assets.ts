import { assets, TIER_ORDER, type AssetTier, type CatalogAsset } from "@/config/assets";
import type { Program, TradingCategory } from "@/types/program";

/** Assets that are live for a category (spot or futures). Omit the category for all listed assets. */
export function getListedAssets(category?: TradingCategory): CatalogAsset[] {
  return assets.filter((a) => a.status === "listed" && (category === undefined || (category === "spot" ? a.spot : a.perp)));
}

export function getComingSoonAssets(): CatalogAsset[] {
  return assets.filter((a) => a.status === "coming_soon");
}

export function pairLabel(a: CatalogAsset, category: TradingCategory): string {
  return category === "spot" ? `${a.symbol}/USDT` : `${a.symbol}/USDT Perpetual`;
}

/** Futures leverage that actually applies to this asset in this program (the lower cap wins). */
export function effectiveMaxLeverage(a: CatalogAsset, program: Program): number | null {
  if (program.maxLeverage.status !== "set") return null;
  return Math.min(program.maxLeverage.value, a.maxLeverage);
}

export function groupByTier(list: CatalogAsset[]): Array<{ tier: AssetTier; assets: CatalogAsset[] }> {
  return TIER_ORDER.map((tier) => ({ tier, assets: list.filter((a) => a.tier === tier) })).filter((g) => g.assets.length > 0);
}
