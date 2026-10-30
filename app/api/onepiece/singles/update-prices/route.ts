import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../../lib/db/db";
import { onePieceSingles } from "../../../../../lib/db/schema/onepiece_singles";

const API_URLS = [
  "https://www.optcgapi.com/api/allSetCards/",
  "https://www.optcgapi.com/api/allPromos/",
  "https://www.optcgapi.com/api/allDonCards/",
  "https://www.optcgapi.com/api/allSTCards/",
];

export async function POST() {
  try {
    let updated = 0;
    let notFound = 0;
    let skipped = 0;

    for (const url of API_URLS) {
      const response = await fetch(url, {
        headers: { "User-Agent": "DanTCG-App/1.0" },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `OPTCG API failed: ${url} (${response.status})`
        );
      }

      const cards = await response.json();

      if (!Array.isArray(cards)) {
        throw new Error(`Unexpected API response from ${url}`);
      }

      for (const card of cards) {
        const cardSetId = card.card_set_id;
        const inventoryPrice = Number(card.inventory_price);
        const marketPrice = Number(card.market_price);

        if (
          !cardSetId ||
          card.inventory_price == null ||
          card.market_price == null ||
          !Number.isFinite(inventoryPrice) ||
          !Number.isFinite(marketPrice)
        ) {
          skipped++;
          continue;
        }

        const result = await db
          .update(onePieceSingles)
          .set({
            inventoryPrice,
            marketPrice,
          })
          .where(eq(onePieceSingles.cardSetId, cardSetId));

        // SQLite/libSQL update results may expose rowsAffected.
        const rowsAffected =
          "rowsAffected" in result
            ? Number(result.rowsAffected)
            : 0;

        if (rowsAffected > 0) {
          updated += rowsAffected;
        } else {
          notFound++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      updated,
      notFound,
      skipped,
    });
  } catch (error) {
    console.error("ONE PIECE PRICE UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}