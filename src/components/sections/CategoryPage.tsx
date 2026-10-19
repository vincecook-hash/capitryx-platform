import { SpotFuturesComparison } from "@/components/sections/SpotFuturesComparison";
import { FinalCta } from "@/components/sections/FinalCta";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { categoryPages } from "@/config/category-pages";
import { summarizeCategory } from "@/lib/category-summary";
import { formatSizeShort, formatUsd } from "@/lib/utils";
import type { TradingCategory } from "@/types/program";

/** Long values (for example the funding description) take two columns so they read on one or two lines. */
function Stat({ label, value }: { label: string; value: string }) {
  const wide = value.length > 24;
  return (
    <div className={wide ? "col-span-2 min-w-0 rounded-lg border border-line bg-bg-raised p-4" : "min-w-0 rounded-lg border border-line bg-bg-raised p-4"}>
      <dt className="text-xs text-fg-muted">{label}</dt>
      <dd className="mt-1 break-words text-base font-semibold sm:text-lg">{value}</dd>
    </div>
  );
}

/** Landing page for one category. Every number is read from the program config and asset catalog. */
export function CategoryPage({ category }: { category: TradingCategory }) {
  const c = categoryPages[category];
  const s = summarizeCategory(category);
  const futures = category === "futures";
  const name = futures ? "futures" : "spot";

  const stats: Array<[string, string]> = [
    ["Evaluation sizes", `$${formatSizeShort(s.sizeMinUsd)} to $${formatSizeShort(s.sizeMaxUsd)}`],
    ["Prices (demonstration)", `${formatUsd(s.priceMinUsd)} to ${formatUsd(s.priceMaxUsd)}`],
    ["Phases", String(s.phaseCount)],
    ["Phase 1 profit target", s.phase1TargetPct === null ? "To be confirmed" : `${s.phase1TargetPct}%`],
    ["Daily drawdown limit", s.dailyPct === null ? "To be confirmed" : `${s.dailyPct}%`],
    ["Maximum drawdown", s.maxPct === null ? "To be confirmed" : `${s.maxPct}%`],
    ["Trading fees", s.fees ?? "To be confirmed"],
    ["Leverage", futures ? (s.maxLeverage === null ? "To be confirmed" : `Up to ${s.maxLeverage}x`) : "None (spot)"],
    ["Funding costs", futures ? (s.funding ?? "To be confirmed") : "None (spot)"],
    [futures ? "Perpetual pairs" : "Spot pairs", String(s.pairCount)],
  ];

  return (
    <main id="main">
      <section aria-labelledby="cat-title" className="bg-grid border-b border-line">
        <Container className="py-12 sm:py-16">
          <div className="flex flex-wrap gap-2">
            <Badge tone="accent">{futures ? "Futures trading" : "Spot trading"}</Badge>
            <Badge tone="demo">Demonstration programs</Badge>
          </div>
          <h1 id="cat-title" className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{c.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/programs?category=${category}`} size="lg">View {name} programs</ButtonLink>
            <ButtonLink href={`/trading-rules?category=${category}`} size="lg" variant="secondary">Read the {name} rules</ButtonLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="glance-title" className="pt-16 sm:pt-20">
        <Container>
          <SectionHeader id="glance-title" title="At a glance" intro={`Numbers for ${s.referenceProgramName}. They are placeholders until Capitryx confirms its real terms.`} />
          <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {stats.map(([label, value]) => (
              <Stat key={label} label={label} value={value} />
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="fit-title" className="pt-16 sm:pt-24">
        <Container>
          <SectionHeader id="fit-title" title={`Is ${name} right for you?`} />
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="min-w-0 rounded-lg border border-line bg-bg-raised p-5">
              <h3 className="text-base font-semibold">It may suit you if you are</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg-muted">
                {c.suits.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 rounded-lg border border-line-strong bg-bg-sunken p-5">
              <h3 className="text-base font-semibold">What to watch for</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-fg-muted">
                {c.watch.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="markets-title" className="pt-16 sm:pt-24">
        <Container>
          <SectionHeader
            id="markets-title"
            title="Supported markets"
            intro={`${s.pairCount} ${futures ? "perpetual" : "spot"} pairs quoted in USDT, grouped by risk tier. New coins are added as they are approved.`}
          />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.tiers.map((t) => (
              <li key={t.tier} className={t.tier === "high_volatility" ? "min-w-0 rounded-lg border border-line-strong bg-bg-sunken p-5" : "min-w-0 rounded-lg border border-line bg-bg-raised p-5"}>
                <h3 className="text-base font-semibold">{t.label}</h3>
                <p className="tabular mt-1 text-sm text-fg-muted">{t.count} pairs</p>
                <p className="mt-3 text-sm">{t.examples.join(", ")}{t.count > t.examples.length ? ", …" : ""}</p>
                {t.tier === "high_volatility" && (
                  <p className="mt-3 text-xs leading-relaxed text-fg-muted">Includes meme coins. Sharp moves and thin liquidity are common.</p>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <ButtonLink href={`/programs?category=${category}`} variant="secondary">Browse every {name} pair</ButtonLink>
          </div>
        </Container>
      </section>

      <SpotFuturesComparison />
      <FinalCta />
    </main>
  );
}
