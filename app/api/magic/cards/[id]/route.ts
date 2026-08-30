import { db } from "../../../../../lib/db/db";
import { magicCards } from "../../../../../lib/db/schema/magic_cards";
import { eq } from "drizzle-orm";

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  console.log("Magic Card Id", id);

  const row = await db
    .select()
    .from(magicCards)
    .where(eq(magicCards.id, Number(id)));

  return Response.json({ data: row[0] });
}

export async function POST(req: Request) {
  const body = await req.json();

  const inserted = await db
    .insert(magicCards)
    .values(body)
    .returning();

  return Response.json({ data: inserted[0] });
}

export async function DELETE(
  _: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  // Check if card exists
  const card = await db
    .select()
    .from(magicCards)
    .where(eq(magicCards.id, Number(id)))
    .limit(1);

  if (!card.length) {
    return Response.json({ error: "Card not found" }, { status: 404 });
  }

  // Delete the card
  await db.delete(magicCards).where(eq(magicCards.id, Number(id)));

  return Response.json({ success: true });
}
