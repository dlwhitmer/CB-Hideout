import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { lorcanaSets } from "../../../../../lib/db/schema";

export async function POST() {
  try {
    // 1. Fetch sets from external Lorcana API
    const res = await fetch("https://api.lorcana-api.com/sets/all");
    const sets = await res.json();

    // 2. Clear existing sets (optional)
    await db.delete(lorcanaSets);

    // 3. Insert mapped sets
    for (const set of sets) {
      await db.insert(lorcanaSets).values({
        SetNum: set.Set_Num,
        ReleaseDate: set.Release_Date,
        Cards: set.Cards ?? 0,
        Name: set.Name,
        SetID: set.Set_ID,
      });
    }

    return NextResponse.json({ ok: true, count: sets.length });
  } catch (err) {
    console.error("IMPORT ERROR:", err);
    return NextResponse.json({ ok: false, error: String(err) });
  }
}
