import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { onePieceCards } from "../../../../../lib/db/schema";
import { mapOnePieceCardToDB } from "../../../../../lib/mappers/onepiece_cards";

export async function POST(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;   // id = "ST01-016"

  // Fetch ALL cards
  const res = await fetch("https://www.optcgapi.com/api/allSTCards/", {
    headers: { "User-Agent": "DanTCG-App/1.0" },
  });

  const json = await res.json();

  if (!Array.isArray(json.data)) {
    return NextResponse.json(
      { error: "Invalid API response" },
      { status: 500 }
    );
  }

  // ⭐ Find the card by card_set_id
  const card = json.data.find(c => c.card_set_id === id);

  if (!card) {
    return NextResponse.json(
      { error: `Card ${id} not found` },
      { status: 404 }
    );
  }

  // Map card to DB format
  const mapped = mapOnePieceCardToDB(card);

  // Insert into DB
  const inserted = await db.insert(onePieceCards).values(mapped).returning();

  return NextResponse.json({ data: inserted[0] });
}
