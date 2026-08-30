// ❌ REMOVE "use client"
import { DetailPageParams } from "../../../../types/route-params";
import { db } from "../../../../lib/db/db";
import {magicCards} from "../../../../lib/db/schema/magic_cards";
import { eq } from "drizzle-orm";
import MagicCardsDisplay from "../../../components/magic/cards/detail/magiccardsdisplay";
export const dynamic = "force-dynamic";

export default async function MagicCardsDetailPage({ params }: DetailPageParams) {
  const p = await params;
  const id = Number(p.id);

  const result = await db
    .select()
    .from(magicCards)
    .where(eq(magicCards.id, id));

  const product = result[0];

  return (
    <main className="w-max-full mx-auto space-y-10">
      <div className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-[length:100%_100%] p-2">
        <MagicCardsDisplay product={product} />
      </div>
    </main>
  );
}
