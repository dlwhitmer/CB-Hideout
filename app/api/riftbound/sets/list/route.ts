import { db } from "../../../../../lib/db/db";
import{riftboundCards} from "../../../../../lib/db/schema";
export async function GET() {
  const rows = await db
    .selectDistinct({
      setCode: riftboundCards.set,
      setName: riftboundCards.setName,
    })
    .from(riftboundCards)
    .orderBy(riftboundCards.setName);

  return Response.json(rows);
}
