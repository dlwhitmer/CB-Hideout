import { db } from "../../../../../lib/db/db";
import { onePieceCards } from "../../../../../lib/db/schema";
import { and, asc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const offset = (page - 1) * limit;

    // ⭐ THIS IS WHAT YOUR DROPDOWN SENDS
    const set = searchParams.get("setId");

    const conditions = [];

    // ⭐ FILTER BY set_id (snake_case)
    if (set) {
      conditions.push(eq(onePieceCards.setId, set));


    }

    // ⭐ MAIN QUERY
    const rows = await db
      .select({
        cardImage: onePieceCards.cardImage,
        cardName: onePieceCards.cardName,
        cardSetId: onePieceCards.cardSetId,
        id: onePieceCards.id,
        setName: onePieceCards.setName,
      })
      .from(onePieceCards)
      .where(and(...conditions))
      .orderBy(asc(onePieceCards.cardSetId))
      .limit(limit)
      .offset(offset);

    // ⭐ TOTAL COUNT
    const totalRows = await db
      .select({ count: sql<number>`count(*)` })
      .from(onePieceCards)
      .where(and(...conditions));

    return NextResponse.json({
      data: rows,
      total: totalRows[0].count,
    });
  } catch (error) {
    console.error("ONE PIECE CARDS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load One Piece cards",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
