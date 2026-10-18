"use client";

import { useEffect, useState } from "react";
import { useMarketSnapshot } from "@/components/market/useMarketSnapshot";
import { OrderSummaryCard } from "@/components/checkout/OrderSummaryCard";
import { ButtonLink } from "@/components/ui/Button";
import { Tabs, tabIds } from "@/components/ui/Tabs";
import { buildOrderSummary, findProgram, getProgramsByCategory } from "@/lib/pricing";
import { resolveSelection } from "@/lib/selection";
import type { MarketSnapshot } from "@/types/market";
import type { TradingCategory } from "@/types/program";
import { AssetList } from "./AssetList";
import { ProgramCard } from "./ProgramCard";
import { RulesPanel } from "./RulesPanel";
import { SizeSelector } from "./SizeSelector";

const CATEGORY_TABS = [
  { id: "spot", label: "Spot Trading" },
  { id: "futures", label: "Futures Trading" },
];

const CATEGORY_BLURB: Record<TradingCategory, string> = {
  spot: "Trade supported spot pairs. No derivatives leverage and no perpetual funding payments.",
  futures: "Trade perpetual contracts with leverage limits, funding costs and liquidation rules.",
};

export function Configurator({ initialCategory, initialSizeUsd, snapshot: initialSnapshot }: { initialCategory: TradingCategory; initialSizeUsd: number; snapshot: MarketSnapshot }) {
  const [category, setCategory] = useState<TradingCategory>(initialCategory);
  const [sizeUsd, setSizeUsd] = useState(initialSizeUsd);
  const snapshot = useMarketSnapshot(initialSnapshot);

  const programs = getProgramsByCategory(category);
  const program = findProgram(category, sizeUsd) ?? programs[0];
  const order = program ? buildOrderSummary(program.id) : null;

  // Keep the URL shareable and refresh-safe without a page navigation.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("category", category);
    url.searchParams.set("size", String(sizeUsd));
    window.history.replaceState(null, "", url);
  }, [category, sizeUsd]);

  const changeCategory = (id: string) => {
    const next = resolveSelection(id, sizeUsd);
    setCategory(next.category);
    setSizeUsd(next.sizeUsd);
  };

  if (!program || !order) return null;
  const ids = tabIds("category", category);

  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div className="min-w-0 space-y-6">
          <div>
            <Tabs items={CATEGORY_TABS} value={category} onChange={changeCategory} label="Trading category" idPrefix="category" className="w-full sm:w-auto [&>button]:flex-1 sm:[&>button]:flex-none" />
            <p className="mt-3 text-sm text-fg-muted">{CATEGORY_BLURB[category]}</p>
          </div>

          <div role="tabpanel" id={ids.panel} aria-labelledby={ids.tab} className="space-y-6">
            <SizeSelector programs={programs} value={program.accountSizeUsd} onChange={setSizeUsd} name="evaluation-size" />
            <ProgramCard program={program} />
          </div>
        </div>

        <div className="min-w-0 lg:sticky lg:top-24">
          <OrderSummaryCard order={order} demo={program.dataStatus === "demo"}>
            <ButtonLink href={`/checkout?program=${program.id}`} size="lg" className="w-full">
              Continue to checkout
            </ButtonLink>
            <p className="mt-3 text-center text-xs text-fg-muted">Selected: {program.name}. Prices are confirmed again at checkout.</p>
          </OrderSummaryCard>
        </div>
      </div>

      <div className="mt-12 space-y-14">
        <RulesPanel program={program} />
        <AssetList key={program.category} program={program} snapshot={snapshot} />
      </div>
    </div>
  );
}
