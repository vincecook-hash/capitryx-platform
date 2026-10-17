import { demoMarkets } from "@/lib/demo-market";

/** ILLUSTRATIVE dashboard state. Not a real account, not a real trader's result. */
export interface DemoPosition {
  id: string;
  pair: string;
  side: "long" | "short";
  quantity: number;
  unit: string;
  entry: number;
  mark: number;
  leverage: number | null;
}

export interface DemoDashboardState {
  programId: string;
  startingBalanceUsd: number;
  balanceUsd: number;
  dayStartEquityUsd: number;
  dayStartBalanceUsd: number;
  peakEquityUsd: number;
  positions: DemoPosition[];
}

const market = (id: "btc" | "eth") => {
  const m = demoMarkets.find((x) => x.id === id);
  if (!m) throw new Error(`missing demo market ${id}`);
  return m;
};

// Marks come from the same demo series as the chart; entries are fixed offsets from them.
const btc = market("btc");
const eth = market("eth");

export const demoFuturesDashboard: DemoDashboardState = {
  programId: "futures-25k",
  startingBalanceUsd: 25_000,
  balanceUsd: 25_980,
  dayStartEquityUsd: 26_400,
  dayStartBalanceUsd: 25_900,
  peakEquityUsd: 26_400,
  positions: [
    { id: "p1", pair: "BTC/USDT Perp", side: "long", quantity: 0.12, unit: "BTC", entry: Math.round(btc.last * 0.992), mark: btc.last, leverage: 3 },
    { id: "p2", pair: "ETH/USDT Perp", side: "short", quantity: 2.5, unit: "ETH", entry: Math.round(eth.last * 1.006), mark: eth.last, leverage: 2 },
  ],
};
