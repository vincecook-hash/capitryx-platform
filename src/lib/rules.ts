import type { Program } from "@/types/program";
import { formatRule } from "@/lib/rule-value";

export interface RuleRow {
  id: string;
  label: string;
  value: string;
  status: "set" | "not_applicable" | "tbd";
}

const pct = (v: number) => `${v}%`;
const days = (v: number) => `${v} days`;

/** Flat, display-ready rule list for a program (used by the rules panel and tables). */
export function getRuleRows(p: Program): RuleRow[] {
  const rows: RuleRow[] = [];
  const add = <T,>(id: string, label: string, rule: Parameters<typeof formatRule<T>>[0], fmt?: (v: T) => string) =>
    rows.push({ id, label, value: formatRule(rule, fmt), status: rule.status });

  rows.push({
    id: "environment",
    label: "Trading environment",
    value: p.environment === "simulated" ? "Simulated" : p.environment === "live" ? "Live" : "To be confirmed",
    status: p.environment === "tbd" ? "tbd" : "set",
  });
  add("billing", "Billing", p.billing, (v) => (v === "one_time" ? "One-time fee" : "Subscription"));
  rows.push({ id: "assets", label: "Supported pairs", value: p.assets.join(", "), status: "set" });
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
  add("leverage", "Maximum leverage", p.maxLeverage, (v) => `${v}x`);
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
