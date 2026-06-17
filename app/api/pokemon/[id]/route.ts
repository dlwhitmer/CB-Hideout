
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as pokemon from "@/lib/db/schema/pokemon";
import { eq } from "drizzle-orm";
import { pokemonCards } from "@/lib/db/schema/pokemon";

// GET /api/magic/123
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ⭐ THIS is the key
  const numericId = Number(id);

  const result = await db
    .select()
    .from(pokemon.pokemonCards)
    .where(eq(pokemon.pokemonCards.id, numericId));

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
    .update(pokemon.pokemonCards)
    .set({
      name: body.name,
      price: body.price,
      flavorText: body.flavor_text,
      quantity: body.quantity,
    })
    .where(eq(pokemon.pokemonCards.id, numericId));

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
    .from(pokemonCards)
    .where(eq(pokemonCards.pokemonId, id))


  if (existing.length === 0) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }

  const card = existing[0];

  // 2. Decrement quantity if > 1
  if (card.quantity > 1) {
    await db
      .update(pokemonCards)
      .set({ quantity: card.quantity - 1 })
      .where(eq(pokemonCards.pokemonId, id));

    return NextResponse.json({
      success: true,
      updated: true,
      quantity: card.quantity - 1,
    });
  }

  // 3. Delete row if quantity === 1
  await db.delete(pokemonCards).where(eq(pokemonCards.pokemonId, id));

  return NextResponse.json({
    success: true,
    deleted: true,
  });
}
