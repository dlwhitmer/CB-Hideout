import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { yugiohCards } from "@/lib/db/schema/yugioh";
import { mapYugiohToDB } from "@/lib/mappers/yugioh";
import { eq } from "drizzle-orm";

// Helper: map API card → DB row
export async function POST(req: Request) {
  try {
    const { yugiohId, price, desc } = await req.json();


    if (!yugiohId) {
      return NextResponse.json({ error: "Missing yugiohId" }, { status: 400 });
    }

    // Fetch card from YGOProDeck
    const apiRes = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${yugiohId}`,
    );

    if (!apiRes.ok) {
      return NextResponse.json(
        { error: "Card not found in YGO API" },
        { status: 404 },
      );
    }
  

    const data = await apiRes.json();
    const card = data.data?.[0];

    if (!card) {
      return NextResponse.json(
        { error: "Invalid card data returned from API" },
        { status: 500 },
      );
    }

    // Build mapped object ONCE
    const mapped = mapYugiohToDB(card);
    if (price) mapped.price = price;
    if (desc) mapped.desc = desc;
    console.log("TYPE FROM API:", card.type);

   

    // Check if card already exists
    const existing = await db
      .select()
      .from(yugiohCards)
      .where(eq(yugiohCards.yugiohId, mapped.yugiohId));

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Card already exists" },
        { status: 409 },
      );
    }

    // Insert ONCE
    await db.insert(yugiohCards).values(mapped);

    return NextResponse.json({ success: true, card: mapped });
  } catch (err) {
    console.error("YuGiOh Import Error:", err);
    return NextResponse.json(
      { error: "Server error during import" },
      { status: 500 },
    );
  }
}
