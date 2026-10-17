import { programs } from "@/config/programs";
import type { OrderSummary } from "@/types/order";
import type { Program, TradingCategory } from "@/types/program";

export function getProgram(id: string): Program | undefined {
  return programs.find((p) => p.id === id);
}

export function getProgramsByCategory(category: TradingCategory): Program[] {
  return programs.filter((p) => p.category === category).sort((a, b) => a.accountSizeUsd - b.accountSizeUsd);
}

export function getAccountSizes(category: TradingCategory): number[] {
  return getProgramsByCategory(category).map((p) => p.accountSizeUsd);
}

export function findProgram(category: TradingCategory, accountSizeUsd: number): Program | undefined {
  return programs.find((p) => p.category === category && p.accountSizeUsd === accountSizeUsd);
}

/** Server-side price calculation. Never trust client-submitted prices. */
export function buildOrderSummary(programId: string): OrderSummary | null {
  const p = getProgram(programId);
  if (!p) return null;
  return {
    programId: p.id,
    programName: p.name,
    category: p.category,
    accountSizeUsd: p.accountSizeUsd,
    subtotalUsd: p.priceUsd,
    discountUsd: 0,
    feesUsd: 0,
    totalUsd: p.priceUsd,
  };
}
