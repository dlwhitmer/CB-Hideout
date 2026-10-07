import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { riftboundSets } from "../../../../../lib/db/schema";

export async function POST() {
  try {
    const res = await fetch("https://api.rifthunt.com/sets");
    const json = await res.json();

    if (!json.data) {
      return NextResponse.json({ error: "No sets returned from gcgapi" });
    }

    let imported = 0;

    for (const set of json.data) {
      await db.insert(riftboundSets).values({
        name: set.name,
        code: set.code,     // ✔ correct
        apiId:set.api_id,
        cardCount: set.card_count, // ✔ correct
        releaseDate:set.release_date,
      });

      imported++;
    }

    return NextResponse.json({
      success: true,
      imported,
    });

  } catch (err: any) {
    console.error("SET IMPORT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
