import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema/magic";
import { eq } from "drizzle-orm";

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  console.log("Pokemon Id {id}")

  const row = await db
    .select()
    .from(magicSingles)
    .where(eq(magicSingles.id, Number(id)));

  return Response.json({ data: row[0] });
}

export async function DELETE(req, ctx) {
  const { id } = await ctx.params;

  // Get the current quantity
  const card = await db
    .select()
    .from(magicSingles)
    .where(eq(magicSingles.id, Number(id)))
    .limit(1);

  if (!card.length) {
    return Response.json({ error: "Card not found" }, { status: 404 });
  }

  const currentQty = card[0].quantity;

  if (currentQty > 1) {
    // Decrement quantity
    const updated = await db
      .update(magicSingles)
      .set({ quantity: currentQty - 1 })
      .where(eq(magicSingles.id, Number(id)))
      .returning();

    return Response.json({ data: updated[0] });
  }

  // If quantity is 1, delete the row
  await db
    .delete(magicSingles)
    .where(eq(magicSingles.id, Number(id)));

  return Response.json({ success: true });
}

