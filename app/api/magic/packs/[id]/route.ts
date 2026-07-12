import { db } from "../../../../../lib/db/db";
import { magicPacks } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const row = await db
    .select()
    .from(magicPacks)
    .where(eq(magicPacks.id, Number(params.id)));

  return Response.json({ data: row[0] });
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  const updated = await db
    .update(magicPacks)
    .set(body)
    .where(eq(magicPacks.id, Number(params.id)))
    .returning();

  return Response.json({ data: updated[0] });
}
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db
    .delete(magicPacks)
    .where(eq(magicPacks.id, Number(params.id)));

  return Response.json({ success: true });
}
