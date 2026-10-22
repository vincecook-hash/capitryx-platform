"use client";

import { useState } from "react";
import { Tabs, tabIds } from "@/components/ui/Tabs";
import type { TradingCategory } from "@/types/program";

const TABS = [
  { id: "spot", label: "Spot" },
  { id: "futures", label: "Futures" },
];
const CATEGORIES: TradingCategory[] = ["spot", "futures"];

/**
 * Only the tab switch runs in the browser. Both panels are rendered on the server and passed in, so the page
 * does not have to execute the dashboard code to hydrate (this keeps the home page fast on phones).
 */
export function CategorySwitcher({ panels, defaultCategory }: { panels: Record<TradingCategory, React.ReactNode>; defaultCategory: TradingCategory }) {
  const [category, setCategory] = useState<TradingCategory>(defaultCategory);
  return (
    <>
      <div className="border-b border-line px-4 py-3 sm:px-6">
        <Tabs items={TABS} value={category} onChange={(id) => setCategory(id === "spot" ? "spot" : "futures")} label="Dashboard category" idPrefix="dash" />
      </div>
      {CATEGORIES.map((c) => {
        const ids = tabIds("dash", c);
        return (
          <div key={c} role="tabpanel" id={ids.panel} aria-labelledby={ids.tab} hidden={c !== category}>
            {panels[c]}
          </div>
        );
      })}
    </>
  );
}
