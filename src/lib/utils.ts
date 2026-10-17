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
