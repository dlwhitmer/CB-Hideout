import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema/magic";
import { eq } from "drizzle-orm";
import { mapMagicSingleToDB } from "../../../../../lib/mappers/magic";

export async function POST(req: Request) {
  try {
    const { setCode } = await req.json();

    if (!setCode) {
      return Response.json({ error: "Missing setCode" }, { status: 400 });
    }

    // ⭐ Fetch ALL cards in the set
    const url = `https://api.scryfall.com/cards/search?q=e:${setCode}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "hideout-app/1.0" },
    });

    const data = await res.json();

    if (data.object === "error") {
      return Response.json({ error: data.details }, { status: 400 });
    }

    const cards = data.data;

    let inserted = 0;
    let updated = 0;

    for (const c of cards) {
      

const mapped = mapMagicSingleToDB(c);

      // ⭐ Check if card already exists
      const existing = await db
        .select()
        .from(magicSingles)
        .where(eq(magicSingles.scryfall_id, c.id));

      if (existing.length > 0) {
        const newQty = existing[0].quantity + 1;

        await db
          .update(magicSingles)
          .set({ quantity: newQty })
          .where(eq(magicSingles.scryfall_id, c.id));

        updated++;
        continue;
      }

      // ⭐ Insert new card
      await db.insert(magicSingles).values(mapped);
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
