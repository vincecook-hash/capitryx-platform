import { programs } from "@/config/programs";
import type { OrderSummary } from "@/types/order";

export function getProgram(id: string) {
  return programs.find((p) => p.id === id);
}

/** Server-side price calculation. Never trust client-submitted prices. */
export function buildOrderSummary(programId: string): OrderSummary | null {
  const p = getProgram(programId);
  if (!p) return null;
  return {
    programId: p.id, programName: p.name, category: p.category, accountSizeUsd: p.accountSizeUsd,
    subtotalUsd: p.priceUsd, discountUsd: 0, feesUsd: 0, totalUsd: p.priceUsd,
  };
}
