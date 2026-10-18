export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

/** 5000 -> "5K", 100000 -> "100K" */
export function formatSizeShort(value: number): string {
  return value >= 1000 ? `${value / 1000}K` : String(value);
}

export function formatPrice(value: number, digits = 2): string {
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
}
/** "+$69.60" / "−$12.00" (true minus sign, so the sign is readable without color). */
export function formatSignedUsd(value: number): string {
  return `${value < 0 ? "−" : "+"}$${formatPrice(Math.abs(value))}`;
}
export function formatSignedPct(value: number, digits = 2): string {
  return `${value < 0 ? "−" : "+"}${formatPrice(Math.abs(value), digits)}%`;
}

/** Price with sensible precision: 64,943.51 / 0.5200 / 0.0000175 */
export function formatQuotePrice(value: number): string {
  if (value >= 1) return formatPrice(value, 2);
  if (value >= 0.01) return formatPrice(value, 4);
  const leadingZeros = Math.max(0, -Math.floor(Math.log10(value)) - 1);
  return formatPrice(value, Math.min(10, leadingZeros + 3));
}

/** 1.28e12 -> "$1.28T" */
export function formatCompactUsd(value: number): string {
  return `$${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(value)}`;
}
