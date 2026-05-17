export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();

    const result = await db.execute(`
      SELECT 
        id,
        scryfall_id,
        name,
        set_code,
        collector_number,
        rarity,
        price,
        image_url,
        type_line,
        oracle_text,
        description,
        created_at
      FROM products
      ORDER BY created_at DESC
    `);

    // Convert ArrayBuffers → strings
    const safeRows = result.rows.map((row: unknown) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => {
          if (value instanceof ArrayBuffer) {
            return [key, Buffer.from(value).toString()];
          }
          return [key, value];
        })
      )
    );

    return NextResponse.json(safeRows);
  } catch (err) {
    console.error("GET /api/products/list ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}