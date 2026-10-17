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
