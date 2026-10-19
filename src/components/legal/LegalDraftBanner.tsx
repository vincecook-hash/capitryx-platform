import { Badge } from "@/components/ui/Badge";

export function LegalDraftBanner() {
  return (
    <div role="note" className="mt-5 rounded-lg border border-amber-400/40 bg-bg-sunken p-4">
      <Badge tone="demo">Draft</Badge>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">
        This document is a draft for legal review and is not in force. Text in{" "}
        <mark className="rounded bg-amber-400/20 px-1 text-amber-200">[brackets]</mark> is a placeholder that must be completed before launch.
      </p>
    </div>
  );
}
