import { db } from "../../../../../lib/db/db";
import { yugiohSingles } from "../../../../../lib/db/schema/yugioh";
import { eq } from "drizzle-orm";
import { mapYugiohSingleToDB } from "../../../../../lib/mappers/yugioh";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json({ error: "Missing card ID" }, { status: 400 });
    }

    // ⭐ Fetch ONE Yugioh card
    const res = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`,
      {
        headers: { "User-Agent": "hideout-app/1.0" },
      },
    );

    const data = await res.json();

    if (!data.data) {
      return Response.json({ error: "Card not found" }, { status: 404 });
    }

    const card = data.data;

    // ⭐ Get all printings for this card
    const printings = card.card_sets ?? [];

    // ⭐ Insert one row per set printing
    for (const printing of printings) {
      const mapped = mapYugiohSingleToDB(card, printing);

      // Check if this specific card/set already exists
      const existing = await db
        .select()
        .from(yugiohSingles)
        .where(eq(yugiohSingles.yugiohId, mapped.yugiohId));

      if (existing.length > 0) {
        continue;
      }

      await db.insert(yugiohSingles).values(mapped);
    }

    return Response.json({ success: true, inserted: true });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
