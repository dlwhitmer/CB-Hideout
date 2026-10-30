// ❌ REMOVE "use client"
import { DetailPageParams } from "../../../../types/route-params";
import { db } from "../../../../lib/db/db";
import { magicSingles } from "../../../../lib/db/schema";
import { magicPrices } from "../../../../lib/db/schema";
import { eq } from "drizzle-orm";
import MagicSinglesDisplay from "../../../components/magic/singles/detail/magicsingledisplay";

export const dynamic = "force-dynamic";

export default async function MagicSingleDetailPage({
  params,
}: DetailPageParams) {
  const p = await params;
  const id = Number(p.id);

  const result = await db
    .select()
    .from(magicSingles)
    .where(eq(magicSingles.id, id));

  const product = result[0];
  const results = await db
    .select()
    .from(magicPrices)
    .where(eq(magicPrices.scryfallId, product.scryfallId))
    .limit(1);

  const price = results[0] ?? null;

  return (
    <main className="w-max-full mx-auto space-y-10">
      <div className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-[length:100%_100%] p-2">
        <MagicSinglesDisplay product={product} price={price} />
      </div>
    </main>
  );
}
