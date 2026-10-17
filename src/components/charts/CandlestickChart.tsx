import type { Candle } from "@/lib/demo-market";
import { formatPrice } from "@/lib/utils";

const TICKS = 5;

/**
 * Responsive SVG candlestick chart. Axis labels are HTML (stay crisp and readable on phones).
 * Direction is encoded by fill, not only color: up = outlined (hollow), down = solid.
 */
export function CandlestickChart({ candles, symbol, intervalLabel }: { candles: Candle[]; symbol: string; intervalLabel: string }) {
  const lows = candles.map((c) => c.low);
  const highs = candles.map((c) => c.high);
  const rawMin = Math.min(...lows);
  const rawMax = Math.max(...highs);
  const pad = (rawMax - rawMin) * 0.06;
  const min = rawMin - pad;
  const max = rawMax + pad;
  const y = (price: number) => ((max - price) / (max - min)) * 100;

  const n = candles.length;
  const slot = 100 / n;
  const bodyW = slot * 0.62;
  const last = candles[n - 1];
  const first = candles[0];
  const ticks = Array.from({ length: TICKS }, (_, i) => max - ((max - min) * i) / (TICKS - 1));

  const label =
    `Illustrative ${intervalLabel} candlestick chart for ${symbol}. ` +
    `Starts near ${formatPrice(first?.open ?? 0, 0)}, ends near ${formatPrice(last?.close ?? 0, 0)}, ` +
    `range ${formatPrice(rawMin, 0)} to ${formatPrice(rawMax, 0)}. Demonstration data, not live prices.`;

  return (
    <div role="img" aria-label={label} className="relative aspect-[16/10] w-full">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-y-0 left-0 right-14 h-full w-[calc(100%-3.5rem)]">
        {ticks.map((t) => (
          <line key={t} x1="0" x2="100" y1={y(t)} y2={y(t)} vectorEffect="non-scaling-stroke" style={{ stroke: "var(--cx-line)", strokeWidth: 1 }} />
        ))}
        {last && (
          <line
            x1="0"
            x2="100"
            y1={y(last.close)}
            y2={y(last.close)}
            vectorEffect="non-scaling-stroke"
            strokeDasharray="4 4"
            style={{ stroke: "var(--cx-silver)", strokeWidth: 1, opacity: 0.5 }}
          />
        )}
        {candles.map((c, i) => {
          const up = c.close >= c.open;
          const cx = (i + 0.5) * slot;
          const top = y(Math.max(c.open, c.close));
          const h = Math.max(Math.abs(y(c.open) - y(c.close)), 0.5);
          const color = up ? "var(--cx-gain)" : "var(--cx-loss)";
          return (
            <g key={i}>
              <line x1={cx} x2={cx} y1={y(c.high)} y2={y(c.low)} vectorEffect="non-scaling-stroke" style={{ stroke: color, strokeWidth: 1.25 }} />
              <rect
                x={cx - bodyW / 2}
                y={top}
                width={bodyW}
                height={h}
                vectorEffect="non-scaling-stroke"
                style={{ stroke: color, strokeWidth: 1.25, fill: up ? "var(--cx-bg-raised)" : color }}
              />
            </g>
          );
        })}
      </svg>

      {ticks.map((t) => (
        <span key={t} className="tabular absolute right-0 w-14 -translate-y-1/2 pl-2 text-[11px] text-fg-muted" style={{ top: `${y(t)}%` }}>
          {formatPrice(t, 0)}
        </span>
      ))}
      {last && (
        <span
          className="tabular absolute right-0 w-14 -translate-y-1/2 rounded-sm bg-silver px-1 text-center text-[11px] font-semibold text-bg"
          style={{ top: `${y(last.close)}%` }}
        >
          {formatPrice(last.close, 0)}
        </span>
      )}
    </div>
  );
}
