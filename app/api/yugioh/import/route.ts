import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { yugiohCards } from "@/lib/db/schema/yugioh";
import { mapYugiohToDB } from "@/lib/mappers/yugioh";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  console.log("1. Route hit");

  try {
    const body = await req.json();
    console.log("2. Body:", body);

    // FIXED: correct field name
    const { yugioh_id, price, desc } = body;

    console.log("3. Fetching Yugioh card:", yugioh_id);

    const res = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${yugioh_id}`
    );

    console.log("4. status:", res.status);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Card not found" },
        { status: 404 }
      );
    }

    const json = await res.json();

    // FIXED: extract first card
    const card = json.data?.[0];

    console.log("5. Card loaded");

    const mapped = mapYugiohToDB(card);

    // Apply overrides
    mapped.price = Number(price || mapped.price || 0);
    mapped.desc = card.desc || "";

    console.log("6. Mapped");

    // Check if card already exists
    const existing = await db
      .select()
      .from(yugiohCards)
      .where(eq(yugiohCards.yugiohId, mapped.yugiohId));

    if (existing.length > 0) {
      await db
        .update(yugiohCards)
        .set({ quantity: existing[0].quantity + 1 })
        .where(eq(yugiohCards.id, existing[0].id));

      return NextResponse.json({
        success: true,
        updated: true,
        quantity: existing[0].quantity + 1,
      });
    }

    console.log("7. About to insert into DB");

    await db.insert(yugiohCards).values({
      ...mapped,
      quantity: 1,
    });

    console.log("8. DB insert complete");

    return NextResponse.json({
      success: true,
      inserted: true,
      quantity: 1,
    });

  } catch (err: any) {
    console.error("🔥 IMPORT FAILED:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
