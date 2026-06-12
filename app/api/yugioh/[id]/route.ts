
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as yugioh from "@/lib/db/schema/yugioh";
import { yugiohCards } from "@/lib/db/schema/yugioh";
import { eq } from "drizzle-orm";

// GET /api/magic/123
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ⭐ THIS is the key
  const numericId = Number(id);

  const result = await db
    .select()
    .from(yugioh.yugiohCards)
    .where(eq(yugioh.yugiohCards.id, numericId));

  return NextResponse.json(result[0] ?? null);
}

// PUT /api/magic/123
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ⭐ SAME FIX HERE
  const numericId = Number(id);

  const body = await request.json();

  await db
  .update(yugiohCards)
  .set({
    name: body.name,
    desc: body.desc,
    price: body.price, // now valid because schema includes price
  })
  .where(eq(yugiohCards.id, numericId));


  return NextResponse.json({ success: true });
}
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ⭐ REQUIRED
  const numericId = Number(id);

  await db
    .delete(yugioh.yugiohCards)
    .where(eq(yugioh.yugiohCards.id, numericId));

  return NextResponse.json({ success: true });
}