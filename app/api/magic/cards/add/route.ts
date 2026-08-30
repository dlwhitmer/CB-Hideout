import { db } from "../../../../../lib/db/db";
import { magicCards } from "../../../../../lib/db/schema/magic_cards";

export async function POST(req: Request) {
  const body = await req.json();
  const inserted = await db.insert(magicCards).values(body).returning();
  return Response.json({ data: inserted[0] });
}
