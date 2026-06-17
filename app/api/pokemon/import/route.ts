import { db } from "@/lib/db";
import { mapPokemonToDB } from "@/lib/mappers/pokemon";
import { NextResponse } from "next/server";
import { pokemonCards } from "@/lib/db/schema/pokemon";
import { eq } from "drizzle-orm";


export async function POST(req: Request) {
  console.log("1. Route hit");

  try {
    const body = await req.json();
    console.log("2. Body:", body);

    const { pokemon_id, price, flavorText } = body;

    console.log("3. Fetching Pokemon card:", pokemon_id);

    const res = await fetch(
      `https://api.pokemontcg.io/v2/cards/${pokemon_id}`
    );

    console.log("4. status:", res.status);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Card not found" },
        { status: 404 }
      );
    }
    const json = await res.json();
    const card = json.data;

    console.log("5. Card loaded");

    const mapped = mapPokemonToDB(card);

    // Apply overrides
    mapped.price = Number(price || mapped.price || 0);
    mapped.flavorText = card.flavorText || "";

    console.log("6. Mapped");

    // ⭐⭐⭐ THIS IS WHERE YOUR NEW CODE GOES ⭐⭐⭐

    // 1. Check if card already exists
    const existing = await db
      .select()
      .from(pokemonCards)
      .where(eq(pokemonCards.pokemonId, mapped.pokemonId));

    if (existing.length > 0) {
      // 2. Card exists → increment quantity
      await db
        .update(pokemonCards)
        .set({ quantity: existing[0].quantity + 1 })
        .where(eq(pokemonCards.id, existing[0].id));

      return NextResponse.json({
        success: true,
        updated: true,
        quantity: existing[0].quantity + 1,
      });
    }

    // 3. Card does NOT exist → insert with quantity = 1
    console.log("7. About to insert into DB");

    await db.insert(pokemonCards).values({
      ...mapped,
      quantity: 1, // ⭐ REQUIRED
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

