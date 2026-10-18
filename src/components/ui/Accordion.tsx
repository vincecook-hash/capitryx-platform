"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

/**
 * WAI-ARIA accordion: each header is a real button with aria-expanded/aria-controls and the panel is a
 * labelled region. Several panels can be open at once. Works with keyboard (Tab, Enter, Space).
 */
export function Accordion({ items, idPrefix, headingLevel = 3 }: { items: AccordionItem[]; idPrefix: string; headingLevel?: 2 | 3 }) {
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const Heading = headingLevel === 2 ? "h2" : "h3";

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-bg-raised">
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const buttonId = `${idPrefix}-button-${item.id}`;
        const panelId = `${idPrefix}-panel-${item.id}`;
        const Icon = isOpen ? Minus : Plus;
        return (
          <div key={item.id}>
            <Heading>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-4 text-left text-base font-medium transition-colors ease-cx hover:bg-bg-sunken/60 sm:px-6"
              >
                <span className="min-w-0">{item.title}</span>
                <Icon aria-hidden size={18} className="shrink-0 text-fg-muted" />
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="px-4 pb-5 sm:px-6">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
