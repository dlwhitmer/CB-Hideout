import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema/magic_singles";
import { magicPrices } from "../../../../../lib/db/schema/magic_prices";
import { eq } from "drizzle-orm";

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;

  const rows = await db
    .select()
    .from(magicSingles)
    .where(eq(magicSingles.id, Number(id)))
    .limit(1);

  const card = rows[0];

  if (!card) {
    return Response.json({ error: "Card not found" }, { status: 404 });
  }

  const priceRows = await db
    .select()
    .from(magicPrices)
    .where(eq(magicPrices.scryfallId, card.scryfallId))
    .limit(1);

  const prices = priceRows[0];

  return Response.json({
    data: {
      ...card,
      usd: prices?.usd ?? null,
      usdFoil: prices?.usdFoil ?? null,
      usdEtched: prices?.usdEtched ?? null,
      ourPrice: prices?.ourPrice ?? null,
      ourFoil: prices?.ourFoil ?? null,
      ourEtched: prices?.ourEtched ?? null,
    },
  });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const body = await req.json();

  const rows = await db
    .select()
    .from(magicSingles)
    .where(eq(magicSingles.id, Number(id)))
    .limit(1);

  const card = rows[0];

  if (!card) {
    return Response.json({ error: "Card not found" }, { status: 404 });
  }

  const ourPrice =
    body.ourPrice === null || body.ourPrice === ""
      ? null
      : Number(body.ourPrice);

  if (ourPrice !== null && (!Number.isFinite(ourPrice) || ourPrice < 0)) {
    return Response.json({ error: "Invalid price" }, { status: 400 });
  }

  const existingPrice = await db
    .select()
    .from(magicPrices)
    .where(eq(magicPrices.scryfallId, card.scryfallId))
    .limit(1);

  if (existingPrice.length > 0) {
    await db
      .update(magicPrices)
      .set({
        usd: body.usd,
        ourPrice: body.ourPrice,
      })
      .where(eq(magicPrices.scryfallId, card.scryfallId));
  } else {
    await db.insert(magicPrices).values({
      scryfallId: card.scryfallId,
      ourPrice,
      fetchedAt: Math.floor(Date.now() / 1000),
    });
  }

  return Response.json({
    success: true,
    ourPrice,
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  const inserted = await db.insert(magicSingles).values(body).returning();

  return Response.json({ data: inserted[0] });
}

export async function DELETE(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;

  const card = await db
    .select()
    .from(magicSingles)
    .where(eq(magicSingles.id, Number(id)))
    .limit(1);

  if (!card.length) {
    return Response.json({ error: "Card not found" }, { status: 404 });
  }

  const currentQty = card[0].quantity ?? 0;

  if (currentQty > 1) {
    const updated = await db
      .update(magicSingles)
      .set({ quantity: currentQty - 1 })
      .where(eq(magicSingles.id, Number(id)))
      .returning();

    return Response.json({ data: updated[0] });
  }

  await db.delete(magicSingles).where(eq(magicSingles.id, Number(id)));

  return Response.json({ success: true });
}
