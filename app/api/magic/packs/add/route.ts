import { db } from "../../../../../lib/db/db";
import { magicPacks } from "../../../../../lib/db/schema";

export async function POST(req: Request) {
  const body = await req.json();

  const inserted = await db.insert(magicPacks).values(body).returning();
  return Response.json({ data: inserted[0] });
}
