
import { db } from "../../../../../lib/db/db";
import { onePieceSingles } from "../../../../../lib/db/schema";
import { and, eq, like, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") ?? "";
    const type = searchParams.get("cardType") ?? "";
    const rarity = searchParams.get("rarity") ?? "";
    const setId = searchParams.get("setId") ?? "";
    const colors = searchParams.get("cardColors") ?? "";
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const pageSize = 10;

    const conditions = [];

    if (type) {
      conditions.push(like(onePieceSingles.cardType, `%${type}%`));
    }

    if (colors) {
      conditions.push(like(onePieceSingles.cardColor, `%${colors}%`));
    }

    if (rarity) {
      conditions.push(eq(onePieceSingles.rarity, rarity));
    }

    if (setId) {
      conditions.push(eq(onePieceSingles.setId, setId));
    }

    if (search) {
      conditions.push(like(onePieceSingles.cardName, `%${search}%`));
    }

    const where = conditions.length ? and(...conditions) : undefined;

    const rows = await db
      .select(getTableColumns(onePieceSingles))
      .from(onePieceSingles)
      .where(where)
      .orderBy(onePieceSingles.cardSetId)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalCount = await db
      .select({ id: onePieceSingles.id })
      .from(onePieceSingles)
      .where(where);

    return NextResponse.json({
      data: rows,
      total: totalCount.length,
      pageSize,
    });
  } catch (error) {
    console.error("ONE PIECE SINGLES LIST ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load One Piece singles.",
      },
      { status: 500 }
    );
  }
}
