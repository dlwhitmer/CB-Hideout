
import { NextResponse } from "next/server";

const API_URLS = [
  "https://api.lorcana-api.com/cards/fetch",
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim().toLowerCase();

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Enter a card name or card ID." },
        { status: 400 }
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
            Name: card.Name,
            SetId: card.SetId,
            SetName: card.SetName ?? "",
            Image: card.Image ?? "",
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
    console.error("Gundam SINGLE SEARCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Search failed.",
      },
      { status: 500 }
    );
  }
}
