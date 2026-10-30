
import { db } from "../../../../lib/db/db";
import { gundamSingles } from "../../../../lib/db/schema";
import { eq } from "drizzle-orm";
import GundamSinglesDisplay from "../../../components/gundam/singles/detail/gundamsinglesdisplay";
export default async function LorcanaSinglesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const card = await db
    .select()
    .from(gundamSingles)
    .where(eq(gundamSingles.productId, id));

  const product = card[0];

  return (
    <div className="min-h-screen bg-[url('/images/backgrounds/bg-23.webp')] bg-no-repeat bg-text[100%_100%]">
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <GundamSinglesDisplay product={product} />
    </main>
    </div>
  );
}
