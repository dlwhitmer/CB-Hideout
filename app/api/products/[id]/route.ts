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
        set_name,
        mana_cost,
        cmc,
        colors,
        color_identity,
        power,
        toughness,
        keywords,
        type_line,
        oracle_text,
        layout,
        card_faces,
        collector_number,
        rarity,
        price,
        image_url,
        artist,
        released_at,
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
      }),
    );

    return NextResponse.json(safeRow);
  } catch (err) {
    console.error("GET /api/products/[id] ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: any) {
  const params = await context.params;
  const id = Number(params.id);

  const db = getDb();

  try {
    if (!Number.isFinite(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await db.execute({
      sql: "DELETE FROM products WHERE id = ?",
      args: [id],
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.error("DELETE ERROR:", err);

    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(request: Request, context: any) {
  const params = await context.params;
  const id = Number(params.id);

  const db = getDb();

  try {
    const body = await request.json();

    const { name, price, description } = body;

    await db.execute({
      sql: `
        UPDATE products
        SET name = ?, price = ?, description = ?
        WHERE id = ?
      `,
      args: [name ?? "", price ?? "", description ?? "", id],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT ERROR:", err);

    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
