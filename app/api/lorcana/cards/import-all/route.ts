import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { lorcanaCards } from "../../../../../lib/db/schema";
import { mapLorcanaCardToDB } from "../../../../../lib/mappers/lorcana_cards";

export async function POST() {
  try {
    let totalImported = 0;

    // Lorcana import-all does NOT require sets
    const url = "https://api.lorcana-api.com/cards/all";

    console.log("Fetching ALL Lorcana cards...");
    console.log("API URL:", url);

    const res = await fetch(url, {
      headers: { "User-Agent": "DanTCG-App/1.0" },
    });

    if (!res.ok) {
      console.error("API ERROR:", res.status, res.statusText);
      return NextResponse.json({ success: false, imported: 0 });
    }

    const cards = await res.json(); // Lorcana returns an ARRAY

    console.log(`API returned ${cards.length} cards`);

    if (!Array.isArray(cards) || cards.length === 0) {
      console.warn("No Lorcana cards found.");
      return NextResponse.json({ success: true, imported: 0 });
    }

    // Insert cards
    for (const card of cards) {
      const mapped = mapLorcanaCardToDB(card);

      try {
        await db.insert(lorcanaCards).values(mapped);
        totalImported++;
      } catch (err) {
        console.error("DB INSERT ERROR:", err);
        console.error("Card that failed:", mapped);
      }
    }

    console.log("IMPORT COMPLETE");
    return NextResponse.json({ success: true, imported: totalImported });
  } catch (err: any) {
    console.error("IMPORT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
