
import { db } from "../../../../../lib/db/db";
import { gundamSingles } from "../../../../../lib/db/schema";
import { and, eq, like, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") ?? "";
    const type = searchParams.get("cardType") ?? "";
    const rarity = searchParams.get("rarity") ?? "";
    const setCode = searchParams.get("setCode") ?? "";
    const colors = searchParams.get("cardColors") ?? "";
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const pageSize = 10;

    const conditions = [];

    if (type) {
      conditions.push(like(gundamSingles.cardType, `%${type}%`));
    }

    if (colors) {
      conditions.push(like(gundamSingles.colors, `%${colors}%`));
    }

    if (rarity) {
      conditions.push(eq(gundamSingles.rarity, rarity));
    }

    if (setCode) {
      conditions.push(eq(gundamSingles.setCode, setCode));
    }

    if (search) {
      conditions.push(like(gundamSingles.name, `%${search}%`));
    }

    const where = conditions.length ? and(...conditions) : undefined;

    const rows = await db
      .select(getTableColumns(gundamSingles))
      .from(gundamSingles)
      .where(where)
      .orderBy(gundamSingles.productId)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalCount = await db
      .select({ id: gundamSingles.id })
      .from(gundamSingles)
      .where(where);

    return NextResponse.json({
      data: rows,
      total: totalCount.length,
      pageSize,
    });
  } catch (error) {
    console.error("Gundam SINGLES LIST ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load Gundam singles.",
      },
      { status: 500 }
    );
  }
}
