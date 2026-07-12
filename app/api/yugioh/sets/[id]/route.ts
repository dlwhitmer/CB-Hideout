import { db } from "../../../../../lib/db/db";
import { yugiohSets } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const row = await db
    .select()
    .from(yugiohSets)
    .where(eq(yugiohSets.id, Number(params.id)));

  return Response.json({ data: row[0] });
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  const updated = await db
    .update(yugiohSets)
    .set(body)
    .where(eq(yugiohSets.id, Number(params.id)))
    .returning();

  return Response.json({ data: updated[0] });
}
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db
    .delete(yugiohSets)
    .where(eq(yugiohSets.id, Number(params.id)));

  return Response.json({ success: true });
}
