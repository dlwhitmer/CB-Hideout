import { db } from "../../../../../lib/db/db";
import { lorcanaSets } from "../../../../../lib/db/schema";

export async function GET() {
  const rows = await db
    .select({
      SetID: lorcanaSets.SetID,
      Name: lorcanaSets.Name,
    })
    .from(lorcanaSets)
    .orderBy(lorcanaSets.SetID);
    console.log("ADMIN ROUTE DB SETS:", rows);

  return Response.json(rows);
}
