import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { onePieceCards } from "../../../../../lib/db/schema";
import { mapOnePieceCardToDB } from "../../../../../lib/mappers/onepiece_cards";
export async function POST() {
  try {
    let totalImported = 0;

    // Lorcana import-all does NOT require sets
    const url = "https://www.optcgapi.com/api/allSetCards/";

    function determineCategory(setName: string): string {
  const s = setName.toLowerCase();

//   if (s.startsWith("starter deck")) return "st";
//   if (s.startsWith("ultra deck")) return "ultra";
  if (s.includes("extra booster")) return "extra-booster";
  if (s.includes("booster")) return "booster";
//   if (s.includes("don!!")) return "don";
  

  return "null";
}

    const res = await fetch(url, {
      headers: { "User-Agent": "DanTCG-App/1.0" },
    });

    if (!res.ok) {
      console.error("API ERROR:", res.status, res.statusText);
      return NextResponse.json({ success: false, imported: 0 });
    }

    const allCards = await res.json();

    console.log(`API returned ${allCards.length} cards`);
    if (!Array.isArray(allCards) || allCards.length === 0) {
      console.warn("No OnePiece  cards found.");
      return NextResponse.json({ success: true, imported: 0 });
    }

    // Insert cards
    for (const card of allCards) {
      try {
        console.log("IMPORTING CARD:", card);

        const category = determineCategory(card.set_name);
        console.log("CATEGORY:", category);

        const mapped = mapOnePieceCardToDB(card, category);
        console.log("MAPPED:", mapped);

        await db.insert(onePieceCards).values(mapped);
        totalImported++;
      } catch (err) {
        console.error("IMPORT ERROR:", err);
        console.error("CARD THAT FAILED:", card);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, imported: totalImported });
  } catch (err: any) {
    console.error("IMPORT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
