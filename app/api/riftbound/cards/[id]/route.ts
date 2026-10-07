import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { riftboundCards } from "../../../../../lib/db/schema";
import { mapRiftBoundCardToDB } from "../../../../../lib/mappers/riftbound_cards";

export async function POST(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;

  // Fetch single card from Riftbound API
  const res = await fetch(`https://api.rifthunt.com/cards/${id}`, {
    headers: { "User-Agent": "DanTCG-App/1.0" },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Card ${id} not found in Riftbound API` },
      { status: 404 }
    );
  }

  const card = await res.json();

  // Map card to DB format
  const mapped = mapRiftBoundCardToDB(card);

  // Insert into DB
  const inserted = await db.insert(riftboundCards).values(mapped).returning();

  return NextResponse.json({ data: inserted[0] });
}
