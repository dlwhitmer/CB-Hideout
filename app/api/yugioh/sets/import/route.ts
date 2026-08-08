import { db } from "../../../../../lib/db/db";
import {
  yugiohSingles,
  yugiohPrintings,
} from "../../../../../lib/db/schema/yugioh";
import { eq } from "drizzle-orm";
import {
  mapYugiohSingleToDB,
  mapYugiohPrintingsToDB,
} from "../../../../../lib/mappers/yugioh";
import { yugiohSets } from "../../../../../lib/db/schema/yugioh";
import { mapYugiohSetToDB } from "../../../../../lib/mappers/yugioh";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("IMPORT BODY:", body);
    const { setName } = body;
    console.log("SET NAME:", setName);

    if (!setName) {
      return Response.json({ error: "Missing setName" }, { status: 400 });
    }

    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?cardset=${encodeURIComponent(setName)}`;

    const res = await fetch(url, {
      headers: { "User-Agent": "hideout-app/1.0" },
    });

    const data = await res.json();
    console.log("URL:", url);
    console.log("Status:", res.status);
    console.log("Response:", data);

    if (!data.data) {
      return Response.json({ error: "No cards returned" }, { status: 400 });
    }

    const cards = data.data;

    // Extract set code from the first printing
    const firstPrinting = cards[0].card_sets?.find(
      (s: any) => s.set_name === setName,
    );
    const setCode = firstPrinting?.set_code ?? "";

    // Insert the set
    const newSet = mapYugiohSetToDB(setName, setCode);
    await db.insert(yugiohSets).values(newSet);

    let inserted = 0;
    let updated = 0;

    for (const c of cards) {
      // Insert printings
      for (const printing of c.card_sets ?? []) {
        const printingRow = mapYugiohPrintingsToDB(c, printing);
        await db.insert(yugiohPrintings).values(printingRow);
      }

      // Insert single
      const printing = c.card_sets?.find((s: any) => s.set_name === setName);
      const mapped = mapYugiohSingleToDB(c);

      const existing = await db
        .select()
        .from(yugiohSingles)
        .where(eq(yugiohSingles.yugiohId, mapped.yugiohId));

      if (existing.length > 0) {
        const newQty = existing[0].quantity + 1;

        await db
          .update(yugiohSingles)
          .set({ quantity: newQty })
          .where(eq(yugiohSingles.yugiohId, mapped.yugiohId));

        updated++;
        continue;
      }

      await db.insert(yugiohSingles).values(mapped);
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
