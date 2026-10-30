import { NextResponse } from "next/server";

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
    let offset = 0;
    let total = Infinity;

    while (offset < total) {
      const response = await fetch(
        `https://api.gcgapi.com/v1/cards?limit=250&offset=${offset}`,
        { cache: "no-store" },
      );

      if (!response.ok) {
        throw new Error(`Gundam API error: ${response.status}`);
      }

      const payload = await response.json();
      const cards = Array.isArray(payload.data) ? payload.data : [];

      total = Number(payload._meta?.total ?? cards.length);

      for (const card of cards) {
        const name = String(card.name ?? "").toLowerCase();
        const cardNumber = String(card.card_number ?? "").toLowerCase();
        const productId = String(card.product_id ?? "").toLowerCase();
        const setCode = String(card.set_code ?? "").toLowerCase();
        console.log("GUNDAM CARD DATA:", JSON.stringify(card, null, 2));

        if (
          name.includes(query) ||
          cardNumber.includes(query) ||
          productId.includes(query) ||
          setCode.includes(query)
        ) {
          results.push({
            name: card.name ?? "",
            setCode: card.set_code ?? "",
            cardNumber: card.card_number ?? "",
            productId: card.product_id ?? "",
            setName: card.set_name ?? "",
            imageUrl: card.image_url ?? "",
            ourPrice: 0,
            card,
          });
        }
      }

      if (cards.length === 0) break;

      offset += cards.length;
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      results: results.slice(0, 50),
    });
  } catch (error) {
    console.error("GUNDAM SINGLE IMPORT ERROR:", error);
    console.error(
      "ERROR DETAILS:",
      JSON.stringify(error, Object.getOwnPropertyNames(error), 2),
    );

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Search failed.",
      },
      { status: 500 },
    );
  }
}
