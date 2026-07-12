import { db } from "../../../../lib/db/db";
import { magicSets } from "../../../../lib/db/schema";


export async function GET() {
  const rows = await db.select().from(magicSets);
  return Response.json({ data: rows });
}