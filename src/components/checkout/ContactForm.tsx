"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { contactRequestSchema } from "@/lib/validation";

type State = { kind: "idle" } | { kind: "submitting" } | { kind: "sent" } | { kind: "unavailable" } | { kind: "error"; message: string };
type Errors = Partial<Record<"name" | "email" | "message" | "privacy", string>>;

const MESSAGES: Record<number, string> = {
  400: "Please check your details and try again.",
  429: "Too many messages. Please wait a few minutes and try again.",
};

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <div className="mt-2">{children}</div>
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-loss">{error}</p>}
    </div>
  );
}

const input = "w-full rounded border border-line-strong bg-bg-sunken px-3 text-base";

/** `enabled` is false until a message destination exists, so visitors are never told a message was sent when it was not. */
export function ContactForm({ enabled }: { enabled: boolean }) {
  const uid = useId();
  const ids = { name: `${uid}-name`, email: `${uid}-email`, message: `${uid}-message`, privacy: `${uid}-privacy` };
  const [values, setValues] = useState({ name: "", email: "", message: "", company: "" });
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = contactRequestSchema.safeParse({ name: values.name, email: values.email, message: values.message, acceptedPrivacy: accepted });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (key === "name") next.name = "Please enter your name.";
        if (key === "email") next.email = "Enter a valid email address.";
        if (key === "message") next.message = "Please write at least 10 characters (up to 2000).";
        if (key === "acceptedPrivacy") next.privacy = "Please confirm you have read the Privacy Policy.";
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...parsed.data, company: values.company }) });
      if (res.status === 503) return setState({ kind: "unavailable" });
      if (!res.ok) return setState({ kind: "error", message: MESSAGES[res.status] ?? "Something went wrong. Please try again." });
      setState({ kind: "sent" });
    } catch {
      setState({ kind: "error", message: "We could not reach the server. Check your connection and try again." });
    }
  }

  if (state.kind === "sent") {
    return (
      <div role="status" className="rounded-lg border border-gain/40 bg-bg-sunken p-5">
        <p className="font-medium">Message sent</p>
        <p className="mt-1 text-sm text-fg-muted">Thank you. We will reply by email.</p>
      </div>
    );
  }

  const busy = state.kind === "submitting";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {!enabled && (
        <p role="note" className="rounded border border-line-strong bg-bg-sunken p-3 text-sm text-fg-muted">
          Messaging is not switched on yet, so this form cannot send anything right now.
        </p>
      )}

      <Field id={ids.name} label="Your name" error={errors.name}>
        <input id={ids.name} type="text" autoComplete="name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? `${ids.name}-error` : undefined} className={`${input} h-12`} />
      </Field>
      <Field id={ids.email} label="Email address" error={errors.email}>
        <input id={ids.email} type="email" autoComplete="email" inputMode="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? `${ids.email}-error` : undefined} className={`${input} h-12`} />
      </Field>
      <Field id={ids.message} label="Message" error={errors.message}>
        <textarea id={ids.message} rows={6} value={values.message} onChange={(e) => setValues({ ...values, message: e.target.value })} aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? `${ids.message}-error` : undefined} className={`${input} py-3`} />
      </Field>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={(e) => setValues({ ...values, company: e.target.value })} />
        </label>
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input id={ids.privacy} type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} aria-describedby={errors.privacy ? `${ids.privacy}-error` : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[var(--cx-accent)]" />
          <label htmlFor={ids.privacy} className="text-sm leading-relaxed text-fg-muted">
            I have read the <Link href="/legal/privacy" className="underline underline-offset-2 hover:text-fg">Privacy Policy</Link> and agree to you using my details to reply.
          </label>
        </div>
        {errors.privacy && <p id={`${ids.privacy}-error`} role="alert" className="mt-1.5 text-sm text-loss">{errors.privacy}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={busy || !enabled}>
        {busy ? "Sending…" : "Send message"}
      </Button>

      <div role="status" aria-live="polite">
        {state.kind === "unavailable" && <p className="rounded border border-line-strong bg-bg-sunken p-3 text-sm text-fg-muted">Messaging is not switched on yet, so nothing was sent.</p>}
        {state.kind === "error" && <p className="rounded border border-loss/40 bg-bg-sunken p-3 text-sm text-loss">{state.message}</p>}
      </div>
    </form>
  );
}
