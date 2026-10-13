import type { Program } from "@/types/program";

/**
 * SINGLE SOURCE OF TRUTH for programs, pricing and rules.
 * Every entry is dataStatus "demo" until the owner confirms real terms.
 * Populated in the next step.
 */
export const programs: Program[] = [];
export const demoAccountSizesUsd = [5_000, 10_000, 25_000, 50_000, 100_000] as const;
