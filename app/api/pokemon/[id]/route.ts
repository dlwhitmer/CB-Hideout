
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as pokemon from "@/lib/db/schema/pokemon";
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
    })
    .where(eq(pokemon.pokemonCards.id, numericId));

  return NextResponse.json({ success: true });
}
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ⭐ REQUIRED
  const numericId = Number(id);

  await db
    .delete(pokemon.pokemonCards)
    .where(eq(pokemon.pokemonCards.id, numericId));

  return NextResponse.json({ success: true });
}