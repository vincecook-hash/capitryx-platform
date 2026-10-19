import type { Metadata } from "next";
import { RulesExplorer } from "@/components/rules/RulesExplorer";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { resolveSelection } from "@/lib/selection";

export const metadata: Metadata = {
  title: "Trading Rules",
  description: "Capitryx trading rules for spot and futures evaluations: limits, fees, leverage, liquidation, conduct, and exactly how a violation is determined.",
};

export default async function TradingRulesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const { category, sizeUsd } = resolveSelection(params.category, params.size);

  return (
    <main id="main">
      <Container className="py-10 sm:py-14">
        <header className="max-w-3xl">
          <Badge tone="demo">Demonstration rules</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Trading rules</h1>
          <p className="mt-3 text-fg-muted">
            Spot and futures programs have separate rules. Pick a category and size to see its exact limits, how every limit is calculated, and
            worked examples you can test with your own numbers. Values are placeholders until Capitryx confirms its real terms.
          </p>
        </header>
        <div className="mt-10">
          <RulesExplorer initialCategory={category} initialSizeUsd={sizeUsd} />
        </div>
      </Container>
    </main>
  );
}
