import { Badge } from "@/components/ui/Badge";
import { CategorySwitcher } from "./CategorySwitcher";
import { DashboardPanel } from "./DashboardPanel";

/** Dashboard preview with a Spot/Futures switcher. Server component: only the tab switch needs the browser. */
export function DashboardPreview() {
  return (
    <section aria-labelledby="dash-title" className="rounded-lg border border-line bg-bg-raised shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-6">
        <h2 id="dash-title" className="text-base font-semibold">Evaluation dashboard preview</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">Status: In progress</Badge>
          <Badge tone="demo">Demonstration</Badge>
        </div>
      </div>

      <CategorySwitcher defaultCategory="futures" panels={{ spot: <DashboardPanel category="spot" />, futures: <DashboardPanel category="futures" /> }} />

      <p className="border-t border-line px-4 py-3 text-xs text-fg-muted sm:px-6">
        Illustrative preview of the planned experience. Not a real account or a real trader&rsquo;s result. Evaluation size is a notional figure, not a deposit.
      </p>
    </section>
  );
}
