import { db } from "../../../../lib/db/db";
import { yugiohSets } from "../../../../lib/db/schema";


export async function GET() {
  const rows = await db.select().from(yugiohSets);
  return Response.json({ data: rows });
}