import { NextResponse } from "next/server";
import { db } from "../../../../../lib/db/db";
import { gundamSets } from "../../../../../lib/db/schema";

export async function POST() {
  try {
    const res = await fetch("https://api.gcgapi.com/v1/sets");
    const json = await res.json();

    if (!json.data) {
      return NextResponse.json({ error: "No sets returned from gcgapi" });
    }

    let imported = 0;

    for (const set of json.data) {
      await db.insert(gundamSets).values({
        setCode: set.set_code, // ✔ correct
        setName: set.set_name, // ✔ correct
        cardCount: set.card_count, // ✔ correct
      });

      imported++;
    }

    return NextResponse.json({
      success: true,
      imported,
    });
  } catch (err: any) {
    console.error("SET IMPORT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
