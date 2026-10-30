import { db } from "../../../../../lib/db/db";
import { riftboundSingles } from "../../../../../lib/db/schema";
import { mapRiftboundSingleToDB } from "../../../../../lib/mappers/riftbound_singles";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { scryfallId: id } = await req.json();

    const res = await fetch(`https://api.scryfall.com/cards/${id}`, {
      headers: { "User-Agent": "hideout-app/1.0" },
    });



    const card = await res.json();
    console.log("RIFTBOUND RAW RESPONSE:", card); // ← ADD THIS

    if (card.object === "error") {
      return Response.json({ error: card.details }, { status: 400 });
    }

    const mapped = mapRiftboundSingleToDB(card);
    console.log("MAPPED SINGLE:", mapped);

    const existing = await db
      .select()
      .from(riftboundSingles)
      .where(eq(riftboundSingles.id, card.id));

    if (existing.length > 0) {
      await db
        .update(riftboundSingles)
        .set({ quantity: existing[0].quantity + 1 })
        .where(eq(riftboundSingles.id, card.id));

      return Response.json({
        success: true,
        inserted: 0,
        updated: 1,
      });
    }

    await db.insert(riftboundSingles).values(mapped);

    return Response.json({
      success: true,
      inserted: 1,
      updated: 0,
    });
  } catch (err: any) {
    console.error("RIFTBOUND IMPORT ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
