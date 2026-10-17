import type { Program } from "@/types/program";

/** A value tracked on both bases so the program's chosen basis can be applied. */
export interface BasisValues {
  balanceUsd: number;
  equityUsd: number;
}

export interface AccountState {
  startingBalanceUsd: number;
  /** Values at the start of the current trading day. */
  dayStart: BasisValues;
  /** Highest values reached so far (used by trailing drawdown). */
  peak: BasisValues;
  current: BasisValues;
}

export interface DrawdownResult {
  /** Account value at or below which the daily limit is breached. Null if the rule is not set. */
  dailyFloorUsd: number | null;
  maxFloorUsd: number | null;
  dailyBreached: boolean;
  maxBreached: boolean;
  /** Share of the limit already used, from 0 to 1. Null if the rule is not set. */
  dailyUsedRatio: number | null;
  maxUsedRatio: number | null;
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Demo methodology (confirm before launch):
 * - Limit amounts are a percentage of the STARTING balance.
 * - Daily floor = day-start value minus the daily limit amount.
 * - Static max floor = starting balance minus the max limit amount.
 * - Trailing max floor = highest value reached minus the max limit amount.
 * - "Value" is balance or equity, depending on the program's drawdown basis.
 * - A breach occurs when the current value is at or below the floor.
 */
export function evaluateDrawdown(program: Program, state: AccountState): DrawdownResult {
  const basis = program.drawdownBasis.status === "set" ? program.drawdownBasis.value : null;
  const pick = (v: BasisValues) => (basis === "balance" ? v.balanceUsd : v.equityUsd);
  const current = pick(state.current);

  let dailyFloorUsd: number | null = null;
  let dailyUsedRatio: number | null = null;
  if (basis && program.dailyDrawdownPct.status === "set") {
    const amount = (program.dailyDrawdownPct.value / 100) * state.startingBalanceUsd;
    dailyFloorUsd = pick(state.dayStart) - amount;
    dailyUsedRatio = clamp01((pick(state.dayStart) - current) / amount);
  }

  let maxFloorUsd: number | null = null;
  let maxUsedRatio: number | null = null;
  if (basis && program.maxDrawdownPct.status === "set" && program.drawdownType.status === "set") {
    const amount = (program.maxDrawdownPct.value / 100) * state.startingBalanceUsd;
    const reference = program.drawdownType.value === "trailing" ? pick(state.peak) : state.startingBalanceUsd;
    maxFloorUsd = reference - amount;
    maxUsedRatio = clamp01((reference - current) / amount);
  }

  return {
    dailyFloorUsd,
    maxFloorUsd,
    dailyBreached: dailyFloorUsd !== null && current <= dailyFloorUsd,
    maxBreached: maxFloorUsd !== null && current <= maxFloorUsd,
    dailyUsedRatio,
    maxUsedRatio,
  };
}
