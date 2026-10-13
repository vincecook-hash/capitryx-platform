import type { PaymentProvider } from "./provider";
// No provider configured yet. Orders must NEVER be marked paid without verified confirmation.
export function getPaymentProvider(): PaymentProvider | null { return null; }
