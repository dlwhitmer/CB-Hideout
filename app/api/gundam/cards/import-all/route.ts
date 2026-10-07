import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { gundamSets } from "../../../../../lib/db/schema";
import { gundamCards } from "../../../../../lib/db/schema/gundam_cards";
import { mapGundamCardToDB } from "../../../../../lib/mappers/gundam_cards";

export async function POST() {
  try {
    let totalImported = 0;

    // Load ALL Gundam sets from your DB (GB, EB, EXB, R, RP, SC, ST, T)
    const sets = await db.select().from(gundamSets);

    if (sets.length === 0) {
      console.warn("No Gundam sets found in database.");
      return NextResponse.json({ success: true, imported: 0 });
    }

    for (const set of sets) {
      const url = `https://api.gcgapi.com/v1/cards?set_code=${encodeURIComponent(
        set.setCode,
      )}&limit=250`;

      console.log("\n----------------------------------------");
      console.log("IMPORTING SET:", set.setCode);
      console.log("API URL:", url);

      const res = await fetch(url, {
        headers: { "User-Agent": "DanTCG-App/1.0" },
      });

      if (!res.ok) {
        console.error(
          `API ERROR for ${set.setCode}:`,
          res.status,
          res.statusText,
        );
        continue;
      }

      const json = await res.json();
      const cards = json.data ?? [];

      console.log(`API RETURNED ${cards.length} cards for ${set.setCode}`);

      if (cards.length === 0) {
        console.warn(`No cards found for ${set.setCode}`);
        continue;
      }

      // Log first card for debugging
      const first = cards[0];
      console.log("FIRST CARD:", first.id, first.set_code, first.name);

      // Insert cards
      for (const card of cards) {
        const mapped = mapGundamCardToDB(card);

        // Override setCode + setName (correct)
        mapped.setCode = set.setCode;
        mapped.setName = set.setName;

        try {
          await db.insert(gundamCards).values(mapped);
          totalImported++;
        } catch (err) {
          console.error("DB INSERT ERROR:", err);
          console.error("Card that failed:", mapped);
        }
      }
    }

    console.log("\nIMPORT COMPLETE");
    return NextResponse.json({ success: true, imported: totalImported });
  } catch (err: any) {
    console.error("IMPORT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
