import { db } from "../../../../../lib/db/db";
import { gundamCards } from "../../../../../lib/db/schema/gundam_cards";

export async function GET() {
  const rows = await db
    .selectDistinct({
      set_code: gundamCards.setCode,
      set_name: gundamCards.setName,
    })
    .from(gundamCards)
    .orderBy(gundamCards.setName);

  const mapped = rows.map(r => ({
    setCode: r.set_code,
    setName: r.set_name,
  }));

  return Response.json(mapped);
}
