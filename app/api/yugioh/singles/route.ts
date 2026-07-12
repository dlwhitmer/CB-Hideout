import { db } from "../../../../lib/db/db";
import { yugiohSingles } from "../../../../lib/db/schema";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = 20; // adjust if you want more/less per page

  const offset = (page - 1) * pageSize;

  // Total count (needed for pagination)
  const allRows = await db.select().from(yugiohSingles);
  const total = allRows.length;

  // Paginated rows
  const rows = await db
    .select()
    .from(yugiohSingles)
    .limit(pageSize)
    .offset(offset);

  return Response.json({
    rows,
    total,
    pageSize,
  });
}
