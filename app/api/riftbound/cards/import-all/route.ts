import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { riftBoundCards } from "../../../../../lib/db/schema";
import { mapRiftBoundCardToDB } from "../../../../../lib/mappers/riftbound_cards";

export async function POST() {
  try {
    const url = "https://api.rifthunt.com/bulk/cards";

    console.log("Fetching ALL Riftbound cards...");
    console.log("API URL:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "DanTCG-App/1.0",
        "Accept": "application/json",
      },
      cache: "no-store",
    });

    console.log("API STATUS:", res.status, res.statusText);

    if (!res.ok) {
      const errorText = await res.text();

      console.error("API ERROR:", errorText);

      return NextResponse.json(
        {
          error: "Failed to fetch Riftbound cards",
          status: res.status,
          details: errorText,
        },
        { status: 500 }
      );
    }

    const json = await res.json();

    const cards = json.cards;

    if (!Array.isArray(cards)) {
      console.error("Riftbound JSON did not contain a cards array.");

      return NextResponse.json(
        {
          error: "Invalid Riftbound JSON format",
          raw: json,
        },
        { status: 500 }
      );
    }

    console.log(`Fetched ${cards.length} Riftbound cards.`);

    // Map cards
    const mapped = cards.map(mapRiftBoundCardToDB);

    console.log(`Mapped ${mapped.length} cards.`);

    // Insert in batches
    const batchSize = 50;

    for (let i = 0; i < mapped.length; i += batchSize) {
      const batch = mapped.slice(i, i + batchSize);

      console.log(
        `Inserting cards ${i + 1}-${Math.min(
          i + batchSize,
          mapped.length
        )} of ${mapped.length}...`
      );

      await db.insert(riftBoundCards).values(batch);
    }

    console.log("Riftbound database import complete.");

    return NextResponse.json({
      message: `Imported ${mapped.length} Riftbound cards successfully.`,
    });

  } catch (err) {
    console.error("=================================");
    console.error("RIFTBOUND IMPORT ERROR");
    console.error("=================================");
    console.error(err);

    return NextResponse.json(
      {
        error: "Riftbound import failed",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}