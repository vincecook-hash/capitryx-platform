import { getListedAssets } from "@/lib/assets";
import { getProgram } from "@/lib/pricing";
import { getRuleRows } from "@/lib/rules";

export interface ComparisonRow {
  label: string;
  spot: string;
  futures: string;
}

/** Program used for the numbers in the comparison (the mid-size demonstration programs). */
export const COMPARISON_SIZE_LABEL = "$25K";

/**
 * Concept rows are written here; every number comes from the program config, so the comparison can
 * never drift away from the rules shown on the Programs page.
 */
export function buildComparison(): ComparisonRow[] {
  const spot = getProgram("spot-25k");
  const futures = getProgram("futures-25k");
  if (!spot || !futures) throw new Error("Comparison programs missing from config");

  const rule = (programId: "spot" | "futures", id: string) => {
    const p = programId === "spot" ? spot : futures;
    return getRuleRows(p).find((r) => r.id === id)?.value ?? "To be confirmed";
  };

  return [
    {
      label: "What you trade",
      spot: "The underlying digital asset, or its supported spot-market representation.",
      futures: "Derivatives contracts, not necessarily the underlying cryptocurrency.",
    },
    { label: "Contract types", spot: rule("spot", "contractTypes"), futures: rule("futures", "contractTypes") },
    { label: "Leverage", spot: rule("spot", "leverage"), futures: rule("futures", "leverage") },
    { label: "Funding payments", spot: rule("spot", "funding"), futures: rule("futures", "funding") },
    { label: "Liquidation risk", spot: rule("spot", "liquidation"), futures: rule("futures", "liquidation") },
    { label: "Trading fees", spot: rule("spot", "fees"), futures: rule("futures", "fees") },
    {
      label: "Daily / maximum drawdown",
      spot: `${rule("spot", "daily")} / ${rule("spot", "max")}`,
      futures: `${rule("futures", "daily")} / ${rule("futures", "max")}`,
    },
    { label: "Position sizing", spot: rule("spot", "position"), futures: rule("futures", "position") },
    {
      label: "Supported pairs",
      spot: `${getListedAssets("spot").length} pairs`,
      futures: `${getListedAssets("futures").length} perpetual pairs`,
    },
  ];
}
