import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { magicSets } from "../../../../../lib/db/schema/magic_sets";
import { magicPrices } from "../../../../../lib/db/schema";
import { mapMagicPricesToDB } from "../../../../../lib/mappers/magic_prices";

export async function GET() {
  try {
    let totalImported = 0;

    const sets = await db.select().from(magicSets);

    for (const set of sets) {
      const res = await fetch(
        `https://api.scryfall.com/cards/search?q=e:${set.setCode}`,
        {
          headers: { "User-Agent": "DanTCG-App/1.0" },
        }
      );

      const json = await res.json();
      if (!json.data) continue;

      for (const card of json.data) {
        const mapped = mapMagicPricesToDB(card);

        await db.insert(magicPrices).values(mapped);

        console.log("INSERTED PRICE:", card.name);
        totalImported++;
      }
    }

    return NextResponse.json({ success: true, imported: totalImported });
  } catch (err: any) {
    console.error("IMPORT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
