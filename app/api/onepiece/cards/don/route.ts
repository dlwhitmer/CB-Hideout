import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { onePieceCards } from "../../../../../lib/db/schema";
import { mapOnePieceCardToDB } from "../../../../../lib/mappers/onepiece_cards";

export async function POST() {
  try {
    let totalImported = 0;

    const url = "https://www.optcgapi.com/api/allDonCards/";

    console.log("Fetching ALL OnePiece Don!! cards...");
    console.log("API URL:", url);

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
      console.warn("No OnePiece Don!! cards found.");
      return NextResponse.json({ success: true, imported: 0 });
    }

    for (const card of allCards) {
      try {
        console.log("IMPORTING DON CARD:", card);

        // Don cards ALWAYS have category "don"
        const category = "don";

        // Don JSON does NOT include set_name, so we inject one
        const mapped = mapOnePieceCardToDB(
          {
            ...card,
            set_name: card.optcg_don_name ?? "Don!!"
          },
          category
        );

        console.log("MAPPED:", mapped);

        await db.insert(onePieceCards).values(mapped);
        totalImported++;

      } catch (err) {
        console.error("IMPORT ERROR:", err);
        console.error("CARD THAT FAILED:", card);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    console.log("IMPORT COMPLETE");
    return NextResponse.json({ success: true, imported: totalImported });

  } catch (err: any) {
    console.error("IMPORT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
