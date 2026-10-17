import { cn } from "@/lib/utils";

/**
 * Progress bar that always prints its value, so status never depends on color.
 * `risk` meters (drawdown) switch wording at 75% of the limit.
 */
export function ProgressMeter({
  label,
  ratio,
  valueText,
  hint,
  risk = false,
}: {
  label: string;
  ratio: number | null;
  valueText: string;
  hint?: string;
  risk?: boolean;
}) {
  const pct = ratio === null ? 0 : Math.round(ratio * 100);
  const near = risk && pct >= 75;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-fg-muted">{label}</span>
        <span className="tabular font-medium">
          {valueText}
          {near && <span className="ml-2 text-loss">Near limit</span>}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-valuetext={`${valueText}${near ? ", near limit" : ""}`}
        className="mt-2 h-2 overflow-hidden rounded-full bg-bg-sunken"
      >
        <div className={cn("h-full rounded-full transition-[width] ease-cx", near ? "bg-loss" : risk ? "bg-silver" : "bg-accent")} style={{ width: `${pct}%` }} />
      </div>
      {hint && <p className="mt-1.5 text-xs text-fg-muted">{hint}</p>}
    </div>
  );
}
