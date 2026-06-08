import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as magic from "@/lib/db/schema/magic";
import { eq } from "drizzle-orm";

// GET /api/magic/123
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ⭐ THIS is the key
  const numericId = Number(id);

  const result = await db
    .select()
    .from(magic.magicCards)
    .where(eq(magic.magicCards.id, numericId));

  if (!result[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const row = result[0];

    console.log("ROW:", row);
    console.log("ORACLE:", row.oracleText);

    return NextResponse.json({
      ...row,
      oracleText: row.oracleText,
    });
}
// PUT /api/magic/123
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ⭐ SAME FIX HERE
  const numericId = Number(id);

  const body = await request.json();

  await db
    .update(magic.magicCards)
    .set({
      name: body.name,
      price: body.price,
      description: body.description,
    })
    .where(eq(magic.magicCards.id, numericId));

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ⭐ REQUIRED
  const numericId = Number(id);

  await db.delete(magic.magicCards).where(eq(magic.magicCards.id, numericId));

  return NextResponse.json({ success: true });
}
