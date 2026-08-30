import { db } from "../../../../../lib/db/db";
import { magicProducts } from "../../../../../lib/db/schema/magic_products";
import { eq } from "drizzle-orm";

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  console.log("Pokemon Id {id}")

  const row = await db
    .select()
    .from(magicProducts)
    .where(eq(magicProducts.id, Number(id)));

  return Response.json({ data: row[0] });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const body = await req.json();

  const updated = await db
    .update(magicProducts)
    .set({
      packsPerBox: body.packsPerBox,
      cardsPerPack: body.cardsPerPack,
      marketPrice: body.marketPrice,
      ourPrice: body.ourPrice,
      quantity: body.quantity,
      description: body.description,
    })
    .where(eq(magicProducts.id, Number(id)))
    .returning();

  if (!updated.length) {
    return Response.json(
      { error: "Product not found" },
      { status: 404 },
    );
  }

  return Response.json({ data: updated[0] });
}

export async function DELETE(req, ctx) {
  const { id } = await ctx.params;

  // Get the current quantity
  const card = await db
    .select()
    .from(magicProducts)
    .where(eq(magicProducts.id, Number(id)))
    .limit(1);

  if (!card.length) {
    return Response.json({ error: "Card not found" }, { status: 404 });
  }

  const currentQty = card[0].quantity;

  if (currentQty > 1) {
    // Decrement quantity
    const updated = await db
      .update(magicProducts)
      .set({ quantity: currentQty - 1 })
      .where(eq(magicProducts.id, Number(id)))
      .returning();

    return Response.json({ data: updated[0] });
  }

  // If quantity is 1, delete the row
  await db
    .delete(magicProducts)
    .where(eq(magicProducts.id, Number(id)));

  return Response.json({ success: true });
}

