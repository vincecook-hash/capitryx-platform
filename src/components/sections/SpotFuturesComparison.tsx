import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { buildComparison, COMPARISON_SIZE_LABEL } from "@/lib/comparison";

/** Concepts are written once; every number comes from the program config via buildComparison(). */
export function SpotFuturesComparison() {
  const rows = buildComparison();
  return (
    <section id="compare" aria-labelledby="compare-title" className="scroll-mt-24 pt-16 sm:pt-24">
      <Container>
        <SectionHeader
          id="compare-title"
          title="Spot or futures: what changes"
          intro="Both categories test your trading discipline, but they work differently. Futures adds leverage, funding costs and liquidation risk that spot does not have."
        />

        {/* Phones: one card per topic so the two sides sit next to each other without scrolling sideways */}
        <ul className="mt-10 space-y-3 md:hidden">
          {rows.map((r) => (
            <li key={r.label} className="rounded-lg border border-line bg-bg-raised p-4">
              <h3 className="text-sm font-semibold">{r.label}</h3>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-fg-muted">Spot</dt>
                  <dd className="mt-0.5 break-words">{r.spot}</dd>
                </div>
                <div>
                  <dt className="text-xs text-fg-muted">Futures</dt>
                  <dd className="mt-0.5 break-words">{r.futures}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <div className="mt-10 hidden overflow-x-auto rounded-lg border border-line bg-bg-raised md:block">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Spot trading compared with futures trading</caption>
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-fg-muted">
                <th scope="col" className="w-1/4 px-5 py-3 font-medium">Topic</th>
                <th scope="col" className="w-[37.5%] px-5 py-3 font-medium">Spot trading</th>
                <th scope="col" className="w-[37.5%] px-5 py-3 font-medium">Futures trading</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-line align-top last:border-0">
                  <th scope="row" className="px-5 py-4 font-medium">{r.label}</th>
                  <td className="px-5 py-4 text-fg-muted">{r.spot}</td>
                  <td className="px-5 py-4 text-fg-muted">{r.futures}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-fg-muted">
          Exact product mechanics depend on the selected program and trading environment. Figures use the {COMPARISON_SIZE_LABEL} demonstration
          programs and are placeholders until confirmed.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/programs?category=spot" variant="secondary">View spot programs</ButtonLink>
          <ButtonLink href="/programs?category=futures" variant="secondary">View futures programs</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
