import { Badge } from "@/components/ui/Badge";
import { demoFuturesDashboard } from "@/config/demo-dashboard";
import { buildDashboardView } from "@/lib/dashboard";
import { cn, formatPrice, formatSignedUsd, formatUsd } from "@/lib/utils";
import { PositionsTable } from "./PositionsTable";
import { ProgressMeter } from "./ProgressMeters";

function Metric({ label, value, tone }: { label: string; value: string; tone?: "gain" | "loss" }) {
  return (
    <div className="rounded border border-line bg-bg-sunken p-3 sm:p-4">
      <dt className="text-xs text-fg-muted">{label}</dt>
      <dd className={cn("tabular mt-1 font-mono text-lg font-semibold sm:text-xl", tone === "gain" && "text-gain", tone === "loss" && "text-loss")}>{value}</dd>
    </div>
  );
}

/** Compact dashboard preview for the hero. All numbers derive from one illustrative state. */
export function DashboardPreview() {
  const v = buildDashboardView(demoFuturesDashboard);
  const { drawdown: dd } = v;
  const dailyPct = v.program.dailyDrawdownPct.status === "set" ? v.program.dailyDrawdownPct.value : null;
  const maxPct = v.program.maxDrawdownPct.status === "set" ? v.program.maxDrawdownPct.value : null;

  return (
    <section aria-labelledby="dash-title" className="rounded-lg border border-line bg-bg-raised shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-6">
        <div>
          <h2 id="dash-title" className="text-base font-semibold">Evaluation dashboard preview</h2>
          <p className="mt-0.5 text-sm text-fg-muted">{v.program.name} · Futures · {v.phaseName}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone="accent">Status: In progress</Badge>
          <Badge tone="demo">Demonstration</Badge>
        </div>
      </div>

      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <dl className="grid grid-cols-2 gap-3">
            <Metric label="Balance" value={formatUsd(v.balanceUsd)} />
            <Metric label="Equity" value={`$${formatPrice(v.equityUsd)}`} />
            <Metric label="Realized P&L" value={formatSignedUsd(v.realizedPnlUsd)} tone={v.realizedPnlUsd >= 0 ? "gain" : "loss"} />
            <Metric label="Unrealized P&L" value={formatSignedUsd(v.unrealizedPnlUsd)} tone={v.unrealizedPnlUsd >= 0 ? "gain" : "loss"} />
          </dl>

          <div className="space-y-5">
            <ProgressMeter
              label="Profit target"
              ratio={v.profitProgressRatio}
              valueText={v.profitProgressRatio === null ? "TBC" : `${Math.round(v.profitProgressRatio * 100)}%`}
              hint={v.profitTargetUsd ? `Target ${formatUsd(v.profitTargetUsd)} on ${formatUsd(v.program.accountSizeUsd)} evaluation size` : undefined}
            />
            <ProgressMeter
              risk
              label="Daily drawdown used"
              ratio={dd.dailyUsedRatio}
              valueText={dd.dailyUsedRatio === null ? "TBC" : `${Math.round(dd.dailyUsedRatio * 100)}% of ${dailyPct}%`}
              hint={dd.dailyFloorUsd !== null ? `Daily floor $${formatPrice(dd.dailyFloorUsd, 0)} equity` : undefined}
            />
            <ProgressMeter
              risk
              label="Maximum drawdown used"
              ratio={dd.maxUsedRatio}
              valueText={dd.maxUsedRatio === null ? "TBC" : `${Math.round(dd.maxUsedRatio * 100)}% of ${maxPct}%`}
              hint={dd.maxFloorUsd !== null ? `Static floor $${formatPrice(dd.maxFloorUsd, 0)} equity` : undefined}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Open positions</h3>
          <div className="mt-2">
            <PositionsTable positions={v.positions} />
          </div>
        </div>
      </div>

      <p className="border-t border-line px-4 py-3 text-xs text-fg-muted sm:px-6">
        Illustrative preview of the planned experience. Not a real account or a real trader&rsquo;s result. Evaluation size is a notional figure, not a deposit.
      </p>
    </section>
  );
}
