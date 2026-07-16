

import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema/magic";
import { mapMagicSingleToDB } from "../../../../../lib/mappers/magic";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    console.log("IMPORT REQUEST ID:", id);  // ⭐ THIS IS THE CORRECT SPOT

      
    const res = await fetch(`https://api.scryfall.com/cards/${id}`, {
      headers: {
        "User-Agent": "hideout-app/1.0",
      },
    });

    let card = await res.json(); // ⭐ IMPORTANT: must be "let", not "const"
    console.log("SCRYFALL RAW CARD:", card);

    // If we fetched a face object OR an error object, try to fetch the full card
    if (
      (card.object === "card_face" || card.object === "error") &&
      Array.isArray(card.all_parts)
    ) {
      const main = card.all_parts.find((p) => p.component === "combo_piece");

      if (main?.uri) {
        const res2 = await fetch(main.uri);
        const fullCard = await res2.json();

        if (fullCard.object === "card") {
          card = fullCard; // overwrite with full card
        }
      }
    }

    // ⭐⭐⭐ END OF INSERTION POINT

    // Map Scryfall JSON → DB format
    const mapped = mapMagicSingleToDB(card);

    // Check if card exists
    const existing = await db
      .select()
      .from(magicSingles)
      .where(eq(magicSingles.scryfall_id, card.id));

    if (existing.length > 0) {
      const newQty = existing[0].quantity + 1;

      await db
        .update(magicSingles)
        .set({ quantity: newQty })
        .where(eq(magicSingles.scryfall_id, card.id));

      return Response.json({ success: true, updated: true, quantity: newQty });
    }

    // Insert new card
    await db.insert(magicSingles).values(mapped);

    return Response.json({ success: true, inserted: true });
  } catch (err: any) {
    console.error("IMPORT ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
