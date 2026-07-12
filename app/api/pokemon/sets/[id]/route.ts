import { db } from "../../../../../lib/db/db";
import { pokemonSets } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const row = await db
    .select()
    .from(pokemonSets)
    .where(eq(pokemonSets.id, Number(params.id)));

  return Response.json({ data: row[0] });
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  const updated = await db
    .update(pokemonSets)
    .set(body)
    .where(eq(pokemonSets.id, Number(params.id)))
    .returning();

  return Response.json({ data: updated[0] });
}
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db
    .delete(pokemonSets)
    .where(eq(pokemonSets.id, Number(params.id)));

  return Response.json({ success: true });
}
