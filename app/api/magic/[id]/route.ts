import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as magic from "@/lib/db/schema/magic";
import { eq } from "drizzle-orm";
import { magicCards } from "@/lib/db/schema/magic";

// GET /api/magic/123
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ⭐ THIS is the key
  const numericId = Number(id);

  const result = await db
    .select()
    .from(magic.magicCards)
    .where(eq(magic.magicCards.id, numericId));

  return NextResponse.json(result[0] ?? null);
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
      quantity: body.quantity,
    })
    .where(eq(magic.magicCards.id, numericId));

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  console.log("DELETE PARAMS:", await context.params);
  console.log("DELETE ID:", id);


  const existing = await db
    .select()
    .from(magicCards)
    .where(eq(magicCards.scryfallId, id))


  if (existing.length === 0) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  const card = existing[0];

  // 2. Decrement quantity if > 1
  if (card.quantity > 1) {
    await db
      .update(magicCards)
      .set({ quantity: card.quantity - 1 })
      .where(eq(magicCards.scryfallId, id));

    return NextResponse.json({
      success: true,
      updated: true,
      quantity: card.quantity - 1,
    });
  }

  // 3. Delete row if quantity === 1
  await db.delete(magicCards).where(eq(magicCards.scryfallId, id));

  return NextResponse.json({
    success: true,
    deleted: true,
  });
}
