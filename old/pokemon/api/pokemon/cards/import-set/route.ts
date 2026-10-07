import { db } from "../../../../../lib/db/db";
import { pokemonCards } from "../../../../../lib/db/schema/pokemon_cards";
import { eq } from "drizzle-orm";
import { mapPokemonCardToDB } from "../../../../../lib/mappers/pokemon_cards";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const { setCode } = body;

    if (!setCode) {
      return Response.json({ error: "Missing setCode" }, { status: 400 });
    }

    const url = `https://api.pokemontcg.io/v2/cards?q=set.id:${setCode}`;

    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      return Response.json(
        { error: `No cards returned for set ${setCode}` },
        { status: 404 },
      );
    }

    let inserted = 0;
    let updated = 0;

    for (const card of json.data) {
      const mapped = mapPokemonCardToDB(card);

      // overwrite set_id to match your sets table
      mapped.set_id = setCode;

      const existing = await db
        .select()
        .from(pokemonCards)
        .where(eq(pokemonCards.pokemonId, card.id));

      if (existing.length > 0) {
        await db
          .update(pokemonCards)
          .set({ quantity: existing[0].quantity + 1 })
          .where(eq(pokemonCards.pokemonId, card.id));

        updated++;
      } else {
        await db.insert(pokemonCards).values(mapped);
        inserted++;
      }
    }

    return Response.json({
      success: true,
      setCode,
      inserted,
      updated,
      total: inserted + updated,
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
