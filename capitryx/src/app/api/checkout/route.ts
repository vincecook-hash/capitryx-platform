import { NextResponse } from "next/server";
import { checkoutRequestSchema } from "@/lib/validation";
import { buildOrderSummary } from "@/lib/pricing";
import { getPaymentProvider } from "@/server/payments";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`checkout:${ip}`)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const parsed = checkoutRequestSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const order = buildOrderSummary(parsed.data.programId); // price computed server-side
  if (!order) return NextResponse.json({ error: "Unknown program" }, { status: 404 });

  const provider = getPaymentProvider();
  if (!provider) return NextResponse.json({ error: "Payments not configured" }, { status: 503 });

  const session = await provider.createCheckoutSession(order, parsed.data.email);
  return NextResponse.json({ redirectUrl: session.redirectUrl });
}
