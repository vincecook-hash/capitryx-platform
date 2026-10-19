import { TIER_LABELS, type AssetTier } from "@/config/assets";
import { getListedAssets, groupByTier } from "@/lib/assets";
import { getProgram, getProgramsByCategory } from "@/lib/pricing";
import type { TradingCategory } from "@/types/program";

export interface TierSummary {
  tier: AssetTier;
  label: string;
  count: number;
  examples: string[];
}

export interface CategorySummary {
  category: TradingCategory;
  referenceProgramName: string;
  sizeMinUsd: number;
  sizeMaxUsd: number;
  priceMinUsd: number;
  priceMaxUsd: number;
  phaseCount: number;
  phase1TargetPct: number | null;
  dailyPct: number | null;
  maxPct: number | null;
  fees: string | null;
  maxLeverage: number | null;
  funding: string | null;
  pairCount: number;
  tiers: TierSummary[];
}

/** Everything a category landing page states as a number, read from config so it can never drift. */
export function summarizeCategory(category: TradingCategory): CategorySummary {
  const programs = getProgramsByCategory(category);
  const ref = getProgram(`${category}-25k`);
  const first = programs[0];
  const last = programs[programs.length - 1];
  if (!ref || !first || !last) throw new Error(`No programs configured for ${category}`);

  const val = <T,>(r: { status: string; value?: T }): T | null => (r.status === "set" ? (r.value as T) : null);
  const target = ref.phases[0]?.profitTargetPct;

  return {
    category,
    referenceProgramName: ref.name,
    sizeMinUsd: first.accountSizeUsd,
    sizeMaxUsd: last.accountSizeUsd,
    priceMinUsd: Math.min(...programs.map((p) => p.priceUsd)),
    priceMaxUsd: Math.max(...programs.map((p) => p.priceUsd)),
    phaseCount: ref.phases.length,
    phase1TargetPct: target ? val<number>(target) : null,
    dailyPct: val<number>(ref.dailyDrawdownPct),
    maxPct: val<number>(ref.maxDrawdownPct),
    fees: val<string>(ref.tradingFees),
    maxLeverage: val<number>(ref.maxLeverage),
    funding: val<string>(ref.fundingCosts),
    pairCount: getListedAssets(category).length,
    tiers: groupByTier(getListedAssets(category)).map((g) => ({
      tier: g.tier,
      label: TIER_LABELS[g.tier],
      count: g.assets.length,
      examples: g.assets.slice(0, 4).map((a) => a.symbol),
    })),
  };
}
