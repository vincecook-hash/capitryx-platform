export type TradingCategory = "spot" | "futures";
export type DataStatus = "demo" | "confirmed";
export type DrawdownType = "static" | "trailing";
export type DrawdownBasis = "balance" | "equity";
export type ExecutionEnvironment = "simulated" | "live" | "tbd";
export type BillingModel = "one_time" | "subscription";

/** A rule that is set, does not apply to this program, or is still undecided by the owner. */
export type RuleValue<T> =
  | { status: "set"; value: T }
  | { status: "not_applicable" }
  | { status: "tbd" };

export interface EvaluationPhase {
  name: string;
  profitTargetPct: RuleValue<number>;
  minTradingDays: RuleValue<number>;
  timeLimitDays: RuleValue<number>;
}

export interface ProgramAddOn {
  id: string;
  name: string;
  description: string;
  priceUsd: number;
}

export interface Program {
  id: string;
  name: string;
  category: TradingCategory;
  /** Evaluation (notional) size. NOT money deposited into the customer's account. */
  accountSizeUsd: number;
  /** Display price. The server recomputes it from this config at checkout. */
  priceUsd: number;
  /** "demo" until the owner confirms real terms. */
  dataStatus: DataStatus;
  environment: ExecutionEnvironment;
  billing: RuleValue<BillingModel>;
  assets: string[];
  contractTypes: RuleValue<string[]>;
  phases: EvaluationPhase[];
  dailyDrawdownPct: RuleValue<number>;
  maxDrawdownPct: RuleValue<number>;
  drawdownType: RuleValue<DrawdownType>;
  drawdownBasis: RuleValue<DrawdownBasis>;
  maxLeverage: RuleValue<number>;
  positionSizeLimit: RuleValue<string>;
  tradingFees: RuleValue<string>;
  fundingCosts: RuleValue<string>;
  liquidationRule: RuleValue<string>;
  holdingRestrictions: RuleValue<string>;
  consistencyRule: RuleValue<string>;
  inactivityRule: RuleValue<string>;
  newsRule: RuleValue<string>;
  profitSharePct: RuleValue<number>;
  payoutSchedule: RuleValue<string>;
  scalingPlan: RuleValue<string>;
  retryDiscountPct: RuleValue<number>;
  refundPolicy: RuleValue<string>;
  addOns: ProgramAddOn[];
}
