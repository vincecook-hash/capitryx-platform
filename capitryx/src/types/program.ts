export type TradingCategory = "spot" | "futures";
export type DataStatus = "demo" | "confirmed";
export type DrawdownType = "static" | "trailing";
export type DrawdownBasis = "balance" | "equity";
export type ExecutionEnvironment = "simulated" | "live" | "tbd";

/** A rule value that may not apply or may be undecided by the business owner. */
export type RuleValue<T> = { status: "set"; value: T } | { status: "not_applicable" } | { status: "tbd" };

export interface EvaluationPhase {
  name: string;
  profitTargetPct: RuleValue<number>;
  minTradingDays: RuleValue<number>;
  timeLimitDays: RuleValue<number>;
}

export interface Program {
  id: string;
  name: string;
  category: TradingCategory;
  accountSizeUsd: number;
  priceUsd: number; // server is the source of truth at checkout
  dataStatus: DataStatus; // "demo" until owner confirms
  environment: ExecutionEnvironment;
  assets: string[]; // e.g. "BTC/USDT"
  phases: EvaluationPhase[];
  dailyDrawdownPct: RuleValue<number>;
  maxDrawdownPct: RuleValue<number>;
  drawdownType: RuleValue<DrawdownType>;
  drawdownBasis: RuleValue<DrawdownBasis>;
  maxLeverage: RuleValue<number>; // N/A for spot
  positionSizeLimit: RuleValue<string>;
  tradingFees: RuleValue<string>;
  fundingCosts: RuleValue<string>; // perpetuals only
  holdingRestrictions: RuleValue<string>;
  profitSharePct: RuleValue<number>;
  payoutSchedule: RuleValue<string>;
  refundPolicy: RuleValue<string>;
}
