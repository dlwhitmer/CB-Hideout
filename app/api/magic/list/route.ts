import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as magic from "@/lib/db/schema/magic";
import { eq, like, and, sql } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);
    const pageSize = 20;

    const rarity = searchParams.get("rarity");
    const type = searchParams.get("type");

    const offset = (page - 1) * pageSize;

    const conditions = [];

    if (rarity) {
      conditions.push(eq(magic.magicCards.rarity, rarity));
    }

    if (type) {
      conditions.push(like(magic.magicCards.typeLine, `%${type}%`));
    }

    const rows = await db
      .select()
      .from(magic.magicCards)
      .where(conditions.length ? and(...conditions) : undefined)
      .limit(pageSize)
      .offset(offset);

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(magic.magicCards)
      .where(conditions.length ? and(...conditions) : undefined);

    const total = totalResult[0]?.count ?? 0;

    return NextResponse.json({
      page,
      pageSize,
      total,
      rows,
    });
  } catch (err: any) {
    console.error("MAGIC LIST API ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}