import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema/magic_singles";
import { mapMagicSingleToDB } from "../../../../../lib/mappers/magic_singles";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const res = await fetch(`https://api.scryfall.com/cards/${id}`, {
      headers: { "User-Agent": "hideout-app/1.0" },
    });



    const card = await res.json();
    console.log("SCRYFALL RAW RESPONSE:", card); // ← ADD THIS

    if (card.object === "error") {
      return Response.json({ error: card.details }, { status: 400 });
    }

    const mapped = mapMagicSingleToDB(card);
    console.log("MAPPED SINGLE:", mapped);

    const existing = await db
      .select()
      .from(magicSingles)
      .where(eq(magicSingles.scryfallId, card.id));

    if (existing.length > 0) {
      await db
        .update(magicSingles)
        .set({ quantity: existing[0].quantity + 1 })
        .where(eq(magicSingles.scryfallId, card.id));

      return Response.json({
        success: true,
        inserted: 0,
        updated: 1,
      });
    }

    await db.insert(magicSingles).values(mapped);

    return Response.json({
      success: true,
      inserted: 1,
      updated: 0,
    });
  } catch (err: any) {
    console.error("MAGIC SINGLE IMPORT ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
