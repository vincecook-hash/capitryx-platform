import type { ContactRequest } from "@/lib/validation";

/**
 * Where contact messages go (email provider, helpdesk, database...). None is configured yet, so the contact
 * form is shown as unavailable instead of pretending to send. Implement `send` and return it here to enable.
 */
export interface ContactSink {
  send(message: ContactRequest): Promise<void>;
}

export function getContactSink(): ContactSink | null {
  return null;
}
