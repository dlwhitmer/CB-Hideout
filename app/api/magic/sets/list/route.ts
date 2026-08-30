import { db } from "../../../../../lib/db/db";
import { magicCards } from "../../../../../lib/db/schema/magic_cards";

export async function GET() {
  const rows = await db
    .selectDistinct({
      setCode: magicCards.setCode,
      setName: magicCards.setName,
    })
    .from(magicCards)
    .orderBy(magicCards.setName);

  return Response.json(rows);
}
