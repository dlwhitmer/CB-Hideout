import { db } from "../../../../../lib/db/db";
import { pokemonSingles } from "../../../../../lib/db/schema/pokemon_singles";
import { eq } from "drizzle-orm";
import { mapPokemonSingleToDB } from "../../../../../lib/mappers/pokemon_singles";

async function fetchPokemonApi(
  url: string,
  retries = 3,
  delayMs = 2000,
): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": process.env.POKEMON_TCG_API_KEY!,
      },
    });

    if (response.ok) {
      return response;
    }

    const retryable = [500, 502, 503, 504].includes(response.status);

    if (!retryable || attempt === retries) {
      return response;
    }

    console.log(
      `Pokemon API returned ${response.status}. Retry ${attempt}/${retries}...`,
    );

    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  throw new Error("Pokemon API request failed");
}

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json({ error: "Missing card ID" }, { status: 400 });
    }

    // ⭐ Fetch ONE Pokémon card
    const res = await fetchPokemonApi(
      `https://api.pokemontcg.io/v2/cards/${id}`,
    );

    const data = await res.json();

    if (!data.data) {
      return Response.json({ error: "Card not found" }, { status: 404 });
    }

    const card = data.data;

    const mapped = mapPokemonSingleToDB(card);

    // ⭐ Check if card exists
    const existing = await db
      .select()
      .from(pokemonSingles)
      .where(eq(pokemonSingles.pokemonId, card.id));

    if (existing.length > 0) {
      const newQty = existing[0].quantity + 1;

      await db
        .update(pokemonSingles)
        .set({ quantity: newQty })
        .where(eq(pokemonSingles.pokemonId, card.id));

      return Response.json({
        success: true,
        updated: true,
        quantity: newQty,
      });
    }

    // ⭐ Insert new card
    await db.insert(pokemonSingles).values(mapped);

    return Response.json({ success: true, inserted: true });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
