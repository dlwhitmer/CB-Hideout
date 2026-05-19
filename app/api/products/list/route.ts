export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";


export async function GET(request: Request) {
  try {
    const db = getDb();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 20;
    const offset = (page - 1) * pageSize;

    // Fetch paginated products
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
        LIMIT :limit OFFSET :offset
      `,
      args: {
        limit: pageSize,
        offset: offset,
      },
    }); // ✅ THIS WAS MISSING

    const products = result.rows.map((row) => {
      const obj = row;

      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
          if (value instanceof ArrayBuffer) {
            return [key, Buffer.from(value).toString()];
          }
          return [key, value];
        })
      );
    });

    const totalResult = await db.execute({
      sql: "SELECT COUNT(*) as count FROM products",
    });

    const total = Number(totalResult.rows[0].count);

    return NextResponse.json({ products, total });
  } catch (err) {
    console.error("GET /api/products/list ERROR:", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}