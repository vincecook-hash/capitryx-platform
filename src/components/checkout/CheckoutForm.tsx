"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { checkoutRequestSchema } from "@/lib/validation";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "unavailable" }
  | { kind: "error"; message: string };

const MESSAGES: Record<number, string> = {
  400: "Please check your details and try again.",
  404: "This program is no longer available. Please choose another.",
  429: "Too many attempts. Please wait a minute and try again.",
};

/**
 * Sends only the program id, email and consent. The server looks up the price itself,
 * and an order is only ever paid after the payment provider confirms it.
 */
export function CheckoutForm({ programId }: { programId: string }) {
  const emailId = useId();
  const termsId = useId();
  const errId = useId();
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = checkoutRequestSchema.safeParse({ programId, email: email.trim(), acceptedTerms: accepted });
    if (!parsed.success) {
      const emailBad = parsed.error.issues.some((i) => i.path[0] === "email");
      setFieldError(emailBad ? "Enter a valid email address." : "Please accept the terms to continue.");
      return;
    }
    setFieldError(null);
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      if (res.status === 503) return setState({ kind: "unavailable" });
      if (!res.ok) return setState({ kind: "error", message: MESSAGES[res.status] ?? "Something went wrong. Please try again." });
      const { redirectUrl } = (await res.json()) as { redirectUrl?: string };
      if (!redirectUrl) return setState({ kind: "error", message: "Something went wrong. Please try again." });
      window.location.assign(redirectUrl);
    } catch {
      setState({ kind: "error", message: "We could not reach the server. Check your connection and try again." });
    }
  }

  const busy = state.kind === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor={emailId} className="text-sm font-medium">Email address</label>
        <input
          id={emailId}
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={fieldError ? true : undefined}
          aria-describedby={fieldError ? errId : undefined}
          className="mt-2 h-12 w-full rounded border border-line-strong bg-bg-sunken px-3 text-base"
        />
      </div>

      <div className="flex items-start gap-3">
        <input id={termsId} type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[var(--cx-accent)]" />
        <label htmlFor={termsId} className="text-sm leading-relaxed text-fg-muted">
          I have read and accept the <Link href="/legal/terms" className="underline underline-offset-2 hover:text-fg">Terms</Link>,{" "}
          <Link href="/legal/refund-policy" className="underline underline-offset-2 hover:text-fg">Refund Policy</Link> and{" "}
          <Link href="/legal/risk-disclosure" className="underline underline-offset-2 hover:text-fg">Risk Disclosure</Link>.
        </label>
      </div>

      {fieldError && <p id={errId} role="alert" className="text-sm text-loss">{fieldError}</p>}

      <Button type="submit" size="lg" className="w-full" disabled={busy}>
        {busy ? "Processing…" : "Continue to payment"}
      </Button>

      <div role="status" aria-live="polite">
        {state.kind === "unavailable" && (
          <p className="rounded border border-line-strong bg-bg-sunken p-3 text-sm text-fg-muted">
            Online payments are not enabled yet, so nothing was charged. Please check back soon.
          </p>
        )}
        {state.kind === "error" && <p className="rounded border border-loss/40 bg-bg-sunken p-3 text-sm text-loss">{state.message}</p>}
      </div>
    </form>
  );
}
