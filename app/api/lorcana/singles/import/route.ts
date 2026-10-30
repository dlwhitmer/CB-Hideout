import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "../../../../../lib/db/db";
import { lorcanaSingles } from "../../../../../lib/db/schema";

async function fetchLorcanaCards(cardName: string) {
  const url = new URL("https://api.lorcana-api.com/cards/fetch");
  url.searchParams.set("strict", cardName);

  const response = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Lorcana API error: ${response.status}`);
  }

  const cards = await response.json();

  if (!Array.isArray(cards)) {
    throw new Error("Unexpected response from Lorcana API.");
  }

  return cards;
}

export async function POST(request: Request) {
  try {
    const { uniqueID, Name } = await request.json();

    if (!uniqueID || !Name) {
      return NextResponse.json(
        { success: false, error: "Unique_ID and Name are required." },
        { status: 400 },
      );
    }

    const cards = await fetchLorcanaCards(Name);

    const selectedCard = cards.find((card: any) => card.Unique_ID === uniqueID);

    if (!selectedCard) {
      return NextResponse.json(
        { success: false, error: "That card printing could not be found." },
        { status: 404 },
      );
    }

    const existing = await db
      .select()
      .from(lorcanaSingles)
      .where(eq(lorcanaSingles.UniqueId, selectedCard.Unique_ID))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "This card printing is already imported." },
        { status: 409 },
      );
    }

    await db.insert(lorcanaSingles).values({
      Artist: selectedCard.Artist ?? "",
      SetName: selectedCard.Set_Name ?? "",
      Classifications: selectedCard.Classifications ?? "",
      DateAdded: selectedCard.Date_Added ?? "",
      SetNum: selectedCard.Set_Num ?? 0,
      Color: selectedCard.Color ?? "",
      Gamemode: selectedCard.Gamemode ?? "",
      Franchise: selectedCard.Franchise ?? "",
      MoveCost: selectedCard.MoveCost ?? null,
      Abilities: selectedCard.Abilities ?? "",
      Image: selectedCard.Image ?? "",
      Cost: selectedCard.Cost ?? 0,
      Inkable: selectedCard.Inkable ?? false,
      Name: selectedCard.Name ?? "",
      Type: selectedCard.Type ?? "",
      Lore: selectedCard.Lore ?? 0,
      Rarity: selectedCard.Rarity ?? "",
      FlavorText: selectedCard.Flavor_Text ?? "",
      UniqueId: selectedCard.Unique_ID,
      CardNum: selectedCard.Card_Num ?? 0,
      BodyText: selectedCard.Body_Text ?? "",
      Willpower: selectedCard.Willpower ?? 0,
      CardVariants: selectedCard.Card_Variants ?? "",
      DateModified: selectedCard.Date_Modified ?? "",
      Strength: selectedCard.Strength ?? 0,
      SetId: selectedCard.Set_ID ?? "",
      ourPrice: selectedCard.our_price ?? null,
    });

    return NextResponse.json({
      success: true,
      message: `${selectedCard.Name} imported successfully.`,
      uniqueId: selectedCard.Unique_ID,
    });
  } catch (error) {
    console.error("LORCANA SINGLE IMPORT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Import failed.",
      },
      { status: 500 },
    );
  }
}
