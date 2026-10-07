import { db } from "../../../../../lib/db/db";
import{riftBoundCards} from "../../../../../lib/db/schema";
export async function GET() {
  const rows = await db
    .selectDistinct({
      setCode: riftBoundCards.set,
      setName: riftBoundCards.setName,
    })
    .from(riftBoundCards)
    .orderBy(riftBoundCards.setName);

  return Response.json(rows);
}
