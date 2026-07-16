import { DetailPageParams } from "../../../../types/route-params";
import { db } from "../../../../lib/db/db";
import * as yugioh from "../../../../lib/db/schema/yugioh";
import { eq } from "drizzle-orm";
import BackButton from "../../../../app/backtoyugiohbutton";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: DetailPageParams) {
  const p = await params;
  const id = p.id;

  const result = await db
    .select()
    .from(yugioh.yugiohSingles)
    .where(eq(yugioh.yugiohSingles.id, Number(id)));

  const product = result[0];

  if (!product) {
    return <p className="p-6 text-red-400">Product not found.</p>;
  }

  return (
    <main className="min-h-screen bg-[url('/images/bg-44.webp')] bg-no-repeat bg-[length:100%_100%]">
      <div className="p-6 max-w-5xl mx-auto text-white">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image */}
          <div className="flex-shrink-0">
            <Image
              src={product.imageLarge || "/placeholder.png"}
              alt={product.name ?? ""}
              width={320}
              height={420}
              className="rounded shadow"
            />
          </div>

          {/* Info */}
          <div className="bg-[#ffffffB3] h-[400px] w-[250px] flex flex-col gap-4 flex-auto pl-10 pt-4">
            <h1 className="text-black text-3xl font-bold">{product.name}</h1>

            <div className="grid grid-cols-2 gap-y-2 text-black leading-tight whitespace-normal">
              <p>
                <span className="font-semibold">Type: </span>
                <span className="font-semibold">{product.type}</span>
              </p>
              <p>
                <span className="font-semibold">Race:</span>
                <span className="font-semibold"> {product.race}</span>
              </p>

              {product.attribute && (
                <p>
                  <span className="font-semibold">Attribute:</span>
                  <span className="font-semibold"> {product.attribute}</span>
                </p>
              )}

              {product.level && (
                <p>
                  <span className="font-semibold">Level:</span>
                  <span className="font-semibold"> {product.level}</span>
                </p>
              )}

              {product.atk !== null && (
                <p>
                  <span className="font-semibold">ATK:</span>
                  <span className="font-semibold"> {product.atk}</span>
                </p>
              )}

              {product.def !== null && (
                <p>
                  <span className="font-semibold">DEF:</span>
                  <span className="font-semibold"> {product.def}</span>
                </p>
              )}

              {product.archetype && (
                <p>
                  <span className="font-semibold">Archetype:</span>
                  <span className="font-semibold"> {product.archetype}</span>
                </p>
              )}

              <p>
                <span className="font-semibold">In-Stock:</span>
                <span className="font-semibold"> {product.quantity}</span>
              </p>

              <p className="col-span-2">
                <span className="font-bold">Description:</span>{" "}
                <span className="font-semibold">{product.desc}</span>
              </p>
            </div>

            {/* Price + Back */}
            <div className="flex justify-left items-center gap-10">
              <p className="text-black text-2xl font-bold">
                Price ${Number(product.price || 0).toFixed(2)}
              </p>
              <BackButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
