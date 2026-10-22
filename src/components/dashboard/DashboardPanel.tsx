import { demoActivity, demoDashboards } from "@/config/demo-dashboard";
import { buildDashboardView } from "@/lib/dashboard";
import { cn, formatPrice, formatSignedUsd, formatUsd } from "@/lib/utils";
import type { TradingCategory } from "@/types/program";
import { PositionsTable } from "./PositionsTable";
import { ProgressMeter } from "./ProgressMeters";

function Metric({ label, value, tone }: { label: string; value: string; tone?: "gain" | "loss" }) {
  return (
    <div className="min-w-0 rounded border border-line bg-bg-sunken p-3 sm:p-4">
      <dt className="text-xs text-fg-muted">{label}</dt>
      <dd className={cn("tabular mt-1 break-words font-mono text-lg font-semibold sm:text-xl", tone === "gain" && "text-gain", tone === "loss" && "text-loss")}>{value}</dd>
    </div>
  );
}

/** One category's dashboard. Server-rendered; every number derives from one illustrative state. */
export function DashboardPanel({ category }: { category: TradingCategory }) {
  const v = buildDashboardView(demoDashboards[category]);
  const activity = demoActivity[category];
  const { drawdown: dd } = v;
  const dailyPct = v.program.dailyDrawdownPct.status === "set" ? v.program.dailyDrawdownPct.value : null;
  const maxPct = v.program.maxDrawdownPct.status === "set" ? v.program.maxDrawdownPct.value : null;

  return (
    <div>
      <p className="px-4 pt-4 text-sm text-fg-muted sm:px-6">
        {v.program.name} · {category === "spot" ? "Spot" : "Futures"} · {v.phaseName}
      </p>
      <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="min-w-0 space-y-6">
          <dl className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
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

        <div className="min-w-0 space-y-6">
          <div>
            <h3 className="text-sm font-semibold">Open positions</h3>
            <div className="mt-2">
              <PositionsTable positions={v.positions} />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Recent activity</h3>
            <ul className="mt-2 divide-y divide-line rounded border border-line bg-bg-sunken">
              {activity.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{t.pair}</span>
                    <span className="block text-xs text-fg-muted">
                      {t.action} · {t.time}
                    </span>
                  </span>
                  <span className={cn("tabular shrink-0 font-mono font-medium", t.pnlUsd >= 0 ? "text-gain" : "text-loss")}>{formatSignedUsd(t.pnlUsd)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
