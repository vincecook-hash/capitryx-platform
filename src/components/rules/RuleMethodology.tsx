import { formatRule } from "@/lib/rule-value";
import { formatUsd } from "@/lib/utils";
import type { Program } from "@/types/program";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-bg-raised p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-fg-muted">{children}</div>
    </div>
  );
}

const Formula = ({ children }: { children: React.ReactNode }) => (
  <p className="tabular break-words rounded border border-line bg-bg-sunken px-3 py-2 font-mono text-[13px] leading-relaxed text-fg">{children}</p>
);

/** Plain-language rules for how each limit is measured, using the selected program's real numbers. */
export function RuleMethodology({ program: p }: { program: Program }) {
  const size = p.accountSizeUsd;
  const word = p.drawdownBasis.status === "set" ? p.drawdownBasis.value : "account value";
  const daily = p.dailyDrawdownPct.status === "set" ? p.dailyDrawdownPct.value : null;
  const max = p.maxDrawdownPct.status === "set" ? p.maxDrawdownPct.value : null;
  const type = p.drawdownType.status === "set" ? p.drawdownType.value : null;
  const dailyAmt = daily === null ? null : (daily / 100) * size;
  const maxAmt = max === null ? null : (max / 100) * size;
  const phase = p.phases[0];
  const target = phase && phase.profitTargetPct.status === "set" ? phase.profitTargetPct.value : null;
  const futures = p.category === "futures";

  return (
    <section aria-labelledby="method-title" id="how-violations-are-determined" className="scroll-mt-24">
      <h2 id="method-title" className="text-xl font-semibold tracking-tight">How a violation is determined</h2>
      <p className="mt-2 text-sm text-fg-muted">
        Worked through for {p.name}. Starting point: the evaluation size of {formatUsd(size)}. These are demonstration methods until Capitryx
        confirms them.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Block title="What is measured">
          <p>
            <span className="font-medium text-fg">Equity</span> is your balance plus the profit or loss on positions you still have open, so a
            losing open trade counts before you close it. <span className="font-medium text-fg">Balance</span> counts closed trades only.
            Fees{futures ? " and funding costs" : ""} reduce your account value like any other loss.
          </p>
          <p>
            This program measures limits on{" "}
            <span className="font-medium text-fg">{formatRule(p.drawdownBasis, (v) => (v === "equity" ? "equity" : "balance"))}</span>.
          </p>
        </Block>

        <Block title="Daily loss limit">
          {daily !== null && dailyAmt !== null ? (
            <>
              <Formula>
                Limit amount = {daily}% × {formatUsd(size)} = {formatUsd(dailyAmt)}
              </Formula>
              <Formula>Daily floor = {word} at the start of the day − {formatUsd(dailyAmt)}</Formula>
              <p>
                You breach the daily limit if your {word} is at or below the floor at any moment that day. For example, if the day starts at{" "}
                {formatUsd(size)}, the floor is {formatUsd(size - dailyAmt)}. When a trading day starts (for example a midnight cut-off in a
                stated time zone) is still to be confirmed.
              </p>
            </>
          ) : (
            <p>The daily loss limit is to be confirmed.</p>
          )}
        </Block>

        <Block title="Maximum drawdown">
          {max !== null && maxAmt !== null && type ? (
            <>
              <Formula>
                Limit amount = {max}% × {formatUsd(size)} = {formatUsd(maxAmt)}
              </Formula>
              {type === "static" ? (
                <>
                  <Formula>
                    Floor = {formatUsd(size)} − {formatUsd(maxAmt)} = {formatUsd(size - maxAmt)}
                  </Formula>
                  <p>This is a <span className="font-medium text-fg">static</span> limit: the floor is fixed from the starting size and never moves, however much you profit.</p>
                </>
              ) : (
                <>
                  <Formula>Floor = highest {word} reached − {formatUsd(maxAmt)}</Formula>
                  <p>This is a <span className="font-medium text-fg">trailing</span> limit: the floor rises as your {word} reaches new highs and never falls back.</p>
                </>
              )}
              <p>You breach the maximum limit if your {word} is at or below the floor at any moment.</p>
            </>
          ) : (
            <p>The maximum drawdown rule is to be confirmed.</p>
          )}
        </Block>

        <Block title="Profit target, days and deadlines">
          {phase && target !== null ? (
            <>
              <Formula>
                {phase.name} target = {target}% × {formatUsd(size)} = {formatUsd((target / 100) * size)}
              </Formula>
              <p>
                The target is reached when your account value minus {formatUsd(size)} is at least that amount. Whether open (unrealized) profit
                counts toward the target is to be confirmed.
              </p>
              <p>
                {phase.name} needs {formatRule(phase.minTradingDays, (v) => `at least ${v} trading days`)} within{" "}
                {formatRule(phase.timeLimitDays, (v) => `${v} days`)}. What counts as a trading day is to be confirmed.
              </p>
            </>
          ) : (
            <p>The profit target is to be confirmed.</p>
          )}
        </Block>

        {futures && (
          <Block title="Leverage and liquidation">
            <p>
              Maximum leverage is {formatRule(p.maxLeverage, (v) => `${v}x`)}, and lower on higher-risk coins. {formatRule(p.liquidationRule)}.
            </p>
            <p>A liquidation loss counts toward both the daily and the maximum limit like any other loss.</p>
          </Block>
        )}

        <Block title="After a breach">
          <p>
            A breach means the rule has been violated. What happens next, including whether a failed attempt can be retried, is to be confirmed.
          </p>
        </Block>
      </div>
    </section>
  );
}
