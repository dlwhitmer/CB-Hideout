import { db } from "../../../../../lib/db/db";
import { eq } from "drizzle-orm";
import { pokemonSingles } from "../../../../../lib/db/schema/pokemon_singles";
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
    const body = await req.json();

    const { setCode } = body;

    // const set = await fetchPokemonApi(
    //   `https://api.pokemontcg.io/v2/sets/${setCode}`,
    // );
    console.log("POKEMON KEY LENGTH:", process.env.POKEMON_TCG_API_KEY?.length);
    console.log("SET CODE RECEIVED:", setCode);
    // console.log("SET URL:", `https://api.pokemontcg.io/v2/sets/${setCode}`);

    // const setText = await set.text();

    // if (!set.ok) {
    //   return Response.json(
    //     {
    //       error: "Pokemon API set request failed",
    //       status: set.status,
    //       response: setText,
    //     },
    //     { status: 500 },
    //   );
    // }

    // const setData = JSON.parse(setText);

    const res = await fetch(
      `https://api.pokemontcg.io/v2/cards?q=${encodeURIComponent(
        `set.id:${setCode}`,
      )}&pageSize=50`,
      {
        headers: {
          "X-Api-Key": process.env.POKEMON_TCG_API_KEY!,
        },
      },
    );

    console.log("CARD STATUS:", res.status);
    console.log("CARD OK:", res.ok);
    console.log("CARD URL:", res.url);

    const cardText = await res.text();

    console.log("CARD LENGTH:", cardText.length);
    console.log("CARD RESPONSE:", cardText.substring(0, 500));

    if (!res.ok) {
      return Response.json(
        {
          error: "Pokemon API card request failed",
          status: res.status,
          response: cardText,
        },
        { status: 500 },
      );
    }

    if (!cardText) {
      return Response.json(
        { error: "Empty card response from Pokemon API" },
        { status: 500 },
      );
    }

    const data = JSON.parse(cardText);

    if (!data.data) {
      return Response.json({ error: "No cards returned" }, { status: 400 });
    }
    // if (!set.ok) {
    //   return Response.json({ error: "Set not found" }, { status: 404 });
    // }
    const cards = data.data;
    console.log(
      "FIRST CARD TCGPLAYER:",
      JSON.stringify(cards[0]?.tcgplayer, null, 2),
    );

    // console.log("SET DATA:", setData);

    // console.log("MAPPED SET:", newSet);

    let inserted = 0;
    let updated = 0;

    for (const c of cards) {
      // Insert single card
      console.log("CARD:", c.name);
      console.log(c.name);
      console.log(JSON.stringify(c.tcgplayer, null, 2));
      const mapped = mapPokemonSingleToDB(c);
      console.log("MAPPED CARD:", mapped);

      const existing = await db
        .select()
        .from(pokemonSingles)
        .where(eq(pokemonSingles.pokemonId, mapped.pokemonId));

      if (existing.length > 0) {
        const newQty = existing[0].quantity + 1;

        await db
          .update(pokemonSingles)
          .set({
            quantity: newQty,
            marketPrice: mapped.marketPrice,
            normalMarket: mapped.normalMarket,
            holofoilMarket: mapped.holofoilMarket,
            reverseHoloMarket: mapped.reverseHoloMarket,
            lowPrice: mapped.lowPrice,
            midPrice: mapped.midPrice,
          })
          .where(eq(pokemonSingles.pokemonId, mapped.pokemonId));

        updated++;
        continue;
      }
      console.log("MAPPED CARD:", mapped);
      await db.insert(pokemonSingles).values(mapped);
      inserted++;
    }

    return Response.json({
      success: true,
      inserted,
      updated,
    });
  } catch (err: any) {
    console.error("IMPORT ERROR:", err);
    return Response.json(
      { error: err.message, stack: err.stack },
      { status: 500 },
    );
  }
}
