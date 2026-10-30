import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Enter a card name or card ID." },
        { status: 400 },
      );
    }

    const scryfallUrl = `https://api.scryfall.com/cards/search?q=${encodeURIComponent(query)}&unique=prints`;

    const response = await fetch(scryfallUrl, {
      headers: { "User-Agent": "HideoutTCG/1.0" },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({
          success: true,
          count: 0,
          results: [],
        });
      }

      throw new Error(`Scryfall API error: ${response.status}`);
    }

    const data = await response.json();

    const results = (data.data ?? []).map((card: any) => ({
      name: card.name,
      scryfallId: card.id,
      setCode: card.set,
      setName: card.set_name,
      imageSmall:
        card.image_uris?.small ?? card.card_faces?.[0]?.image_uris?.small ?? "",
      card: {
        ...card,
        scryfallId: card.id,
      },
    }));

    return NextResponse.json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    console.error("MAGIC SINGLE SEARCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Search failed.",
      },
      { status: 500 },
    );
  }
}
