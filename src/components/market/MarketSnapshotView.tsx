"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn, formatCompactUsd, formatQuotePrice, formatSignedPct } from "@/lib/utils";
import type { MarketSnapshot } from "@/types/market";
import { MarketStatusBadge } from "./MarketStatusBadge";
import { useMarketSnapshot } from "./useMarketSnapshot";

export interface SnapshotAsset {
  symbol: string;
  name: string;
}

/** Top assets by market cap: ranks, prices and 24h moves refresh automatically. */
export function MarketSnapshotView({ initial, assets, limit = 8 }: { initial: MarketSnapshot; assets: SnapshotAsset[]; limit?: number }) {
  const snapshot = useMarketSnapshot(initial);

  const rows = assets
    .map((a) => ({ asset: a, quote: snapshot.quotes[a.symbol] }))
    .sort((x, y) => (x.quote?.rank ?? 9999) - (y.quote?.rank ?? 9999))
    .slice(0, limit);

  return (
    <div className="rounded-lg border border-line bg-bg-raised shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-6">
        <h3 className="text-base font-semibold">Top assets by market cap</h3>
        <MarketStatusBadge snapshot={snapshot} />
      </div>

      <table className="w-full text-left text-sm">
        <caption className="sr-only">Top assets by market cap ({snapshot.mode === "live" ? "live data" : "illustrative data"})</caption>
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-muted">
            <th scope="col" className="py-3 pl-4 pr-2 font-medium sm:pl-6">#</th>
            <th scope="col" className="px-2 py-3 font-medium">Asset</th>
            <th scope="col" className="px-2 py-3 text-right font-medium">Price</th>
            <th scope="col" className="px-2 py-3 text-right font-medium">24h</th>
            <th scope="col" className="hidden py-3 pl-2 pr-6 text-right font-medium sm:table-cell">Market cap</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ asset, quote }) => {
            const change = quote?.change24hPct ?? null;
            const up = change !== null && change >= 0;
            const Icon = up ? ArrowUpRight : ArrowDownRight;
            return (
              <tr key={asset.symbol} className="border-b border-line last:border-0">
                <td className="tabular py-3 pl-4 pr-2 text-fg-muted sm:pl-6">{quote?.rank ?? "–"}</td>
                <th scope="row" className="px-2 py-3 font-medium">
                  {asset.symbol}
                  <span className="ml-2 hidden font-normal text-fg-muted sm:inline">{asset.name}</span>
                </th>
                <td className="tabular px-2 py-3 text-right font-mono">{quote ? `$${formatQuotePrice(quote.priceUsd)}` : "—"}</td>
                <td className={cn("tabular px-2 py-3 text-right font-mono", change === null ? "text-fg-muted" : up ? "text-gain" : "text-loss")}>
                  {change === null ? (
                    "—"
                  ) : (
                    <span className="inline-flex items-center justify-end gap-1">
                      <Icon aria-hidden size={14} />
                      {formatSignedPct(change)}
                    </span>
                  )}
                </td>
                <td className="tabular hidden py-3 pl-2 pr-6 text-right font-mono text-fg-muted sm:table-cell">
                  {quote?.marketCapUsd ? formatCompactUsd(quote.marketCapUsd) : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="border-t border-line px-4 py-3 text-xs text-fg-muted sm:px-6">
        {snapshot.mode === "live"
          ? "Market data provided by CoinMarketCap. Shown for information only; it is not trading advice."
          : (snapshot.notice ?? "Illustrative figures, not live prices. Live data appears once a market data key is configured.")}
      </p>
    </div>
  );
}
