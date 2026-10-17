import type { PositionView } from "@/lib/dashboard";
import { cn, formatPrice, formatSignedUsd } from "@/lib/utils";

export function PositionsTable({ positions }: { positions: PositionView[] }) {
  return (
    <div className="overflow-x-auto">
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
              <td className={cn("tabular py-3 text-right font-mono font-medium", p.pnlUsd >= 0 ? "text-gain" : "text-loss")}>{formatSignedUsd(p.pnlUsd)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
