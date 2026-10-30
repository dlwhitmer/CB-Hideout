import { db } from "../../../../../lib/db/db";
import { riftboundSingles } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cardId = Number(id);

    if (!Number.isInteger(cardId) || cardId <= 0) {
      return Response.json({ error: "Invalid card ID." }, { status: 400 });
    }

    const results = await db
      .select()
      .from(riftboundSingles)
      .where(eq(riftboundSingles.id, cardId))
      .limit(1);

    if (results.length === 0) {
      return Response.json({ error: "Card not found." }, { status: 404 });
    }

    return Response.json({ data: results[0] });
  } catch (error) {
    console.error("GET ONE PIECE SINGLE ERROR:", error);

    return Response.json({ error: "Failed to load card." }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cardId = Number(id);

    if (!Number.isInteger(cardId) || cardId <= 0) {
      return Response.json({ error: "Invalid card ID." }, { status: 400 });
    }

    const body = await req.json();
    const ourOnePrice =
      body.ourOnePrice === "" || body.ourOnePrice == null
        ? null
        : Number(body.ourOnePrice);

    if (
      ourOnePrice !== null &&
      (!Number.isFinite(ourOnePrice) || ourOnePrice < 0)
    ) {
      return Response.json(
        { error: "Please enter a valid price." },
        { status: 400 },
      );
    }
    const condition = body.condition;
    const result = await db
      .update(riftboundSingles)
      .set({
        condition,
      })
      .where(eq(riftboundSingles.riftboundId, id))
      .returning({ id: riftboundSingles.id });
    if (result.length === 0) {
      return Response.json({ error: "Card not found." }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("UPDATE ONE PIECE SINGLE ERROR:", error);

    return Response.json(
      { error: "Failed to save card price." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cardId = Number(id);

    if (!Number.isInteger(cardId) || cardId <= 0) {
      return Response.json({ error: "Invalid card ID." }, { status: 400 });
    }

    const result = await db
      .delete(riftboundSingles)
      .where(eq(riftboundSingles.id, cardId))
      .returning({ id: riftboundSingles.id });

    if (result.length === 0) {
      return Response.json({ error: "Card not found." }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE ONE PIECE SINGLE ERROR:", error);

    return Response.json({ error: "Failed to delete card." }, { status: 500 });
  }
}
