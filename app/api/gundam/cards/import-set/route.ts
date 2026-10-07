import { db } from "../../../../../lib/db/db";
import { gundamCards } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";
import { mapGundamCardToDB } from "../../../../../lib/mappers/gundam_cards";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const { setCode } = body;

    if (!setCode) {
      return Response.json({ error: "Missing setCode" }, { status: 400 });
    }

    const url = `https://api.gcgapi.com/v1/cards/?q=set.id:${setCode}`;

    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      return Response.json(
        { error: `No cards returned for set ${setCode}` },
        { status: 404 },
      );
    }

    let inserted = 0;
    let updated = 0;

    for (const card of json.data) {
      const mapped = mapGundamCardToDB(card);

      // overwrite set_id to match your sets table
      mapped.setCode = setCode;

      const existing = await db
        .select()
        .from(gundamCards)
        .where(eq(gundamCards.id, card.id));

      if (existing.length > 0) {
        await db
  .update(gundamCards)
  .set({
    setCode:mapped.setCode,
    setName: mapped.setName,
  })
  .where(eq(gundamCards.id, mapped.id));


        updated++;
      } else {
        await db.insert(gundamCards).values(mapped);
        inserted++;
      }
    }

    return Response.json({
      success: true,
      setCode,
      inserted,
      updated,
      total: inserted + updated,
    });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
