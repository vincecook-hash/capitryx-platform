import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { resolveSelection } from "@/lib/selection";
import { getMarketSnapshot } from "@/server/market-data";

export const metadata: Metadata = {
  title: "Trading Programs",
  description: "Compare Capitryx crypto spot and futures evaluation programs: sizes, prices, trading rules and supported pairs.",
};

export default async function ProgramsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const { category, sizeUsd } = resolveSelection(params.category, params.size);
  const snapshot = await getMarketSnapshot();

  return (
    <main id="main">
      <Container className="py-10 sm:py-14">
        <header className="max-w-3xl">
          <Badge tone="demo">Demonstration programs</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Trading programs</h1>
          <p className="mt-3 text-fg-muted">
            Choose spot or futures, pick an evaluation size, and review the exact price and rules before you commit. Sizes, prices and
            rules shown here are placeholders until Capitryx confirms its real terms.
          </p>
        </header>

        <div className="mt-10">
          <Configurator initialCategory={category} initialSizeUsd={sizeUsd} snapshot={snapshot} />
        </div>
      </Container>
    </main>
  );
}
