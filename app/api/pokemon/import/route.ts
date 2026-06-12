import { db } from "@/lib/db";
import { mapPokemonToDB } from "@/lib/mappers/pokemon";
import { NextResponse } from "next/server";
import { pokemonCards } from "@/lib/db/schema/pokemon";

export async function POST(req: Request) {
  console.log("1. Route hit");

  try {
    const body = await req.json();
    console.log("2. Body:", body);

    const { pokemon_id, price, flavor_text } = body;

    console.log("3. Fetching Pokemon card:", pokemon_id);

    const res = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=id:${pokemon_id}`,
    );

    console.log("4. status:", res.status);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Card not found on Pokemon API" },
        { status: 404 },
      );
    }

    const json = await res.json();
    const card = Array.isArray(json.data) ? json.data[0] : null;

    if (!card) {
      console.log("❌ No card returned:", json);
      return NextResponse.json(
        { error: "Invalid card response from API" },
        { status: 404 },
      );
    }

    console.log("5. Card loaded");

    const mapped = mapPokemonToDB(card);

    console.log("6. Mapped");

    // overrides
    mapped.price = Number(price || mapped.price || 0);
    mapped.flavorText = flavor_text || "";

    console.log("7. About to insert into DB");

    await db.insert(pokemonCards).values(mapped);

    console.log("8. DB insert complete");

    return NextResponse.json({
      success: true,
      card: mapped.name,
    });
  } catch (err: any) {
    console.error("🔥 IMPORT FAILED:", err);

    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
