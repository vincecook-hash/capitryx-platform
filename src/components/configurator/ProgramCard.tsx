import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { getRuleRows } from "@/lib/rules";
import { formatUsd } from "@/lib/utils";
import type { Program } from "@/types/program";

const KEY_FACTS: Array<{ id: string; label: string }> = [
  { id: "phase0-target", label: "Phase 1 profit target" },
  { id: "daily", label: "Daily drawdown limit" },
  { id: "max", label: "Maximum drawdown" },
  { id: "leverage", label: "Maximum leverage" },
];

export function ProgramCard({ program }: { program: Program }) {
  const rows = getRuleRows(program);
  const facts = KEY_FACTS.map((f) => ({ ...f, row: rows.find((r) => r.id === f.id) })).filter((f) => f.row);

  return (
    <section aria-labelledby="program-title" className="rounded-lg border border-line bg-bg-raised p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">{program.category === "spot" ? "Spot trading" : "Futures trading"}</Badge>
        {program.dataStatus === "demo" && <Badge tone="demo">Demonstration terms</Badge>}
      </div>

      <h2 id="program-title" className="mt-4 text-2xl font-semibold tracking-tight">{program.name}</h2>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
        Evaluation size <span className="font-medium text-fg">{formatUsd(program.accountSizeUsd)}</span>. This is the notional size your
        results are measured against, not money deposited into your account.
      </p>

      <dl className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
        {facts.map(({ id, label, row }) => (
          <div key={id} className="min-w-0 rounded border border-line bg-bg-sunken p-3">
            <dt className="text-xs text-fg-muted">{label}</dt>
            <dd className="mt-1 break-words text-sm font-semibold">{row?.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-sm">
        <Link
          href={`/trading-rules?category=${program.category}&size=${program.accountSizeUsd}`}
          className="font-medium text-accent-text underline-offset-4 hover:underline"
        >
          Full rules and how violations are calculated
        </Link>
      </p>
    </section>
  );
}
