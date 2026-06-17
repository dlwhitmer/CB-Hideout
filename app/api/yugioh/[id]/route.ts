import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as yugioh from "@/lib/db/schema/yugioh";
import { yugiohCards } from "@/lib/db/schema/yugioh";
import { eq } from "drizzle-orm";

// GET /api/yugioj/123
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ⭐ THIS is the key
  const numericId = Number(id);

  const result = await db
    .select()
    .from(yugioh.yugiohCards)
    .where(eq(yugioh.yugiohCards.id, numericId));

  return NextResponse.json(result[0] ?? null);
}

// PUT /api/yugioh/123
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // ⭐ SAME FIX HERE
  const numericId = Number(id);

  const body = await request.json();

  await db
    .update(yugioh.yugiohCards)
    .set({
      name: body.name,
      desc: body.desc,
      price: body.price, // now valid because schema includes price
    })
    .where(eq(yugioh.yugiohCards.id, numericId));

  return NextResponse.json({ success: true });
}
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
const normalizedId = String(Number(id));


  console.log("DELETE YUGIOH ID:", normalizedId);

  const existing = await db
    .select()
    .from(yugiohCards)
    .where(eq(yugiohCards.yugiohId, normalizedId))



  if (existing.length === 0) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  const card = existing[0];

  if (card.quantity > 1) {
    await db
      .update(yugiohCards)
      .set({ quantity: card.quantity - 1 })
      .where(eq(yugiohCards.yugiohId, normalizedId));

    return NextResponse.json({
      success: true,
      updated: true,
      quantity: card.quantity - 1,
    });
  }

  await db.delete(yugiohCards).where(eq(yugiohCards.yugiohId, normalizedId));

  return NextResponse.json({ success: true, deleted: true });
}
