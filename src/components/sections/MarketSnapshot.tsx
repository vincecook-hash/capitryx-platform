import { Container } from "@/components/ui/Container";
import { MarketSnapshotView } from "@/components/market/MarketSnapshotView";
import { getListedAssets } from "@/lib/assets";
import { getMarketSnapshot } from "@/server/market-data";

export async function MarketSnapshot() {
  const snapshot = await getMarketSnapshot();
  const assets = getListedAssets().map(({ symbol, name }) => ({ symbol, name }));
  return (
    <section aria-labelledby="market-title" className="pt-16 sm:pt-20">
      <Container>
        <h2 id="market-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Markets you can evaluate on
        </h2>
        <p className="mt-3 max-w-2xl text-fg-muted">
          Spot and perpetual pairs across majors, large-caps and higher-volatility coins. Rankings, prices and daily moves refresh automatically.
        </p>
        <div className="mt-8">
          <MarketSnapshotView initial={snapshot} assets={assets} />
        </div>
      </Container>
    </section>
  );
}
