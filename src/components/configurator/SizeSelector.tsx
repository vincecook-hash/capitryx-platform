import { Check } from "lucide-react";
import { cn, formatSizeShort, formatUsd } from "@/lib/utils";
import type { Program } from "@/types/program";

/** Native radio group (keyboard and screen-reader support built in), styled as cards. */
export function SizeSelector({ programs, value, onChange, name }: { programs: Program[]; value: number; onChange: (size: number) => void; name: string }) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">Evaluation size</legend>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {programs.map((p) => {
          const selected = p.accountSizeUsd === value;
          return (
            <label key={p.id} className="relative block cursor-pointer">
              <input type="radio" name={name} value={p.accountSizeUsd} checked={selected} onChange={() => onChange(p.accountSizeUsd)} className="peer sr-only" />
              <span
                className={cn(
                  "block rounded-lg border bg-bg-raised p-4 text-center transition-colors ease-cx",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-text",
                  selected ? "border-accent bg-accent/10" : "border-line-strong hover:border-silver/50",
                )}
              >
                <span className="block text-lg font-semibold">${formatSizeShort(p.accountSizeUsd)}</span>
                <span className="tabular mt-1 block text-sm text-fg-muted">{formatUsd(p.priceUsd)}</span>
                <span className="sr-only">{selected ? " (selected)" : ""}</span>
              </span>
              {selected && <Check aria-hidden size={16} className="absolute right-2 top-2 text-accent-text" />}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
