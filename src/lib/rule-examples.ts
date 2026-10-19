import { evaluateDrawdown, type AccountState } from "@/lib/drawdown";
import { set } from "@/lib/rule-value";
import type { DrawdownType, Program } from "@/types/program";

const cents = (n: number) => Math.round(n * 100) / 100;

export interface LimitOutcome {
  floorUsd: number;
  breached: boolean;
}

export interface StaticVsTrailing {
  sizeUsd: number;
  maxPct: number;
  peakUsd: number;
  currentUsd: number;
  static: LimitOutcome;
  trailing: LimitOutcome;
}

/**
 * Worked example: equity rises to the maximum-drawdown percentage above the start, then falls back to 1% below it.
 * A static floor never moves; a trailing floor follows the peak and catches the same fall.
 */
export function staticVsTrailingExample(p: Program): StaticVsTrailing | null {
  if (p.maxDrawdownPct.status !== "set") return null;
  const size = p.accountSizeUsd;
  const maxPct = p.maxDrawdownPct.value;
  const peak = cents(size * (1 + maxPct / 100));
  const current = cents(size * 0.99);
  const state: AccountState = {
    startingBalanceUsd: size,
    dayStart: { balanceUsd: size, equityUsd: size },
    peak: { balanceUsd: peak, equityUsd: peak },
    current: { balanceUsd: current, equityUsd: current },
  };
  const run = (type: DrawdownType): LimitOutcome | null => {
    const r = evaluateDrawdown({ ...p, drawdownBasis: set("equity"), drawdownType: set(type) }, state);
    return r.maxFloorUsd === null ? null : { floorUsd: cents(r.maxFloorUsd), breached: r.maxBreached };
  };
  const s = run("static");
  const t = run("trailing");
  return s && t ? { sizeUsd: size, maxPct, peakUsd: peak, currentUsd: current, static: s, trailing: t } : null;
}

export interface BalanceVsEquity {
  sizeUsd: number;
  dailyPct: number;
  dailyAmountUsd: number;
  balanceUsd: number;
  equityUsd: number;
  equityBasis: LimitOutcome;
  balanceBasis: LimitOutcome;
}

/**
 * Worked example: the day starts flat, then an open trade is losing more than the daily limit but nothing is closed.
 * On an equity basis the open loss counts and the limit is breached; on a balance basis it is not (yet).
 */
export function balanceVsEquityExample(p: Program): BalanceVsEquity | null {
  if (p.dailyDrawdownPct.status !== "set") return null;
  const size = p.accountSizeUsd;
  const dailyPct = p.dailyDrawdownPct.value;
  const dailyAmount = cents((dailyPct / 100) * size);
  const equity = cents(size - dailyAmount * 1.25);
  const state: AccountState = {
    startingBalanceUsd: size,
    dayStart: { balanceUsd: size, equityUsd: size },
    peak: { balanceUsd: size, equityUsd: size },
    current: { balanceUsd: size, equityUsd: equity },
  };
  const run = (basis: "equity" | "balance"): LimitOutcome | null => {
    const r = evaluateDrawdown({ ...p, drawdownBasis: set(basis) }, state);
    return r.dailyFloorUsd === null ? null : { floorUsd: cents(r.dailyFloorUsd), breached: r.dailyBreached };
  };
  const e = run("equity");
  const b = run("balance");
  return e && b ? { sizeUsd: size, dailyPct, dailyAmountUsd: dailyAmount, balanceUsd: size, equityUsd: equity, equityBasis: e, balanceBasis: b } : null;
}
