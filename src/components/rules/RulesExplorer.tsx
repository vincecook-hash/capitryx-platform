"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RulesPanel } from "@/components/configurator/RulesPanel";
import { SizeSelector } from "@/components/configurator/SizeSelector";
import { ButtonLink } from "@/components/ui/Button";
import { Tabs, tabIds } from "@/components/ui/Tabs";
import { findProgram, getProgramsByCategory } from "@/lib/pricing";
import { resolveSelection } from "@/lib/selection";
import { formatUsd } from "@/lib/utils";
import type { TradingCategory } from "@/types/program";
import { ConceptExamples } from "./ConceptExamples";
import { DrawdownCalculator } from "./DrawdownCalculator";
import { PolicyRules } from "./PolicyRules";
import { RuleMethodology } from "./RuleMethodology";

const TABS = [
  { id: "spot", label: "Spot Trading" },
  { id: "futures", label: "Futures Trading" },
];

const BLURB: Record<TradingCategory, string> = {
  spot: "Rules for spot programs. There is no derivatives leverage, funding or liquidation.",
  futures: "Rules for futures programs, including leverage, funding costs and liquidation.",
};

const TOC = [
  { href: "#program-rules", label: "Program rules" },
  { href: "#conduct", label: "Conduct and policy" },
  { href: "#how-violations-are-determined", label: "How violations are determined" },
  { href: "#examples", label: "Worked examples" },
  { href: "#calculator", label: "Try your own numbers" },
];

export function RulesExplorer({ initialCategory, initialSizeUsd }: { initialCategory: TradingCategory; initialSizeUsd: number }) {
  const [category, setCategory] = useState<TradingCategory>(initialCategory);
  const [sizeUsd, setSizeUsd] = useState(initialSizeUsd);

  const programs = getProgramsByCategory(category);
  const program = findProgram(category, sizeUsd) ?? programs[0];

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

  if (!program) return null;
  const ids = tabIds("rules-category", category);

  return (
    <div>
      <Tabs items={TABS} value={category} onChange={changeCategory} label="Trading category" idPrefix="rules-category" className="w-full sm:w-auto [&>button]:flex-1 sm:[&>button]:flex-none" />
      <p className="mt-3 text-sm text-fg-muted">{BLURB[category]}</p>

      <div role="tabpanel" id={ids.panel} aria-labelledby={ids.tab} className="mt-6 space-y-10">
        <SizeSelector programs={programs} value={program.accountSizeUsd} onChange={setSizeUsd} name="rules-size" />

        <div className="flex flex-col gap-4 rounded-lg border border-line bg-bg-raised p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <p className="text-sm">
            <span className="font-semibold">{program.name}</span>
            <span className="text-fg-muted"> · {formatUsd(program.priceUsd)} (demonstration price)</span>
          </p>
          <ButtonLink href={`/programs?category=${program.category}&size=${program.accountSizeUsd}`} size="sm">
            Choose this program
          </ButtonLink>
        </div>

        <nav aria-label="On this page">
          <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">On this page</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {TOC.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="inline-flex min-h-10 items-center rounded-full border border-line-strong px-3.5 text-sm text-fg-muted transition-colors ease-cx hover:text-fg">
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div id="program-rules" className="scroll-mt-24">
          <RulesPanel program={program} openAll />
        </div>
        <div id="conduct" className="scroll-mt-24">
          <PolicyRules category={category} />
        </div>
        <RuleMethodology program={program} />
        <ConceptExamples program={program} />
        <DrawdownCalculator key={program.id} program={program} />
      </div>
    </div>
  );
}
