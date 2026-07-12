import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const rows = await db
    .select({
      set_code: magicSingles.set_code,
      set_name: magicSingles.set_name,
    })
    .from(magicSingles)
    .groupBy(magicSingles.set_code);

  return Response.json(rows);
}
