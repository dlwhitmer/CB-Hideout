import { DetailPageParams } from "@/types/route-params";
import { db } from "@/lib/db";
import * as yugioh from "@/lib/db/schema/yugioh";
import { eq } from "drizzle-orm";
import BackButton from "@/app/backtopokemonbutton";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: DetailPageParams) {
  const p = await params;
  const id = p.id;

  const result = await db
    .select()
    .from(yugioh.yugiohCards)
    .where(eq(yugioh.yugiohCards.id, Number(id)));

  const product = result[0];

  if (!product) {
    return <p className="p-6 text-red-400">Product not found.</p>;
  }

  return (
    <main className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-[length:100%_100%]">
  <div className="p-6 max-w-5xl mx-auto text-white">
    <div className="flex flex-col md:flex-row gap-10">

      {/* Image */}
      <div className="flex-shrink-0">
        <Image
          src={product.image_large || "/placeholder.png"}
          alt={product.name ?? ""}
          width={320}
          height={420}
          className="rounded shadow"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4 flex-1 pt-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>

        <div className="grid grid-cols-2 gap-y-2 text-white leading-tight whitespace-normal">
          <p>
            <span className="font-semibold">Type:</span> {product.type}
          </p>
          <p>
            <span className="font-semibold">Race:</span> {product.race}
          </p>

          {product.attribute && (
            <p>
              <span className="font-semibold">Attribute:</span> {product.attribute}
            </p>
          )}

          {product.level && (
            <p>
              <span className="font-semibold">Level:</span> {product.level}
            </p>
          )}

          {product.atk !== null && (
            <p>
              <span className="font-semibold">ATK:</span> {product.atk}
            </p>
          )}

          {product.def !== null && (
            <p>
              <span className="font-semibold">DEF:</span> {product.def}
            </p>
          )}

          {product.archetype && (
            <p>
              <span className="font-semibold">Archetype:</span> {product.archetype}
            </p>
          )}
        </div>

        {/* Description */}
        {product.desc && (
          <div className="bg-black/40 p-4 rounded leading-relaxed whitespace-pre-line">
            {product.desc}
          </div>
        )}

        {/* Price + Back */}
        <div className="flex justify-left items-center gap-6">
          <p className="text-green-400 text-2xl font-bold">
            ${Number(product.price || 0).toFixed(2)}
          </p>
          <BackButton />
        </div>
      </div>

    </div>
  </div>
</main>

  );
}
