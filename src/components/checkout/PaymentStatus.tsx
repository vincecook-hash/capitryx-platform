import { AlertTriangle, CheckCircle2, Clock, HelpCircle, XCircle, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import type { PaymentState } from "@/lib/order-status";

const content: Record<PaymentState, { icon: LucideIcon; title: string; text: string; tone: string; role: "status" | "alert" }> = {
  confirmed: { icon: CheckCircle2, title: "Payment confirmed", text: "Your payment has been confirmed. Thank you.", tone: "text-gain", role: "status" },
  pending: {
    icon: Clock,
    title: "Payment pending",
    text: "We have not received confirmation of your payment yet. This can take a few minutes. Please do not pay again. Check back shortly, or contact us if it takes longer.",
    tone: "text-accent-text",
    role: "status",
  },
  cancelled: {
    icon: XCircle,
    title: "Checkout cancelled",
    text: "You left checkout before paying. If you think you were charged, please contact us.",
    tone: "text-fg-muted",
    role: "status",
  },
  failed: {
    icon: AlertTriangle,
    title: "Payment did not go through",
    text: "Your payment was not completed. You can choose a program and try again, or contact us if you need help.",
    tone: "text-loss",
    role: "alert",
  },
  unknown: {
    icon: HelpCircle,
    title: "We cannot confirm this payment",
    text: "We could not find a confirmed payment for this link. If you paid, please wait a few minutes and then contact us with your receipt.",
    tone: "text-fg-muted",
    role: "status",
  },
};

export function PaymentStatus({ state, orderRef }: { state: PaymentState; orderRef?: string }) {
  const c = content[state];
  const Icon = c.icon;
  return (
    <div className="max-w-xl">
      <div role={c.role} className="rounded-lg border border-line bg-bg-raised p-6 sm:p-8">
        <Icon aria-hidden size={32} className={c.tone} />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">{c.title}</h1>
        <p className="mt-3 leading-relaxed text-fg-muted">{c.text}</p>
        {orderRef && state !== "unknown" && <p className="tabular mt-4 break-all font-mono text-xs text-fg-muted">Reference: {orderRef}</p>}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/programs">{state === "confirmed" ? "Explore programs" : "Choose a program"}</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">Contact us</ButtonLink>
        </div>
      </div>
    </div>
  );
}
