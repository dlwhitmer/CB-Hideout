// ❌ REMOVE "use client"
import { DetailPageParams } from "../../../../types/route-params";
import { db } from "../../../../lib/db/db";
import { onePieceSingles } from "../../../../lib/db/schema";
import { eq } from "drizzle-orm";


export const dynamic = "force-dynamic";

export default async function OnePieceSingleDetailPage({
  params,
}: DetailPageParams) {
  const p = await params;
  const id = Number(p.id);

  const result = await db
    .select()
    .from(onePieceSingles)
    .where(eq(onePieceSingles.id, id));

  // const product = result[0];
  // const results = await db
  //   .select()
  //   .from(magicPrices)
  //   .where(eq(magicPrices.scryfallId, product.scryfallId))
  //   .limit(1);

  // const price = results[0] ?? null;

  return (
    <main className="w-max-full mx-auto space-y-10">
      <div className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-size[100%_100%] p-2">
        
      </div>
    </main>
  );
}
