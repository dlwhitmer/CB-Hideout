
import { db } from "../../../../../lib/db/db";
import { riftboundSingles } from "../../../../../lib/db/schema";
import { and, eq, like, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

   
    const type = searchParams.get("type") ?? "";
    const name =searchParams.get("name") ?? "";
    const rarity = searchParams.get("rarity") ?? "";
    const set = searchParams.get("set") ?? "";
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const pageSize = 10;

    const conditions = [];

    if (type) {
      conditions.push(like(riftboundSingles.type, `%${type}%`));
    }

    if (rarity) {
      conditions.push(eq(riftboundSingles.rarity, rarity));
    }

    if (set) {
      conditions.push(eq(riftboundSingles.set, set));
    }

    if (name) {
      conditions.push(like(riftboundSingles.name, `%${name}%`));
    }

    const where = conditions.length ? and(...conditions) : undefined;

    const rows = await db
      .select(getTableColumns(riftboundSingles))
      .from(riftboundSingles)
      .where(where)
      .orderBy(riftboundSingles.riftboundId)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalCount = await db
      .select({ id: riftboundSingles.id })
      .from(riftboundSingles)
      .where(where);

    return NextResponse.json({
      data: rows,
      total: totalCount.length,
      pageSize,
    });
  } catch (error) {
    console.error("RIFTBOUND SINGLES LIST ERROR:", error);

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
