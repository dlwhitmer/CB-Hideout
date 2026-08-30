import { db } from "../../../../../lib/db/db";
import { yugiohSets } from "../../../../../lib/db/schema/yugioh_singles";
import { sql } from "drizzle-orm";

export async function GET() {
  const rows = await db
    .select({
      set_name: yugiohSets.setName,
      set_code: yugiohSets.setCode,
    })
    .from(yugiohSets);

  return Response.json({ data: rows });
}
