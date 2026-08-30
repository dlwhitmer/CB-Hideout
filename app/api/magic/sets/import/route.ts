import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { magicSets } from "../../../../../lib/db/schema/magic_sets";

export async function POST() {
  try {
    // 1. Fetch Scryfall set list
    const res = await fetch("https://api.scryfall.com/sets", {
      headers: {
        "User-Agent": "MagicTCG-Admin-Importer/1.0 (dan@example.com)",
      },
    });

    const json = await res.json();
    console.log("SCRYFALL RESPONSE:", json);

    if (!json.data) {
      return NextResponse.json({ error: "No sets returned from Scryfall" });
    }

    // 2. Clear old MTGJSON/WotC codes

    let imported = 0;

    // 3. Insert only real Scryfall sets
    for (const set of json.data) {
      // Skip funny sets, tokens, promos, etc
      if (set.set_type === "token") continue;
      if (set.set_type === "memorabilia") continue;
      if (set.set_type === "promo") continue;
      if (set.set_type === "funny") continue;

      await db.insert(magicSets).values({
        setCode: set.code, // ⭐ REAL Scryfall code
        setName: set.name,
        setType: set.set_type,
        releasedAt: set.released_at,
        totalCards: set.card_count ?? 0,
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
