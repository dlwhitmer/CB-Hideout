import { db } from "../../../../../lib/db/db";
import { magicSingles } from "../../../../../lib/db/schema/magic";

export async function GET() {
  const rows = await db
    .select({
      set_code: magicSingles.setCode,
      set_name: magicSingles.setName,
    })
    .from(magicSingles)
    .groupBy(
      magicSingles.setCode,
      magicSingles.setName
    )
    .orderBy(magicSingles.setName);

  return Response.json(rows);
}
