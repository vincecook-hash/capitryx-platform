"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Tabs, tabIds } from "@/components/ui/Tabs";
import { CANDLE_INTERVAL_LABEL, demoMarkets } from "@/lib/demo-market";
import { CandlestickChart } from "./CandlestickChart";
import { MarketTicker } from "./MarketTicker";

const tabs = demoMarkets.map((m) => ({ id: m.id, label: m.symbol }));

export function MarketPanel() {
  const [active, setActive] = useState<string>(tabs[0]?.id ?? "btc");
  const market = demoMarkets.find((m) => m.id === active) ?? demoMarkets[0];
  if (!market) return null;
  const ids = tabIds("market", market.id);

  return (
    <div className="rounded-lg border border-line bg-bg-raised p-4 shadow-card sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs items={tabs} value={active} onChange={setActive} label="Market" idPrefix="market" />
        <Badge tone="demo">Illustrative · {CANDLE_INTERVAL_LABEL} candles</Badge>
      </div>

      <div role="tabpanel" id={ids.panel} aria-labelledby={ids.tab} className="mt-5">
        <MarketTicker symbol={market.symbol} last={market.last} changePct={market.changePct} />
        <div className="mt-5">
          <CandlestickChart candles={market.candles} symbol={market.symbol} intervalLabel={CANDLE_INTERVAL_LABEL} />
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-fg-muted" aria-label="Chart legend">
        <li className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-3 w-2 rounded-[1px] border border-gain bg-bg-raised" /> Up candle (outlined)
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-3 w-2 rounded-[1px] border border-loss bg-loss" /> Down candle (solid)
        </li>
      </ul>
      <p className="mt-3 text-xs text-fg-muted">Demonstration data. These are not live prices.</p>
    </div>
  );
}
