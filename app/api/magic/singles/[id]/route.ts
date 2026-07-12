import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema/magic";
import { eq } from "drizzle-orm";

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;

  const row = await db
    .select()
    .from(magicSingles)
    .where(eq(magicSingles.id, Number(id)));

  return Response.json({ data: row[0] });
}
