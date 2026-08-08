import { DetailPageParams } from "../../../../types/route-params";
import { db } from "../../../../lib/db/db";
import { magicSingles } from "../../../../lib/db/schema/magic";
import { eq } from "drizzle-orm";
import MagicDisplay from "../../../components/magic/singles/detail/magicdisplay";


export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: DetailPageParams) {
  
  const p = await params;
  const id = Number(p.id);

  // Fetch product
  const result = await db
    .select()
    .from(magicSingles)
    .where(eq(magicSingles.id, id));

  const product = result[0];
  

  return (
    <main className="  w-max-full mx-auto space-y-10">
      {/* Top: Image + Header + Stats */}
      <div className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-[length:100%_100%] p-2">
        <MagicDisplay product={product}/>
      </div>
    </main>
  );
}
