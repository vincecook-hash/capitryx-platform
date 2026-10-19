"use client";

import { useId, useState } from "react";
import { ProgressMeter } from "@/components/dashboard/ProgressMeters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { evaluateDrawdown } from "@/lib/drawdown";
import { cn, formatUsd } from "@/lib/utils";
import type { Program } from "@/types/program";

const parse = (v: string): number | null => {
  const n = Number(v.replace(/[,\s$]/g, ""));
  return v.trim() !== "" && Number.isFinite(n) && n >= 0 ? n : null;
};

function Field({ label, hint, value, onChange }: { label: string; hint: string; value: string; onChange: (v: string) => void }) {
  const id = useId();
  const hintId = `${id}-hint`;
  const invalid = parse(value) === null;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid || undefined}
        aria-describedby={hintId}
        className="tabular mt-2 h-12 w-full rounded border border-line-strong bg-bg-sunken px-3 font-mono text-base"
      />
      <p id={hintId} className={cn("mt-1.5 text-xs", invalid ? "text-loss" : "text-fg-muted")}>{invalid ? "Enter a number, for example 24500." : hint}</p>
    </div>
  );
}

/** Type your own numbers and see exactly where each limit sits and whether it is breached. */
export function DrawdownCalculator({ program }: { program: Program }) {
  const size = program.accountSizeUsd;
  const basis = program.drawdownBasis.status === "set" ? program.drawdownBasis.value : "equity";
  const trailing = program.drawdownType.status === "set" && program.drawdownType.value === "trailing";
  const dailyAmt = program.dailyDrawdownPct.status === "set" ? (program.dailyDrawdownPct.value / 100) * size : null;

  const [dayStart, setDayStart] = useState(String(size));
  const [peak, setPeak] = useState(String(size));
  const [current, setCurrent] = useState(String(dailyAmt ? Math.round(size - dailyAmt * 0.6) : size));

  const d = parse(dayStart);
  const p = parse(peak);
  const c = parse(current);
  const ready = d !== null && c !== null && (!trailing || p !== null);

  const result =
    ready && d !== null && c !== null
      ? (() => {
          const at = (v: number) => ({ balanceUsd: v, equityUsd: v });
          return evaluateDrawdown(program, { startingBalanceUsd: size, dayStart: at(d), peak: at(trailing ? (p ?? d) : size), current: at(c) });
        })()
      : null;

  const presets = dailyAmt
    ? [
        { label: "Quiet day", value: size },
        { label: "Near the daily limit", value: Math.round(size - dailyAmt * 0.9) },
        { label: "Daily limit breached", value: Math.round(size - dailyAmt * 1.05) },
      ]
    : [];

  const limit = (name: string, floor: number | null, used: number | null, breached: boolean) => {
    if (floor === null || used === null) return <div className="rounded border border-line bg-bg-sunken p-4 text-sm text-fg-muted">{name}: not defined for this program.</div>;
    const room = (c ?? 0) - floor;
    return (
      <div className="min-w-0 rounded border border-line bg-bg-sunken p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{name}</h3>
          <Badge tone={breached ? "loss" : "gain"}>{breached ? "Breached" : "Within limit"}</Badge>
        </div>
        <p className="tabular mt-2 font-mono text-sm">Floor {formatUsd(floor)}</p>
        <p className="mt-1 text-xs text-fg-muted">
          {breached ? `${formatUsd(Math.abs(room))} below the floor.` : `${formatUsd(room)} of room left before the floor.`}
        </p>
        <div className="mt-3">
          <ProgressMeter risk label={`${name} used`} ratio={used} valueText={`${Math.round(used * 100)}% used`} />
        </div>
      </div>
    );
  };

  return (
    <section aria-labelledby="calc-title" id="calculator" className="scroll-mt-24">
      <h2 id="calc-title" className="text-xl font-semibold tracking-tight">Try it with your own numbers</h2>
      <p className="mt-2 text-sm text-fg-muted">
        For {program.name}. Limits are measured on {basis}, so enter your {basis} values. This is a learning tool, not your account.
      </p>

      <div className="mt-5 rounded-lg border border-line bg-bg-raised p-5 sm:p-6">
        <div className={cn("grid grid-cols-1 gap-4", trailing ? "md:grid-cols-3" : "md:grid-cols-2")}>
          <Field label={`${basis === "equity" ? "Equity" : "Balance"} at the start of the day`} hint="Where the day began." value={dayStart} onChange={setDayStart} />
          {trailing && <Field label={`Highest ${basis} reached`} hint="Your peak so far." value={peak} onChange={setPeak} />}
          <Field label={`${basis === "equity" ? "Equity" : "Balance"} right now`} hint="Your current value." value={current} onChange={setCurrent} />
        </div>

        {presets.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Example scenarios">
            {presets.map((pr) => (
              <Button
                key={pr.label}
                size="sm"
                variant="secondary"
                onClick={() => {
                  setDayStart(String(size));
                  setPeak(String(size));
                  setCurrent(String(pr.value));
                }}
              >
                {pr.label}
              </Button>
            ))}
          </div>
        )}

        <div role="status" aria-live="polite" className="mt-6">
          {result ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {limit("Daily loss limit", result.dailyFloorUsd, result.dailyUsedRatio, result.dailyBreached)}
              {limit("Maximum drawdown", result.maxFloorUsd, result.maxUsedRatio, result.maxBreached)}
            </div>
          ) : (
            <p className="text-sm text-loss">Fill in every field with a number to see the result.</p>
          )}
        </div>
      </div>
    </section>
  );
}
