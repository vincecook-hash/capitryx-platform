import { getAccountSizes } from "@/lib/pricing";
import type { TradingCategory } from "@/types/program";

export const DEFAULT_SIZE_USD = 25_000;

/** Turns untrusted URL values into a valid category + size (falls back safely). */
export function resolveSelection(category: unknown, size: unknown): { category: TradingCategory; sizeUsd: number } {
  const cat: TradingCategory = category === "futures" ? "futures" : "spot";
  const sizes = getAccountSizes(cat);
  const n = typeof size === "string" ? Number(size) : typeof size === "number" ? size : Number.NaN;
  const sizeUsd = sizes.includes(n) ? n : sizes.includes(DEFAULT_SIZE_USD) ? DEFAULT_SIZE_USD : (sizes[0] ?? 0);
  return { category: cat, sizeUsd };
}
