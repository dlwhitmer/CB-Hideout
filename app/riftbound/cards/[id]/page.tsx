import { DetailPageParams } from "../../../../types/route-params";
import { db } from "../../../../lib/db/db";
import { eq } from "drizzle-orm";
import { riftboundCards } from "../../../../lib/db/schema";
import RiftBoundCardDisplayPage from "../../../components/riftbound/detail/riftbounddisplaypage";
export const dynamic = "force-dynamic";
export default async function RiftBoundCardsDetailPage({
  params,
}: DetailPageParams) {
  const p = await params;
  const id = Number(p.id);

   const result = await db
      .select()
      .from(riftboundCards)
      .where(eq(riftboundCards.id, id));
  
    const product = result[0];

  return (
     <main className="w-max-full mx-auto space-y-10">
          <div className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-[length:100%_100%] p-2">
          <RiftBoundCardDisplayPage product={product}/>
          </div>
        </main>
      );
}
