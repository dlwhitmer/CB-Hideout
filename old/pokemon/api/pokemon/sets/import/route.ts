import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { pokemonSets } from "../../../../../lib/db/schema/pokemon_sets";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const response = await fetch(
      "https://api.pokemontcg.io/v2/sets?pageSize=250",
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    const text = await response.text();

    console.log("POKEMON SET API STATUS:", response.status);

    if (!response.ok) {
      console.error("POKEMON SET API FAILED:", text);

      throw new Error(
        `Pokemon API failed: ${response.status} ${response.statusText}`,
      );
    }

    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("JSON PARSE ERROR:", err);
      console.error("RAW RESPONSE:", text);

      throw new Error("Pokemon API returned invalid JSON");
    }

    console.log("SET COUNT:", data.data?.length ?? 0);
    console.log("FIRST SET:", data.data?.[0]);

    let imported = 0;
    let skipped = 0;

    for (const set of data.data ?? []) {
      if (!set.id) {
        console.log("Skipping set with no id:", set);
        continue;
      }

      const existing = await db
        .select()
        .from(pokemonSets)
        .where(eq(pokemonSets.set_id, set.id));

      if (existing.length > 0) {
        skipped++;
        continue;
      }

      await db.insert(pokemonSets).values({
        set_id: set.id,
        name: set.name ?? null,
        series: set.series ?? null,
        printedTotal: set.printed_total ?? null,
        total: set.total ?? null,
        pctgo_code: set.ptcgo_code ?? null,
        releaseDate: set.release_date ?? null,
        updatedAt: set.updated_at ?? null,
        logoUrl: set.images?.logo ?? null,
        symbolUrl: set.images?.symbol ?? null,
      });

      imported++;
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      total: data.data?.length ?? 0,
    });
  } catch (err) {
    console.error("POKEMON SET IMPORT ERROR:", err);

    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
