import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema/magic";
import { eq } from "drizzle-orm";
import { mapMagicSinglesToDB } from "../../../../../lib/mappers/magic";

export async function POST(req: Request) {
  try {
    const { setCode } = await req.json();

    let inserted = 0;
    let updated = 0;

    // Get set information
    const setResponse = await fetch(
      `https://api.scryfall.com/sets/${setCode}`,
      {
        headers: {
          "User-Agent": "card-hideout/1.0",
          Accept: "application/json",
        },
      },
    );

    const set = await setResponse.json();

    const totalCards = set.card_count;

    // Get cards from set
    const res = await fetch(
      `https://api.scryfall.com/cards/search?q=e:${setCode}`,
      {
        headers: {
          "User-Agent": "card-hideout/1.0",
          Accept: "application/json",
        },
      },
    );

    const data = await res.json();

    console.log("SCRYFALL RESPONSE:", data);

    let cards = data.data ?? [];

    // Handle multi-page Scryfall results
    while (data.has_more) {
      const next = await fetch(data.next_page);
      const nextData = await next.json();

      cards = [...cards, ...(nextData.data ?? [])];

      data.has_more = nextData.has_more;
      data.next_page = nextData.next_page;
    }

    for (const card of cards) {
      const mapped = mapMagicSinglesToDB(card);
         console.log("IMPORT CARD:", card.name, card.id);

      const existing = await db
        .select()
        .from(magicSingles)
        .where(eq(magicSingles.scryfallId, card.id));

      if (existing.length > 0) {
        await db
          .update(magicSingles)
          .set({
            quantity: existing[0].quantity + 1,
          })
          .where(eq(magicSingles.scryfallId, card.id));
     
        updated++;
      } else {
        await db.insert(magicSingles).values(mapped);

        inserted++;
      }
    }

    return Response.json({
      success: true,
      inserted,
      updated,
      totalCards,
    });
  } catch (err: any) {
    console.error("MAGIC SET IMPORT ERROR:", err);

    return Response.json({ error: err.message }, { status: 500 });
  }
}
