import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema/magic_singles";
import { mapMagicSinglesToDB } from "../../../../../lib/mappers/magic_singles";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { setCode } = await req.json();

    const res = await fetch(
      `https://api.scryfall.com/cards/search?q=e:${setCode}`,
      {
        headers: {
          "User-Agent": "hideout-app/1.0",
        },
      },
    );

    const data = await res.json();
    console.log("MAGIC IMPORT SET:", setCode);
    console.log("SCRYFALL OBJECT:", data.object);
    console.log("NUMBER OF CARDS:", data.data?.length);

    if (data.object === "error") {
      return Response.json({ error: data.details }, { status: 400 });
    }

    const cards = data.data;

    let inserted = 0;
    let updated = 0;

    for (const card of cards) {
      console.log("CARD BEFORE MAP:", {
        name: card.name,
        loyalty: card.loyalty,
      });

      const mapped = mapMagicSinglesToDB(card);

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
        continue;
      }

      await db.insert(magicSingles).values(mapped);

      inserted++;
    }

    return Response.json({
      success: true,
      inserted,
      updated,
    });
  } catch (err: any) {
    console.error("MAGIC SINGLE IMPORT ERROR:", err);

    return Response.json({ error: err.message }, { status: 500 });
  }
}
