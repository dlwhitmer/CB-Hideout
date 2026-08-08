import { db } from "../db";
import { yugiohSingles } from "../schema";
import { eq } from "drizzle-orm";

export async function getYugiohSingle(id: number) {
  const rows = await db
    .select()
    .from(yugiohSingles)
    .where(eq(yugiohSingles.id, id));

  return rows[0] || null;
}
