import { db } from "../../../../../lib/db/db";
import { magicCards } from "../../../../../lib/db/schema/magic_cards";
import { and, eq, like, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const bucket = searchParams.get("bucket") ?? "A-D";
  const type = searchParams.get("type") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const set = searchParams.get("set") ?? "";
  const colors = searchParams.get("colors") ?? "";
  const finishes = searchParams.get("finishes") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = 20;

  const conditions = [];

  if (type) {
    conditions.push(like(magicCards.frontTypeLine, `%${type}%`));
  }
  if (finishes) {
    conditions.push(like(magicCards.finishes, `%${finishes}%`));
  }
  if (colors) {
    conditions.push(like(magicCards.frontColors, `%${colors}%`));
  }
  if (rarity) {
    conditions.push(eq(magicCards.rarity, rarity));
  }
  if (set) {
    conditions.push(eq(magicCards.setCode, set));
  }

  // ⭐ ADD THIS — bucket filtering by setCode first letter


  const where = conditions.length ? and(...conditions) : undefined;

  const rows = await db
    .select()
    .from(magicCards)
    .where(where)
    .orderBy(magicCards.collectorNumber)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  const totalCount = await db.select().from(magicCards).where(where);

  return NextResponse.json({
    data: rows,
    total: totalCount.length,
    pageSize,
  });
}
