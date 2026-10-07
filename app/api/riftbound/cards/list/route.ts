import { db } from "../../../../../lib/db/db";
import { riftboundCards } from "../../../../../lib/db/schema";
import { eq, sql } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const setCode = searchParams.get("set");
  const page = Number(searchParams.get("page") ?? "1");

  if (!setCode) {
    return Response.json({ data: [], total: 0 });
  }

  const pageSize = 30;
  const offset = (page - 1) * pageSize;

  // Correct COUNT(*) query
  const totalRow = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(riftboundCards)
    .where(eq(riftboundCards.set, setCode))
    .get();

  const total = totalRow.count;

  // Fetch paginated cards
  const cards = await db
    .select()
    .from(riftboundCards)
    .where(eq(riftboundCards.set, setCode))
    .limit(pageSize)
    .offset(offset);

  return Response.json({
    data: cards,
    total,
  });
}
