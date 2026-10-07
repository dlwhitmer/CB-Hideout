import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { lorcanaCards } from "../../../../../lib/db/schema";
import { mapLorcanaCardToDB } from "../../../../../lib/mappers/lorcana_cards";

export async function POST(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;

  // Fetch card from GCG API
  const res = await fetch(`https://api.gcgapi.com/v1/cards/${id}`, {
    headers: { "User-Agent": "DanTCG-App/1.0" },
  });

  const json = await res.json();

  if (!json.data) {
    return NextResponse.json(
      { error: "Card not found in GCG API" },
      { status: 404 }
    );
  }

  // Map card to DB format
  const mapped = mapLorcanaCardToDB(json.data);

  // Insert into DB
  const inserted = await db.insert(lorcanaCards).values(mapped).returning();

  return NextResponse.json({ data: inserted[0] });
}
