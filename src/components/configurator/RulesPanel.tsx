import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { getRuleRows, RULE_GROUP_LABELS, RULE_GROUP_ORDER } from "@/lib/rules";
import type { Program } from "@/types/program";

/** Every rule for the selected program, grouped. Undecided policies are shown, never hidden or invented. */
export function RulesPanel({ program, openAll = false }: { program: Program; openAll?: boolean }) {
  const rows = getRuleRows(program);
  return (
    <section aria-labelledby="rules-title">
      <h2 id="rules-title" className="text-xl font-semibold tracking-tight">Rules for {program.name}</h2>
      <p className="mt-2 text-sm text-fg-muted">
        Spot and futures programs have separate rules. Items marked &ldquo;To be confirmed&rdquo; are not decided yet.
      </p>

      <div className="mt-5 space-y-3">
        {RULE_GROUP_ORDER.map((group, i) => {
          const groupRows = rows.filter((r) => r.group === group);
          if (groupRows.length === 0) return null;
          return (
            <details key={group} open={openAll || i < 2} className="group rounded-lg border border-line bg-bg-raised">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-semibold sm:px-5">
                {RULE_GROUP_LABELS[group]}
                <span aria-hidden className="text-fg-muted transition-transform group-open:rotate-180">⌄</span>
              </summary>
              <dl className="divide-y divide-line border-t border-line px-4 sm:px-5">
                {groupRows.map((r) => (
                  <div key={r.id} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4">
                    <dt className="text-sm text-fg-muted">{r.label}</dt>
                    <dd className={cn("min-w-0 break-words text-sm", r.status === "set" ? "font-medium" : "text-fg-muted")}>
                      {r.value}
                      {r.status === "tbd" && <Badge className="ml-2 align-middle">TBC</Badge>}
                    </dd>
                  </div>
                ))}
              </dl>
            </details>
          );
        })}
      </div>
    </section>
  );
}
