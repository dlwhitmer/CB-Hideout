import { DetailPageParams } from "../../../../types/route-params";
import { db } from "../../../../lib/db/db";
import * as yugioh from "../../../../lib/db/schema/yugioh";
import { eq } from "drizzle-orm";
import YugiohDisplay from "../../../components/yugioh/singles/detail/yugiohdisplay";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: DetailPageParams) {
  const p = await params;
  const id = Number(p.id);

  // Fetch product
  const result = await db
    .select()
    .from(yugioh.yugiohSingles)
    .where(eq(yugioh.yugiohSingles.id, id));

  const product = result[0];

  if (!product) {
    return <p className="p-6 text-red-400">Product not found.</p>;
  }
  console.log("product.id =", product.id);

  const printingResult = await db
    .select()
    .from(yugioh.yugiohPrintings)
    .where(eq(yugioh.yugiohPrintings.yugiohId, product.yugiohId));

  console.log("printingResult =", printingResult);

  const printing = printingResult[0];

  if (!printing) {
    return <p>No printing data found.</p>;
  }

  // Parse link markers
  const markers = JSON.parse(product.linkmarkers || "[]");
  const subtypes = product.typeline
    .split(",")
    .map((t) => t.trim().toLowerCase());

  const isXYZ = subtypes.includes("xyz");

  return (
       <main className="  w-max-full mx-auto space-y-10">
          {/* Top: Image + Header + Stats */}
          <div className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-[length:100%_100%] p-2">
            <YugiohDisplay product={product} printing={printing}/>
          </div>
        </main>
  );
}
