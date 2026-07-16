import { db } from "../../../../../lib/db/db";
import { pokemonSingles } from "../../../../../lib/db/schema/pokemon";
import { eq } from "drizzle-orm";
import { mapPokemonSingleToDB } from "../../../../../lib/mappers/pokemon";

export async function POST(req: Request) {
  try {
    const { setCode } = await req.json();

    if (!setCode) {
      return Response.json({ error: "Missing setCode" }, { status: 400 });
    }

    // ⭐ Fetch ALL cards in the Pokémon set
    const url = `https://api.pokemontcg.io/v2/cards?q=set.id:${setCode}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "hideout-app/1.0" },
    });

    const data = await res.json();

    if (!data.data) {
      return Response.json({ error: "No cards returned" }, { status: 400 });
    }

    const cards = data.data;

    let inserted = 0;
    let updated = 0;

    for (const c of cards) {
      const mapped = mapPokemonSingleToDB(c);

      // ⭐ Check if card already exists
      const existing = await db
        .select()
        .from(pokemonSingles)
        .where(eq(pokemonSingles.pokemonId, c.id));

      if (existing.length > 0) {
        const newQty = existing[0].quantity + 1;

        await db
          .update(pokemonSingles)
          .set({ quantity: newQty })
          .where(eq(pokemonSingles.pokemonId, c.id));

        updated++;
        continue;
      }

      // ⭐ Insert new card
      await db.insert(pokemonSingles).values(mapped);
      inserted++;
    }

    return Response.json({
      success: true,
      inserted,
      updated,
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
