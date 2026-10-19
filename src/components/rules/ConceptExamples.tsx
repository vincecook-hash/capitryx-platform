import { Badge } from "@/components/ui/Badge";
import { balanceVsEquityExample, staticVsTrailingExample } from "@/lib/rule-examples";
import { cn, formatUsd } from "@/lib/utils";
import type { Program } from "@/types/program";

const Outcome = ({ breached }: { breached: boolean }) => <Badge tone={breached ? "loss" : "gain"}>{breached ? "Breached" : "Within limit"}</Badge>;

function Row({ label, floor, breached }: { label: string; floor: number; breached: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-3">
      <dt className="text-sm font-medium">{label}</dt>
      <dd className="flex items-center gap-3 text-sm">
        <span className="tabular font-mono text-fg-muted">Floor {formatUsd(floor)}</span>
        <Outcome breached={breached} />
      </dd>
    </div>
  );
}

/** Two worked examples that show the difference between the ways a limit can be measured. */
export function ConceptExamples({ program }: { program: Program }) {
  const a = staticVsTrailingExample(program);
  const b = balanceVsEquityExample(program);
  if (!a && !b) return null;

  return (
    <section aria-labelledby="examples-title" id="examples" className="scroll-mt-24">
      <h2 id="examples-title" className="text-xl font-semibold tracking-tight">Worked examples</h2>
      <p className="mt-2 text-sm text-fg-muted">
        Same account, same moves, different measuring method. Numbers use {program.name}.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {a && (
          <div className="min-w-0 rounded-lg border border-line bg-bg-raised p-5">
            <h3 className="text-base font-semibold">Static vs trailing maximum drawdown</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              Your equity climbs to {formatUsd(a.peakUsd)} (+{a.maxPct}%), then falls back to {formatUsd(a.currentUsd)}. The maximum limit is{" "}
              {a.maxPct}% of {formatUsd(a.sizeUsd)}.
            </p>
            <dl className={cn("mt-3 divide-y divide-line border-t border-line")}>
              <Row label="Static limit" floor={a.static.floorUsd} breached={a.static.breached} />
              <Row label="Trailing limit" floor={a.trailing.floorUsd} breached={a.trailing.breached} />
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-fg-muted">
              The trailing floor moved up with your peak and caught the fall. The static floor stayed where it started.
            </p>
          </div>
        )}

        {b && (
          <div className="min-w-0 rounded-lg border border-line bg-bg-raised p-5">
            <h3 className="text-base font-semibold">Equity vs balance for the daily limit</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              The day starts at {formatUsd(b.sizeUsd)}. You hold a losing open trade and your equity drops to {formatUsd(b.equityUsd)}, but you
              close nothing, so your balance stays {formatUsd(b.balanceUsd)}. The daily limit is {b.dailyPct}% ({formatUsd(b.dailyAmountUsd)}).
            </p>
            <dl className="mt-3 divide-y divide-line border-t border-line">
              <Row label="Measured on equity" floor={b.equityBasis.floorUsd} breached={b.equityBasis.breached} />
              <Row label="Measured on balance" floor={b.balanceBasis.floorUsd} breached={b.balanceBasis.breached} />
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-fg-muted">On equity, open losses count immediately. On balance, they count only once closed.</p>
          </div>
        )}
      </div>
    </section>
  );
}
