import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { onePieceSets } from "../../../../../lib/db/schema";
import { mapOnePieceSetToDb } from "../../../../../lib/mappers/onepiece_sets";
export async function POST() {
  try {
    let totalImported = 0;

    // Lorcana import-all does NOT require sets
    const url = "https://www.optcgapi.com/api/allSets/";

    console.log("Fetching ALL OnePiece sets cards...");
    console.log("API URL:", url);

    const res = await fetch(url, {
      headers: { "User-Agent": "DanTCG-App/1.0" },
    });

    if (!res.ok) {
      console.error("API ERROR:", res.status, res.statusText);
      return NextResponse.json({ success: false, imported: 0 });
    }

    const sets = await res.json();
    console.log(`API returned ${sets.length} sets`);

    if (!Array.isArray(sets) || sets.length === 0) {
      console.warn("No OnePiece sets found.");
      return NextResponse.json({ success: true, imported: 0 });
    }

    // Insert cards
    for (const set of sets) {
      const mapped = mapOnePieceSetToDb(set);

      try {
        await db.insert(onePieceSets).values(mapped);
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
