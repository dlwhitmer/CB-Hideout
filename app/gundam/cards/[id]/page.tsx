// ❌ REMOVE "use client"
import { db } from "../../../../lib/db/db";
import { gundamCards } from "../../../../lib/db/schema";
import { eq } from "drizzle-orm";
import GundamCardsDisplay from "../../../components/gundam/detail/gundamdisplaypage";

export default async function GundamCardsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const card = await db
    .select()
    .from(gundamCards)
    .where(eq(gundamCards.productID, id));

  const product = card[0];

  return (
    <div className="min-h-screen bg-[url('/images/bg-23.webp')] bg-no-repeat bg-[length:100%_100%]">
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
    
      <GundamCardsDisplay product={product} />
    </main>
    </div>
  );
}
