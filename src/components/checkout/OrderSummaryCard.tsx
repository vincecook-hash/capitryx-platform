import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatUsd } from "@/lib/utils";
import type { OrderSummary } from "@/types/order";

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2">
      <dt className="text-sm text-fg-muted">{label}</dt>
      <dd className={strong ? "tabular text-lg font-semibold" : "tabular text-sm font-medium"}>{value}</dd>
    </div>
  );
}

/** Presentational summary. The server recomputes every figure at checkout, so these are never trusted. */
export function OrderSummaryCard({ order, demo = true, children }: { order: OrderSummary; demo?: boolean; children?: React.ReactNode }) {
  return (
    <section aria-labelledby="summary-title" className="rounded-lg border border-line bg-bg-raised p-5 shadow-card sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 id="summary-title" className="text-base font-semibold">Order summary</h2>
        {demo && <Badge tone="demo">Demonstration price</Badge>}
      </div>

      <dl className="mt-4 divide-y divide-line">
        <Row label="Category" value={order.category === "spot" ? "Spot trading" : "Futures trading"} />
        <Row label="Program" value={order.programName} />
        <Row label="Evaluation size" value={formatUsd(order.accountSizeUsd)} />
        <Row label="Evaluation price" value={formatUsd(order.subtotalUsd)} />
        <Row label="Applicable charges" value={formatUsd(order.feesUsd)} />
        <Row label="Discount" value={order.discountUsd > 0 ? `−${formatUsd(order.discountUsd)}` : formatUsd(0)} />
        <Row label="Total due" value={formatUsd(order.totalUsd)} strong />
      </dl>

      <p className="mt-3 text-xs leading-relaxed text-fg-muted">
        Evaluation size is a notional figure, not a deposit into your account. Before paying you will be asked to accept the{" "}
        <Link href="/legal/terms" className="underline underline-offset-2 hover:text-fg">Terms</Link>,{" "}
        <Link href="/legal/refund-policy" className="underline underline-offset-2 hover:text-fg">Refund Policy</Link> and{" "}
        <Link href="/legal/risk-disclosure" className="underline underline-offset-2 hover:text-fg">Risk Disclosure</Link>.
      </p>

      {children && <div className="mt-5">{children}</div>}
    </section>
  );
}
