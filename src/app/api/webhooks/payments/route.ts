import { NextResponse } from "next/server";
import { getPaymentProvider } from "@/server/payments";

export async function POST(req: Request) {
  const provider = getPaymentProvider();
  if (!provider) return NextResponse.json({ error: "Payments not configured" }, { status: 503 });
  const event = await provider.verifyWebhook(await req.text(), req.headers.get("x-signature"));
  if (!event) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  // TODO: persist order status transition (idempotent) using event.providerRef
  return NextResponse.json({ received: true });
}
