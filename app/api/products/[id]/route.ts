import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: Request, context: any) {
  const params = await context.params; // ⭐ FIX: unwrap the Promise
  const id = Number(params.id);

  console.log("PARAM ID:", params.id);

  const db = getDb();

  try {
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

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
        WHERE id = ?
      `,
      args: [id],
    });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const row = result.rows[0];

    const safeRow = Object.fromEntries(
      Object.entries(row).map(([key, value]) => {
        if (value instanceof ArrayBuffer) {
          return [key, Buffer.from(value).toString()];
        }
        return [key, value];
      })
    );

    return NextResponse.json(safeRow);

  } catch (err) {
    console.error("GET /api/products/[id] ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}