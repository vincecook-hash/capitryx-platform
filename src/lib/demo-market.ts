/**
 * ILLUSTRATIVE market data for design demonstration only. Not live, not historical.
 * Generated deterministically (seeded) so server and client render identical output.
 * Replace with a verified data provider behind a server-side service when available.
 */
export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface DemoMarket {
  id: "btc" | "eth";
  symbol: string;
  candles: Candle[];
  last: number;
  /** Change over the last 6 candles (24h at 4-hour candles). */
  changePct: number;
  high: number;
  low: number;
}

export const CANDLE_INTERVAL_LABEL = "4-hour";

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateCandles(seed: number, start: number, count: number, volatility: number, drift: number): Candle[] {
  const rand = mulberry32(seed);
  const candles: Candle[] = [];
  let price = start;
  for (let i = 0; i < count; i++) {
    const open = price;
    const close = open + (rand() - 0.5 + drift) * volatility * open;
    const high = Math.max(open, close) + rand() * volatility * 0.45 * open;
    const low = Math.min(open, close) - rand() * volatility * 0.45 * open;
    candles.push({ open, high, low, close });
    price = close;
  }
  return candles;
}

export function summarize(id: DemoMarket["id"], symbol: string, candles: Candle[]): DemoMarket {
  const lastCandle = candles[candles.length - 1];
  const ref = candles[candles.length - 7];
  if (!lastCandle || !ref) throw new Error("Not enough candles");
  return {
    id,
    symbol,
    candles,
    last: lastCandle.close,
    changePct: (lastCandle.close / ref.close - 1) * 100,
    high: Math.max(...candles.map((c) => c.high)),
    low: Math.min(...candles.map((c) => c.low)),
  };
}

const COUNT = 60;
export const demoMarkets: DemoMarket[] = [
  summarize("btc", "BTC/USDT", generateCandles(128, 62_000, COUNT, 0.012, 0.03)),
  summarize("eth", "ETH/USDT", generateCandles(98, 3_000, COUNT, 0.016, 0.03)),
];
