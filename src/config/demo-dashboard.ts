import { demoMarkets } from "@/lib/demo-market";
import type { TradingCategory } from "@/types/program";

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

export const demoSpotDashboard: DemoDashboardState = {
  programId: "spot-25k",
  startingBalanceUsd: 25_000,
  balanceUsd: 25_640,
  dayStartEquityUsd: 25_900,
  dayStartBalanceUsd: 25_640,
  peakEquityUsd: 25_900,
  positions: [
    { id: "s1", pair: "BTC/USDT", side: "long", quantity: 0.08, unit: "BTC", entry: Math.round(btc.last * 0.985), mark: btc.last, leverage: null },
    { id: "s2", pair: "ETH/USDT", side: "long", quantity: 1.5, unit: "ETH", entry: Math.round(eth.last * 1.01), mark: eth.last, leverage: null },
  ],
};

export const demoDashboards: Record<TradingCategory, DemoDashboardState> = { spot: demoSpotDashboard, futures: demoFuturesDashboard };

/** Illustrative recent closed trades. Sample content only: not a real account or a real trader's result. */
export interface DemoTrade {
  id: string;
  time: string;
  pair: string;
  action: string;
  pnlUsd: number;
}

export const demoActivity: Record<TradingCategory, DemoTrade[]> = {
  spot: [
    { id: "a1", time: "09:42 UTC", pair: "SOL/USDT", action: "Long closed", pnlUsd: 182.4 },
    { id: "a2", time: "08:15 UTC", pair: "BNB/USDT", action: "Long closed", pnlUsd: -64.2 },
    { id: "a3", time: "Yesterday", pair: "XRP/USDT", action: "Long closed", pnlUsd: 121.75 },
  ],
  futures: [
    { id: "f1", time: "10:05 UTC", pair: "SOL/USDT Perp", action: "Long closed", pnlUsd: 214.8 },
    { id: "f2", time: "07:40 UTC", pair: "ETH/USDT Perp", action: "Short closed", pnlUsd: -96.3 },
    { id: "f3", time: "Yesterday", pair: "BTC/USDT Perp", action: "Long closed", pnlUsd: 310.5 },
  ],
};
