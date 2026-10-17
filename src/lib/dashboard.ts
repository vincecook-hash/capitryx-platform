import type { DemoDashboardState, DemoPosition } from "@/config/demo-dashboard";
import { evaluateDrawdown, type DrawdownResult } from "@/lib/drawdown";
import { getProgram } from "@/lib/pricing";
import type { Program } from "@/types/program";

export interface PositionView extends DemoPosition {
  pnlUsd: number;
  sizeLabel: string;
}

export interface DashboardView {
  program: Program;
  phaseName: string;
  balanceUsd: number;
  equityUsd: number;
  realizedPnlUsd: number;
  unrealizedPnlUsd: number;
  profitTargetUsd: number | null;
  /** Share of the profit target reached, 0 to 1. */
  profitProgressRatio: number | null;
  drawdown: DrawdownResult;
  positions: PositionView[];
}

export function positionPnl(p: DemoPosition): number {
  const direction = p.side === "long" ? 1 : -1;
  return direction * p.quantity * (p.mark - p.entry);
}

/** Derives every displayed number from one state object so the demo is internally consistent. */
export function buildDashboardView(state: DemoDashboardState): DashboardView {
  const program = getProgram(state.programId);
  if (!program) throw new Error(`Unknown program ${state.programId}`);

  const positions = state.positions.map((p) => ({ ...p, pnlUsd: positionPnl(p), sizeLabel: `${p.quantity} ${p.unit}` }));
  const unrealizedPnlUsd = positions.reduce((sum, p) => sum + p.pnlUsd, 0);
  const equityUsd = state.balanceUsd + unrealizedPnlUsd;

  const phase = program.phases[0];
  const target = phase && phase.profitTargetPct.status === "set" ? (phase.profitTargetPct.value / 100) * program.accountSizeUsd : null;
  const profit = equityUsd - state.startingBalanceUsd;

  return {
    program,
    phaseName: phase?.name ?? "Phase 1",
    balanceUsd: state.balanceUsd,
    equityUsd,
    realizedPnlUsd: state.balanceUsd - state.startingBalanceUsd,
    unrealizedPnlUsd,
    profitTargetUsd: target,
    profitProgressRatio: target ? Math.min(1, Math.max(0, profit / target)) : null,
    drawdown: evaluateDrawdown(program, {
      startingBalanceUsd: state.startingBalanceUsd,
      dayStart: { balanceUsd: state.dayStartBalanceUsd, equityUsd: state.dayStartEquityUsd },
      peak: { balanceUsd: state.balanceUsd, equityUsd: state.peakEquityUsd },
      current: { balanceUsd: state.balanceUsd, equityUsd },
    }),
    positions,
  };
}
