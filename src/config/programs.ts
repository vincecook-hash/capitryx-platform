import type { Program } from "@/types/program";
import { NOT_APPLICABLE, TBD, set } from "@/lib/rule-value";
import { formatSizeShort } from "@/lib/utils";

/**
 * SINGLE SOURCE OF TRUTH for programs, pricing and rules.
 *
 * EVERY VALUE BELOW IS A DEMONSTRATION VALUE (dataStatus: "demo").
 * Nothing here is a confirmed Capitryx offering. Items set to TBD are business
 * decisions the owner has not made yet; the UI shows them as "To be confirmed".
 * To go live: edit the tiers/templates below and set dataStatus to "confirmed".
 */

const tiers = [
  { sizeUsd: 5_000, spotPriceUsd: 49, futuresPriceUsd: 59 },
  { sizeUsd: 10_000, spotPriceUsd: 89, futuresPriceUsd: 99 },
  { sizeUsd: 25_000, spotPriceUsd: 199, futuresPriceUsd: 219 },
  { sizeUsd: 50_000, spotPriceUsd: 349, futuresPriceUsd: 379 },
  { sizeUsd: 100_000, spotPriceUsd: 599, futuresPriceUsd: 649 },
] as const;

type Tier = (typeof tiers)[number];

export const demoAccountSizesUsd: number[] = tiers.map((t) => t.sizeUsd);

const SPOT_ASSETS = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "BNB/USDT", "XRP/USDT"];
const FUTURES_ASSETS = ["BTC/USDT Perpetual", "ETH/USDT Perpetual", "SOL/USDT Perpetual"];

function slug(sizeUsd: number): string {
  return formatSizeShort(sizeUsd).toLowerCase();
}

function buildSpot(tier: Tier): Program {
  const label = formatSizeShort(tier.sizeUsd);
  return {
    id: `spot-${slug(tier.sizeUsd)}`,
    name: `Spot Evaluation ${label}`,
    category: "spot",
    accountSizeUsd: tier.sizeUsd,
    priceUsd: tier.spotPriceUsd,
    dataStatus: "demo",
    environment: "tbd",
    billing: set("one_time"),
    assets: SPOT_ASSETS,
    contractTypes: NOT_APPLICABLE,
    phases: [
      { name: "Phase 1", profitTargetPct: set(8), minTradingDays: set(3), timeLimitDays: set(30) },
      { name: "Phase 2", profitTargetPct: set(4), minTradingDays: set(3), timeLimitDays: set(60) },
    ],
    dailyDrawdownPct: set(4),
    maxDrawdownPct: set(8),
    drawdownType: set("static"),
    drawdownBasis: set("equity"),
    maxLeverage: NOT_APPLICABLE,
    positionSizeLimit: set("No single asset above 40% of equity"),
    tradingFees: set("0.10% per fill"),
    fundingCosts: NOT_APPLICABLE,
    liquidationRule: NOT_APPLICABLE,
    holdingRestrictions: set("Overnight and weekend holding allowed"),
    consistencyRule: TBD,
    inactivityRule: set("Account closed after 30 days without a trade"),
    newsRule: TBD,
    profitSharePct: set(80),
    payoutSchedule: TBD,
    scalingPlan: TBD,
    retryDiscountPct: TBD,
    refundPolicy: TBD,
    addOns: [],
  };
}

function buildFutures(tier: Tier): Program {
  const label = formatSizeShort(tier.sizeUsd);
  return {
    id: `futures-${slug(tier.sizeUsd)}`,
    name: `Futures Evaluation ${label}`,
    category: "futures",
    accountSizeUsd: tier.sizeUsd,
    priceUsd: tier.futuresPriceUsd,
    dataStatus: "demo",
    environment: "tbd",
    billing: set("one_time"),
    assets: FUTURES_ASSETS,
    contractTypes: set(["Perpetual"]),
    phases: [
      { name: "Phase 1", profitTargetPct: set(10), minTradingDays: set(4), timeLimitDays: set(30) },
      { name: "Phase 2", profitTargetPct: set(5), minTradingDays: set(4), timeLimitDays: set(60) },
    ],
    dailyDrawdownPct: set(3),
    maxDrawdownPct: set(6),
    drawdownType: set("static"),
    drawdownBasis: set("equity"),
    maxLeverage: set(5),
    positionSizeLimit: set("Total open notional up to 5x account size"),
    tradingFees: set("0.05% per fill"),
    fundingCosts: set("Funding applied every 8 hours at the reference rate"),
    liquidationRule: set("Position closed at its liquidation price; the loss counts toward drawdown"),
    holdingRestrictions: set("Overnight and weekend holding allowed"),
    consistencyRule: TBD,
    inactivityRule: set("Account closed after 30 days without a trade"),
    newsRule: TBD,
    profitSharePct: set(80),
    payoutSchedule: TBD,
    scalingPlan: TBD,
    retryDiscountPct: TBD,
    refundPolicy: TBD,
    addOns: [],
  };
}

export const programs: Program[] = [...tiers.map(buildSpot), ...tiers.map(buildFutures)];
