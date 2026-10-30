
import { db } from "../../../../../lib/db/db";
import { lorcanaSingles } from "../../../../../lib/db/schema";
import { and, eq, like, getTableColumns } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") ?? "";
    const Type = searchParams.get("Type") ?? "";
    const Rarity = searchParams.get("Rarity") ?? "";
    const SetId = searchParams.get("SetId") ?? "";
    const Color = searchParams.get("Color") ?? "";
    const UniqueId=searchParams.get("UniqueId") ?? "";
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const pageSize = 10;

    const conditions = [];

    if (Type) {
      conditions.push(like(lorcanaSingles.Type, `%${Type}%`));
    }

    if (Color) {
      conditions.push(like(lorcanaSingles.Color, `%${Color}%`));
    }

    if (Rarity) {
      conditions.push(eq(lorcanaSingles.Rarity, Rarity));
    }

    if (SetId) {
      conditions.push(eq(lorcanaSingles.SetId, SetId));
    }
   
    if (UniqueId) {
      conditions.push(eq(lorcanaSingles.UniqueId, UniqueId));
    }

    if (search) {
      conditions.push(like(lorcanaSingles.Name, `%${search}%`));
    }

    const where = conditions.length ? and(...conditions) : undefined;

    const rows = await db
      .select(getTableColumns(lorcanaSingles))
      .from(lorcanaSingles)
      .where(where)
      .orderBy(lorcanaSingles.UniqueId)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalCount = await db
      .select({ id: lorcanaSingles.id })
      .from(lorcanaSingles)
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
            : "Failed to load Lorcana singles.",
      },
      { status: 500 }
    );
  }
}
