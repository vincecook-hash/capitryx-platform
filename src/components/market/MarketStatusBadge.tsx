import { Badge } from "@/components/ui/Badge";
import type { MarketSnapshot } from "@/types/market";

const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "UTC", hour12: false });

/** Says plainly whether numbers are live. UTC time avoids server/client mismatches. */
export function MarketStatusBadge({ snapshot }: { snapshot: MarketSnapshot }) {
  const live = snapshot.mode === "live";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge tone={live ? "gain" : "demo"}>{live ? "Live · CoinMarketCap" : "Illustrative data"}</Badge>
      {live && <span className="text-xs text-fg-muted">Updated {timeFormat.format(new Date(snapshot.updatedAt))} UTC</span>}
    </div>
  );
}
