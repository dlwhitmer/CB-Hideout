import { db } from "../../../../../lib/db/db";
import { pokemonPacks } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const row = await db
    .select()
    .from(pokemonPacks)
    .where(eq(pokemonPacks.id, Number(params.id)));

  return Response.json({ data: row[0] });
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  const updated = await db
    .update(pokemonPacks)
    .set(body)
    .where(eq(pokemonPacks.id, Number(params.id)))
    .returning();

  return Response.json({ data: updated[0] });
}
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db
    .delete(pokemonPacks)
    .where(eq(pokemonPacks.id, Number(params.id)));

  return Response.json({ success: true });
}
