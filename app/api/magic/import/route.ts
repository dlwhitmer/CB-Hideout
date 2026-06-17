import { db } from "@/lib/db";
import { mapScryfallToDB } from "@/lib/mappers/magic";
import { NextResponse } from "next/server";
import { magicCards } from "@/lib/db/schema/magic";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  console.log("1. Route hit");

  try {
    const body = await req.json();
    console.log("2. Body:", body);

    const { scryfall_id, price, oracle_text } = body;

    console.log("3. Fetching Magic card:", scryfall_id);

    // ⭐ Correct API for Magic
    console.log("FETCH EXISTS:", typeof fetch);

    const res = await fetch(`https://api.scryfall.com/cards/${scryfall_id}`, {
  headers: {
    "User-Agent": "HideoutMagicImporter/1.0 (https://example.com)",
  },
});

    if (!res.ok) {
      return NextResponse.json(
        { error: "Card not found on Scryfall" },
        { status: 404 },
      );
    }
    console.log("STATUS:", res.status);

    const card = await res.json();
    console.log("CARD FROM SCRYFALL:", card);

    // ⭐ Scryfall does NOT wrap in "data"
    // ⭐ Scryfall does NOT wrap in "data"
    // const card = await res.json();

    console.log("CARD FROM SCRYFALL:", card);

    const mapped = mapScryfallToDB(card);

    // Apply overrides
    mapped.price = Number(price || mapped.price || 0);
    mapped.oracleText = oracle_text || mapped.oracleText || "";

    console.log("6. Mapped");

    // ⭐⭐⭐ Duplicate handling (same as Pokémon) ⭐⭐⭐

    // 1. Check if card already exists
    const existing = await db
      .select()
      .from(magicCards)
      .where(eq(magicCards.scryfallId, mapped.scryfallId));

    if (existing.length > 0) {
      // 2. Card exists → increment quantity
      await db
        .update(magicCards)
        .set({ quantity: existing[0].quantity + 1 })
        .where(eq(magicCards.id, existing[0].id));

      return NextResponse.json({
        success: true,
        updated: true,
        quantity: existing[0].quantity + 1,
      });
    }

    // 3. Card does NOT exist → insert with quantity = 1
    console.log("7. About to insert into DB");

    await db.insert(magicCards).values({
      ...mapped,
      quantity: 1,
    });

    console.log("8. DB insert complete");

    return NextResponse.json({
      success: true,
      inserted: true,
      quantity: 1,
    });
  } catch (err: any) {
    console.error("🔥 IMPORT FAILED:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
