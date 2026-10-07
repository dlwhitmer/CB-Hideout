
import { DetailPageParams } from "../../../../types/route-params";
import { db } from "../../../../lib/db/db";
import { lorcanaCards } from "../../../../lib/db/schema";
import { eq } from "drizzle-orm";
import LorcanaCardDisplayPage from "../../../components/lorcana/detail/lorcanadisplaypage";
export const dynamic = "force-dynamic";

export default async function LorcanaCardsDetailPage({ params }: DetailPageParams) {
  const p = await params;
  const id = Number(p.id);

  const result = await db
    .select()
    .from(lorcanaCards)
    .where(eq(lorcanaCards.id, id));

  const product = result[0];

  return (
    <main className="w-max-full mx-auto space-y-10">
      <div className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-[length:100%_100%] p-2">
        <LorcanaCardDisplayPage product={product}/>
      </div>
    </main>
  );
}
