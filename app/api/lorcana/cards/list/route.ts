import { db } from "../../../../../lib/db/db";
import { SelectLorcanaCard } from "../../../../../lib/db/schema";
import { lorcanaCards } from "../../../../../lib/db/schema";

import { and, eq, like } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const SetID = searchParams.get("SetID") ?? "";
  const Type = searchParams.get("Type") ?? "";
  const Rarity = searchParams.get("Rarity") ?? "";
  const Color = searchParams.get("Color") ?? "";
  const CardNum = searchParams.get("CardNum") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = 20;

  const conditions = [];

  if (SetID) {
    conditions.push(eq(lorcanaCards.SetID, SetID));
  }

  if (Type) {
    conditions.push(like(lorcanaCards.Type, `%${Type}%`));
  }

  if (Color) {
    conditions.push(like(lorcanaCards.Color, `%${Color}%`));
  }

  if (CardNum) {
    conditions.push(like(lorcanaCards.CardNum, `%${CardNum}%`));
  }

  if (Rarity) {
    conditions.push(eq(lorcanaCards.Rarity, Rarity));
  }

  const where = conditions.length ? and(...conditions) : undefined;

  const allRows = await db
    .select()
    .from(lorcanaCards)
    .where(where)
    .orderBy(lorcanaCards.SetID, lorcanaCards.CardNum);

  const uniqueCards = Object.values(
    allRows.reduce((acc, card) => {
      if (!acc[card.UniqueID]) acc[card.UniqueID] = card;
      return acc;
    }, {}),
  );

  const total = uniqueCards.length;

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedCards = uniqueCards.slice(start, end);

  return NextResponse.json({
    data: paginatedCards,
    total,
    pageSize,
  });
}
