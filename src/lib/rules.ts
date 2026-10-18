import type { Program } from "@/types/program";
import { formatRule } from "@/lib/rule-value";

export type RuleGroup = "program" | "risk" | "trading" | "rewards";

export const RULE_GROUP_LABELS: Record<RuleGroup, string> = {
  program: "Evaluation structure",
  risk: "Risk limits",
  trading: "Trading conditions",
  rewards: "Rewards and policies",
};
export const RULE_GROUP_ORDER: RuleGroup[] = ["program", "risk", "trading", "rewards"];

export interface RuleRow {
  id: string;
  group: RuleGroup;
  label: string;
  value: string;
  status: "set" | "not_applicable" | "tbd";
}

const pct = (v: number) => `${v}%`;
const days = (v: number) => `${v} days`;

const GROUPS: Record<string, RuleGroup> = {
  daily: "risk", max: "risk", ddType: "risk", ddBasis: "risk", leverage: "risk", position: "risk", liquidation: "risk",
  fees: "trading", funding: "trading", holding: "trading", consistency: "trading", inactivity: "trading", news: "trading",
  split: "rewards", payout: "rewards", scaling: "rewards", retry: "rewards", refund: "rewards",
};
const groupOf = (id: string): RuleGroup => GROUPS[id] ?? "program";

/** Flat, display-ready rule list for a program (used by the rules panel and tables). */
export function getRuleRows(p: Program): RuleRow[] {
  const rows: RuleRow[] = [];
  const add = <T,>(id: string, label: string, rule: Parameters<typeof formatRule<T>>[0], fmt?: (v: T) => string) =>
    rows.push({ id, group: groupOf(id), label, value: formatRule(rule, fmt), status: rule.status });

  rows.push({
    id: "environment",
    group: "program",
    label: "Trading environment",
    value: p.environment === "simulated" ? "Simulated" : p.environment === "live" ? "Live" : "To be confirmed",
    status: p.environment === "tbd" ? "tbd" : "set",
  });
  add("billing", "Billing", p.billing, (v) => (v === "one_time" ? "One-time fee" : "Subscription"));
  rows.push({ id: "assets", group: "program", label: "Supported pairs", value: `${p.assets.length} listed pairs (full list below)`, status: "set" });
  add("contractTypes", "Contract types", p.contractTypes, (v) => v.join(", "));

  p.phases.forEach((ph, i) => {
    add(`phase${i}-target`, `${ph.name} profit target`, ph.profitTargetPct, pct);
    add(`phase${i}-days`, `${ph.name} minimum trading days`, ph.minTradingDays, days);
    add(`phase${i}-limit`, `${ph.name} time limit`, ph.timeLimitDays, days);
  });

  add("daily", "Daily drawdown limit", p.dailyDrawdownPct, pct);
  add("max", "Maximum drawdown", p.maxDrawdownPct, pct);
  add("ddType", "Drawdown type", p.drawdownType, (v) =>
    v === "static" ? "Static (fixed from starting balance)" : "Trailing (follows highest value reached)",
  );
  add("ddBasis", "Drawdown basis", p.drawdownBasis, (v) => (v === "equity" ? "Equity-based" : "Balance-based"));
  add("leverage", "Maximum leverage", p.maxLeverage, (v) => `${v}x (lower on higher-risk coins)`);
  add("position", "Position sizing", p.positionSizeLimit);
  add("fees", "Trading fees", p.tradingFees);
  add("funding", "Funding costs", p.fundingCosts);
  add("liquidation", "Liquidation", p.liquidationRule);
  add("holding", "Holding restrictions", p.holdingRestrictions);
  add("consistency", "Consistency rule", p.consistencyRule);
  add("inactivity", "Inactivity rule", p.inactivityRule);
  add("news", "News-event rule", p.newsRule);
  add("split", "Performance reward share", p.profitSharePct, pct);
  add("payout", "Payout schedule", p.payoutSchedule);
  add("scaling", "Scaling plan", p.scalingPlan);
  add("retry", "Retry discount", p.retryDiscountPct, pct);
  add("refund", "Refund policy", p.refundPolicy);
  return rows;
}
