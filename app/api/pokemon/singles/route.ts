import { db } from "../../../../lib/db/db";
import { pokemonSingles } from "../../../../lib/db/schema/pokemon";
import { eq, like, and } from "drizzle-orm";

export async function GET(req: Request) {
  console.log("🔥 POKEMON SINGLES LIST ROUTE HIT");
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = 20;

  const offset = (page - 1) * pageSize;

  // Total count (needed for pagination)
  const allRows = await db.select().from(pokemonSingles);
  const total = allRows.length;
  console.log("CARD COUNT:", allRows.length);
  console.log("FIRST CARD:", allRows[0]);
  // Paginated rows
  const rows = await db
    .select()
    .from(pokemonSingles)
    .limit(pageSize)
    .offset(offset);
  return Response.json({
    data: rows,
    total,
    pageSize,
  });
}
