
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../../lib/db/db";
import { gundamSingles } from "../../../../../lib/db/schema";

export async function POST(request: Request) {
  try {
    const { setCode, productId } = await request.json();

    if (!setCode || !productId) {
      return NextResponse.json(
        { success: false, error: "Set code and card number are required." },
        { status: 400 },
      );
    }

    const response = await fetch(
      "https://api.gcgapi.com/v1/cards?limit=250&offset=0",
      {
        headers: { "User-Agent": "DanTCG-App/1.0" },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(`Gundam API error: ${response.status}`);
    }

    const payload = await response.json();
    const cards = Array.isArray(payload.data) ? payload.data : [];

    const selectedCard = cards.find(
      (card: any) =>
        card.set_code === setCode &&
        card.product_id === productId,
    );

    if (!selectedCard) {
      return NextResponse.json(
        { success: false, error: "That card printing could not be found." },
        { status: 404 },
      );
    }

    const existing = await db
      .select()
      .from(gundamSingles)
      .where(eq(gundamSingles.productId, selectedCard.product_id))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "This card printing is already imported." },
        { status: 409 },
      );
    }

    await db.insert(gundamSingles).values({
      productId: selectedCard.product_id,
      cardNumber: selectedCard.card_number,
      name: selectedCard.name,
      setName: selectedCard.set_name,
      setCode: selectedCard.set_code ?? "",
      rarity: selectedCard.rarity ?? "",
      cardType: selectedCard.card_type,
      color: selectedCard.color ?? "",
      level: selectedCard.level,
      cost: selectedCard.cost,
      ap: selectedCard.ap,
      hp: selectedCard.hp,
      zone: selectedCard.zone,
      link:selectedCard.link,
      linkRefs: selectedCard.link_refs,
      trait: selectedCard.trait,
      traits: selectedCard.traits,
      effect: selectedCard.effect,
      keywordEffects: selectedCard.keyword_effects,
      imageUrl: selectedCard.image_url,
      condition: selectedCard.condition,
      ourPrice: 0,
    });

    return NextResponse.json({
      success: true,
      message: `${selectedCard.name} imported successfully.`,
    });
  } catch (error) {
  console.error("GUNDAM SINGLE IMPORT ERROR:", error);
  console.error("ERROR DETAILS:", JSON.stringify(error, Object.getOwnPropertyNames(error)));

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Import failed.",
      },
      { status: 500 },
    );
  }
}
