import type { PositionView } from "@/lib/dashboard";
import { cn, formatPrice, formatSignedUsd } from "@/lib/utils";

const pnlClass = (v: number) => (v >= 0 ? "text-gain" : "text-loss");

/**
 * Phones (< sm): one card per position, so nothing needs sideways scrolling.
 * sm and up: a real table, which scrolls inside its own box if space runs out.
 */
export function PositionsTable({ positions }: { positions: PositionView[] }) {
  return (
    <>
      <ul className="space-y-3 sm:hidden" aria-label="Open positions (illustrative)">
        {positions.map((p) => (
          <li key={p.id} className="rounded border border-line bg-bg-sunken p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium">{p.pair}</p>
                <p className="text-sm text-fg-muted">{p.side === "long" ? "Long" : "Short"}{p.leverage ? ` · ${p.leverage}x` : ""}</p>
              </div>
              <p className={cn("tabular shrink-0 font-mono text-base font-semibold", pnlClass(p.pnlUsd))}>{formatSignedUsd(p.pnlUsd)}</p>
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="min-w-0">
                <dt className="text-fg-muted">Size</dt>
                <dd className="tabular mt-0.5 break-words font-mono">{p.sizeLabel}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-fg-muted">Entry</dt>
                <dd className="tabular mt-0.5 font-mono">{formatPrice(p.entry, 0)}</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-fg-muted">Current</dt>
                <dd className="tabular mt-0.5 font-mono">{formatPrice(p.mark, 0)}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <caption className="sr-only">Open positions (illustrative)</caption>
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-muted">
              <th scope="col" className="py-2 pr-3 font-medium">Pair</th>
              <th scope="col" className="py-2 pr-3 font-medium">Side</th>
              <th scope="col" className="py-2 pr-3 text-right font-medium">Size</th>
              <th scope="col" className="py-2 pr-3 text-right font-medium">Entry</th>
              <th scope="col" className="py-2 pr-3 text-right font-medium">Current</th>
              <th scope="col" className="py-2 pr-3 text-right font-medium">Lev.</th>
              <th scope="col" className="py-2 text-right font-medium">P&amp;L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <th scope="row" className="py-3 pr-3 font-medium">{p.pair}</th>
                <td className="py-3 pr-3">{p.side === "long" ? "Long" : "Short"}</td>
                <td className="tabular py-3 pr-3 text-right font-mono">{p.sizeLabel}</td>
                <td className="tabular py-3 pr-3 text-right font-mono">{formatPrice(p.entry)}</td>
                <td className="tabular py-3 pr-3 text-right font-mono">{formatPrice(p.mark)}</td>
                <td className="tabular py-3 pr-3 text-right font-mono">{p.leverage ? `${p.leverage}x` : "N/A"}</td>
                <td className={cn("tabular py-3 text-right font-mono font-medium", pnlClass(p.pnlUsd))}>{formatSignedUsd(p.pnlUsd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
