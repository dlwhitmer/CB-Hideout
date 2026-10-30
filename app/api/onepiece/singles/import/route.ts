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

export async function POST(request: Request) {
  try {
    const { cardSetId, cardImageId } = await request.json();

    if (!cardSetId || !cardImageId) {
      return NextResponse.json(
        { success: false, error: "Card ID and image ID are required." },
        { status: 400 }
      );
    }

    let selectedCard: any = null;

    for (const url of API_URLS) {
      const response = await fetch(url, {
        headers: { "User-Agent": "DanTCG-App/1.0" },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`OPTCG API error: ${response.status}`);
      }

      const cards = await response.json();

      if (!Array.isArray(cards)) continue;

      selectedCard = cards.find(
        (card: any) =>
          card.card_set_id === cardSetId &&
          card.card_image_id === cardImageId
      );

      if (selectedCard) break;
    }

    if (!selectedCard) {
      return NextResponse.json(
        { success: false, error: "That card printing could not be found." },
        { status: 404 }
      );
    }

    const existing = await db
      .select()
      .from(onePieceSingles)
      .where(eq(onePieceSingles.cardImageId, selectedCard.card_image_id))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "This card printing is already imported." },
        { status: 409 }
      );
    }

    await db.insert(onePieceSingles).values({
      inventoryPrice: Number(selectedCard.inventory_price ?? 0),
      marketPrice: Number(selectedCard.market_price ?? 0),
      cardName: selectedCard.card_name,
      setName:
        selectedCard.set_name ?? selectedCard.optcg_don_name ?? "DON!!",
      cardText: selectedCard.card_text ?? "",
      setId: selectedCard.set_id ?? "",
      rarity: selectedCard.rarity ?? "",
      cardSetId: selectedCard.card_set_id,
      cardColor: selectedCard.card_color ?? "",
      cardType: selectedCard.card_type ?? "",
      life:
        selectedCard.life == null || selectedCard.life === ""
          ? null
          : Number(selectedCard.life),
      cardCost:
        selectedCard.card_cost == null || selectedCard.card_cost === ""
          ? null
          : Number(selectedCard.card_cost),
      cardPower:
        selectedCard.card_power == null || selectedCard.card_power === ""
          ? null
          : Number(selectedCard.card_power),
      subTypes: selectedCard.sub_types ?? "",
      counterAmount:
        selectedCard.counter_amount == null ||
        selectedCard.counter_amount === ""
          ? null
          : Number(selectedCard.counter_amount),
      attribute: selectedCard.attribute ?? "",
      dateScraped: selectedCard.date_scraped ?? "",
      cardImageId: selectedCard.card_image_id,
      cardImage: selectedCard.card_image ?? "",
    });

    return NextResponse.json({
      success: true,
      message: `${selectedCard.card_name} imported successfully.`,
    });
  } catch (error) {
    console.error("ONE PIECE SINGLE IMPORT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Import failed.",
      },
      { status: 500 }
    );
  }
}
