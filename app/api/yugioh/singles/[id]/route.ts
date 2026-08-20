import { db } from "../../../../../lib/db/db";
import { yugiohSingles, yugiohPrintings } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;

  const row = await db
    .select()
    .from(yugiohSingles)
    .where(eq(yugiohSingles.id, Number(id)));

  const single = row[0];

  if (!single) {
    return Response.json({ error: "Card not found" }, { status: 404 });
  }

  const printings = await db
    .select()
    .from(yugiohPrintings)
    .where(eq(yugiohPrintings.yugiohId, single.yugiohId));

  return Response.json({
    data: single,
    printings,
  });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();

    const updated = await db
      .update(yugiohSingles)
      .set({
        price: body.price,
      })
      .where(eq(yugiohSingles.id, Number(id)))
      .returning();

    if (!updated.length) {
      return Response.json({ error: "Card not found" }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: updated[0],
    });
  } catch (err: any) {
    console.error("POKEMON UPDATE ERROR:", err);

    return Response.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function DELETE(req, ctx) {
  const { id } = await ctx.params;

  // Get the current quantity
  const card = await db
    .select()
    .from(yugiohSingles)
    .where(eq(yugiohSingles.id, Number(id)))
    .limit(1);

  if (!card.length) {
    return Response.json({ error: "Card not found" }, { status: 404 });
  }

  const currentQty = card[0].quantity;

  if (currentQty > 1) {
    // Decrement quantity
    const updated = await db
      .update(yugiohSingles)
      .set({ quantity: currentQty - 1 })
      .where(eq(yugiohSingles.id, Number(id)))
      .returning();

    return Response.json({ data: updated[0] });
  }

  // If quantity is 1, delete the row
  await db.delete(yugiohSingles).where(eq(yugiohSingles.id, Number(id)));

  return Response.json({ success: true });
}
