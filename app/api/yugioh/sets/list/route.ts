import { db } from "../../../../../lib/db/db";
import { yugiohSingles } from "../../../../../lib/db/schema/yugioh";
import { sql } from "drizzle-orm";

export async function GET() {
 const rows = await db
  .select({
    set_code: yugiohSingles.primarySet,
    set_name: yugiohSingles.primarySet,
  })
  .from(yugiohSingles)
  .groupBy(yugiohSingles.primarySet);
  
return Response.json({
  data: rows,
});
}