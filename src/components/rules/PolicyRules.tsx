import { Badge } from "@/components/ui/Badge";
import { policyRules } from "@/config/trading-rules";
import type { TradingCategory } from "@/types/program";

/** Conduct and policy rules for one category. Undecided rules say what they will cover; nothing is invented. */
export function PolicyRules({ category }: { category: TradingCategory }) {
  const label = category === "spot" ? "spot" : "futures";
  return (
    <section aria-labelledby="conduct-title">
      <h2 id="conduct-title" className="text-xl font-semibold tracking-tight">Conduct and policy rules</h2>
      <p className="mt-2 text-sm text-fg-muted">
        Draft wording for review. Rules that are not decided yet are marked &ldquo;To be confirmed&rdquo; with a note on what they will cover.
      </p>

      <dl className="mt-5 divide-y divide-line rounded-lg border border-line bg-bg-raised px-4 sm:px-5">
        {policyRules.map((r) => {
          const rule = r.rules[category];
          return (
            <div key={r.id} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-4">
              <dt className="text-sm text-fg-muted">{r.title}</dt>
              <dd className="min-w-0 break-words text-sm">
                {rule.status === "set" && <span className="font-medium">{rule.value}</span>}
                {rule.status === "not_applicable" && <span className="text-fg-muted">Not applicable to {label} programs</span>}
                {rule.status === "tbd" && (
                  <>
                    <span className="text-fg-muted">To be confirmed</span>
                    <Badge className="ml-2 align-middle">TBC</Badge>
                    {r.willCover && <span className="mt-1 block text-xs leading-relaxed text-fg-muted">This rule will cover: {r.willCover}</span>}
                  </>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
