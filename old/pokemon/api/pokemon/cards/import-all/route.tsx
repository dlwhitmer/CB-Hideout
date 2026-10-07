import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { pokemonSets } from "../../../../../lib/db/schema/pokemon_sets";
import { pokemonCards } from "../../../../../lib/db/schema/pokemon_cards";
import { mapPokemonCardToDB } from "../../../../../lib/mappers/pokemon_cards";

export async function POST() {
  try {
    let totalImported = 0;

    const sets = await db.select().from(pokemonSets);

    for (const set of sets) {
      const res = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=set.id:${set.set_id}`,
        {
          headers: {
            "X-Api-Key": process.env.POKEMON_TCG_API_KEY!,
            Accept: "application/json",
          },
        },
      );

      const json = await res.json();
      const cards = json.data;

      if (!json.data) continue;

      for (const card of json.data) {
        const mapped = mapPokemonCardToDB(card);

        mapped.set_id = set.set_id; // Associate card with the correct set
        delete mapped.createdAt;

        await db.insert(pokemonCards).values(mapped);

        console.log("INSERTED:", card.name);
        totalImported++;
      }
    }

    return NextResponse.json({ success: true, imported: totalImported });
  } catch (err: any) {
    console.error("IMPORT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
