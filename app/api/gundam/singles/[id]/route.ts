import { db } from "../../../../../lib/db/db";
import { gundamSingles } from "../../../../../lib/db/schema";
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
      .from(gundamSingles)
      .where(eq(gundamSingles.id, cardId))
      .limit(1);

    if (results.length === 0) {
      return Response.json({ error: "Card not found." }, { status: 404 });
    }

    return Response.json({ data: results[0] });
  } catch (error) {
    console.error("GET Gundam SINGLE ERROR:", error);

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
    const ourPrice =
      body.ourPrice === "" || body.ourPrice == null
        ? null
        : Number(body.ourPrice);

    if (
      ourPrice !== null &&
      (!Number.isFinite(ourPrice) || ourPrice < 0)
    ) {
      return Response.json(
        { error: "Please enter a valid price." },
        { status: 400 },
      );
    }
    const condition = body.condition;
    const result = await db
      .update(gundamSingles)
      .set({
        ourPrice,
        condition,
      })
      .where(eq(gundamSingles.id, cardId))
      .returning({ id: gundamSingles.id });
    if (result.length === 0) {
      return Response.json({ error: "Card not found." }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("UPDATE Gundam SINGLE ERROR:", error);

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
      .delete(gundamSingles)
      .where(eq(gundamSingles.id, cardId))
      .returning({ id: gundamSingles.id });

    if (result.length === 0) {
      return Response.json({ error: "Card not found." }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("DELETE Gundam SINGLE ERROR:", error);

    return Response.json({ error: "Failed to delete card." }, { status: 500 });
  }
}
