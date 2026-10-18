import { NextResponse } from "next/server";
import { getMarketSnapshot } from "@/server/market-data";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!rateLimit(`market:${ip}`, 60)) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const snapshot = await getMarketSnapshot();
  return NextResponse.json(snapshot, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
}
