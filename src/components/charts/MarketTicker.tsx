import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn, formatPrice, formatSignedPct } from "@/lib/utils";

/** Price + change. Direction is shown by arrow, sign and text, never by color alone. */
export function MarketTicker({ symbol, last, changePct }: { symbol: string; last: number; changePct: number }) {
  const up = changePct >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="text-sm font-medium text-fg-muted">{symbol}</span>
      <span className="tabular font-mono text-2xl font-semibold tracking-tight">${formatPrice(last)}</span>
      <span className={cn("tabular inline-flex items-center gap-1 text-sm font-medium", up ? "text-gain" : "text-loss")}>
        <Icon aria-hidden size={16} />
        {formatSignedPct(changePct)}
        <span className="sr-only">{up ? "up" : "down"} over the last 24 hours (illustrative)</span>
      </span>
    </div>
  );
}
