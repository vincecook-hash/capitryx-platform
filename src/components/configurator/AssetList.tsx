"use client";

import { useId, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TIER_LABELS, TIER_ORDER, type AssetTier } from "@/config/assets";
import { effectiveMaxLeverage, getListedAssets, pairLabel } from "@/lib/assets";
import { cn, formatQuotePrice, formatSignedPct } from "@/lib/utils";
import type { MarketSnapshot } from "@/types/market";
import type { Program } from "@/types/program";
import { MarketStatusBadge } from "@/components/market/MarketStatusBadge";

const PAGE = 12;

/** Every pair the selected program supports. Ranks, prices and 24h moves come from the market snapshot. */
export function AssetList({ program, snapshot }: { program: Program; snapshot: MarketSnapshot }) {
  const searchId = useId();
  const [tier, setTier] = useState<AssetTier | "all">("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const all = useMemo(() => getListedAssets(program.category), [program.category]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all
      .filter((a) => tier === "all" || a.tier === tier)
      .filter((a) => !q || a.symbol.toLowerCase().includes(q) || a.name.toLowerCase().includes(q))
      .sort((x, y) => (snapshot.quotes[x.symbol]?.rank ?? 9999) - (snapshot.quotes[y.symbol]?.rank ?? 9999));
  }, [all, tier, query, snapshot]);

  const visible = expanded || query || tier !== "all" ? filtered : filtered.slice(0, PAGE);
  const futures = program.category === "futures";
  const hasHighVol = all.some((a) => a.tier === "high_volatility");

  return (
    <section aria-labelledby="assets-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="assets-title" className="text-xl font-semibold tracking-tight">Supported pairs ({all.length})</h2>
          <p className="mt-2 text-sm text-fg-muted">
            {futures ? "Perpetual contracts quoted in USDT." : "Spot pairs quoted in USDT."} New listings are added here as they are approved.
          </p>
        </div>
        <MarketStatusBadge snapshot={snapshot} />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative sm:w-64">
          <label htmlFor={searchId} className="sr-only">Search pairs</label>
          <Search aria-hidden size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search coin or ticker"
            className="h-11 w-full rounded border border-line-strong bg-bg-sunken pl-9 pr-3 text-sm placeholder:text-fg-muted"
          />
        </div>
        <div role="group" aria-label="Filter by risk tier" className="flex flex-wrap gap-2">
          {(["all", ...TIER_ORDER] as const).map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={tier === t}
              onClick={() => setTier(t)}
              className={cn(
                "min-h-10 rounded-full border px-3.5 text-sm transition-colors ease-cx",
                tier === t ? "border-accent bg-accent/10 text-fg" : "border-line-strong text-fg-muted hover:text-fg",
              )}
            >
              {t === "all" ? "All" : TIER_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {hasHighVol && (
        <p className="mt-4 rounded border border-line-strong bg-bg-sunken p-3 text-xs leading-relaxed text-fg-muted">
          High-volatility coins, including meme coins, can move sharply and often have thinner liquidity.
          {futures ? " Lower leverage caps apply to them." : ""} Listing a coin is not a recommendation to trade it.
        </p>
      )}

      <p className="sr-only" role="status" aria-live="polite">{filtered.length} pairs shown</p>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-fg-muted">No pairs match your search.</p>
      ) : (
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((a) => {
            const q = snapshot.quotes[a.symbol];
            const lev = futures ? effectiveMaxLeverage(a, program) : null;
            const up = q?.change24hPct != null && q.change24hPct >= 0;
            return (
              <li key={a.symbol} className="min-w-0 rounded-lg border border-line bg-bg-raised p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{pairLabel(a, program.category)}</p>
                    <p className="truncate text-xs text-fg-muted">{a.name}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="tabular font-mono text-sm">{q ? `$${formatQuotePrice(q.priceUsd)}` : "—"}</p>
                    {q?.change24hPct != null && (
                      <p className={cn("tabular font-mono text-xs", up ? "text-gain" : "text-loss")}>{formatSignedPct(q.change24hPct)}</p>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <Badge tone={a.tier === "high_volatility" ? "loss" : "neutral"}>{TIER_LABELS[a.tier]}</Badge>
                  {a.tags.includes("meme") && <Badge>Meme</Badge>}
                  {lev !== null && <Badge tone="accent">Up to {lev}x</Badge>}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {!expanded && !query && tier === "all" && filtered.length > PAGE && (
        <div className="mt-5">
          <Button variant="secondary" onClick={() => setExpanded(true)}>
            Show all {filtered.length} pairs
          </Button>
        </div>
      )}
    </section>
  );
}
