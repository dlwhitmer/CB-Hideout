import { NextResponse } from "next/server";

const API_URLS = [
  "https://www.optcgapi.com/api/allSetCards/",
  "https://www.optcgapi.com/api/allPromos/",
  "https://www.optcgapi.com/api/allDonCards/",
  "https://www.optcgapi.com/api/allSTCards/",
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim().toLowerCase();

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Enter a card name or card ID." },
        { status: 400 },
      );
    }

    const results = [];

    for (const url of API_URLS) {
      const response = await fetch(url, {
        headers: { "User-Agent": "DanTCG-App/1.0" },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`OPTCG API error: ${response.status} (${url})`);
      }

      const cards = await response.json();

      if (!Array.isArray(cards)) continue;

      for (const card of cards) {
        const name = String(card.card_name ?? "").toLowerCase();
        const cardId = String(card.card_set_id ?? "").toLowerCase();

        if (name.includes(query) || cardId.includes(query)) {
          results.push({
            cardName: card.card_name,
            cardSetId: card.card_set_id,
            cardImageId: card.card_image_id,
            setName: card.set_name ?? card.optcg_don_name ?? "DON!!",
            cardImage: card.card_image ?? "",
            inventoryPrice: card.inventory_price ?? null,
            marketPrice: card.market_price ?? null,
            card,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      results: results.slice(0, 50),
    });
  } catch (error) {
    console.error("ONE PIECE SINGLE SEARCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Search failed.",
      },
      { status: 500 },
    );
  }
}
