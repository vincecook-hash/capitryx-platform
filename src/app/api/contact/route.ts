import { NextResponse } from "next/server";
import { contactRequestSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { getContactSink } from "@/server/contact";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60_000)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const body: unknown = await req.json().catch(() => null);

  // Honeypot: real visitors never see or fill this field; bots do. Pretend success and drop it.
  if (body && typeof body === "object" && "company" in body && typeof body.company === "string" && body.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactRequestSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const sink = getContactSink();
  if (!sink) return NextResponse.json({ error: "Messaging not configured" }, { status: 503 });

  await sink.send(parsed.data);
  return NextResponse.json({ ok: true });
}
