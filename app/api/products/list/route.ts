import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();

  try {
    const result = await db.execute({
      sql: `
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
          artist,
          created_at
        FROM products
        ORDER BY created_at DESC
      `,
      args: [],
    });

    // ⭐ FIX: Tell TypeScript what each row looks like
    const safeRows = result.rows.map((row) => {
      const obj = row as Record<string, any>;

      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
          if (value instanceof ArrayBuffer) {
            return [key, Buffer.from(value).toString()];
          }
          return [key, value];
        })
      );
    });

    return NextResponse.json(safeRows);

  } catch (err) {
    console.error("GET /api/products/list ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}