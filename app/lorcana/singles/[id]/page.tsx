
import { db } from "../../../../lib/db/db";
import {lorcanaSingles } from "../../../../lib/db/schema";
import { eq } from "drizzle-orm";
import LorcanaSinglesDisplayPage from "../../../components/lorcana/singles/detail/lorcanasinglesdisplaypage";

export default async function LorcanaSinglesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const card = await db
    .select()
    .from(lorcanaSingles)
    .where(eq(lorcanaSingles.UniqueId, id));

  const product = card[0];

  return (
    <div className="min-h-screen bg-[url('/images/bg-23.webp')] bg-no-repeat bg-text[100%_100%]">
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <LorcanaSinglesDisplayPage product={product} />
    </main>
    </div>
  );
}
