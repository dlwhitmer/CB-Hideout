import { db } from "@/lib/db";
import { yugiohCards } from "@/lib/db/schema/yugioh";
import { eq, like, and, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  const race = searchParams.get("race");
  const attribute = searchParams.get("attribute");
  const archetype = searchParams.get("archetype");

  const page = Number(searchParams.get("page") ?? 1);
  const limit = Number(searchParams.get("limit") ?? 20);
  const offset = (page - 1) * limit;

  const conditions = [];

  if (type) conditions.push(like(yugiohCards.type, `%${type}%`));
  if (race) conditions.push(like(yugiohCards.race, `%${race}%`));
  if (attribute) conditions.push(eq(yugiohCards.attribute, attribute));
  if (archetype) conditions.push(eq(yugiohCards.archetype, archetype));

  const rows = await db
    .select()
    .from(yugiohCards)
    .where(conditions.length ? and(...conditions) : undefined)
    .limit(limit)
    .offset(offset);

  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(yugiohCards)
    .where(conditions.length ? and(...conditions) : undefined);

  return NextResponse.json({
    rows,
    total: totalResult[0].count,
  });
}
