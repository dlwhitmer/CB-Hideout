import { DetailPageParams } from "../../../../types/route-params";
import { db } from "../../../../lib/db/db";
import { eq } from "drizzle-orm";
import BackButton from "../../../backtomagicbutton";
import { magicSingles } from "../../../../lib/db/schema";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: DetailPageParams) {
  const p = await params;
  const id = p.id;

  const result = await db
    .select()
    .from(magicSingles)
    .where(eq(magicSingles.id, Number(id)));

  const product = result[0];
  const faces = product.card_faces ? JSON.parse(product.card_faces) : null;

  const front = product.image_small ?? "/placeholder.png";
  const back = faces?.[1]?.image_uris?.small;
  console.log("FRONT:", front);
  console.log("BACK:", back);

  if (!product) {
    return <p className="p-6 text-red-400">Product not found.</p>;
  }
  // console.log(product.card_faces);
  // console.log(product.image_small);
  console.log("Front:", front);
  console.log("Back:", back);
  console.log("cardFaces:", product.card_faces);

  return (
    <main className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-[length:100%_100%]">
      <div className="p-6 max-w-5xl mx-auto text-white">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-shrink-0">
            <div className="group perspective w-[320px] aspect-[63/88]">
              <div
                className={`relative w-full h-full transform-style-preserve-3d transition-transform duration-500 ${
                  back ? "group-hover:rotate-y-180" : ""
                }`}
              >
                {/* Front */}
                <img
                  src={front}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full rounded-lg shadow-lg backface-hidden"
                />

                {/* Back */}
                {back && (
                  <img
                    src={back}
                    alt={`${product.name} (Back Face)`}
                    className="absolute inset-0 w-full h-full rounded-lg shadow-lg backface-hidden rotate-y-180"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 pt-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="grid grid-cols-2 gap-y-2 text-white">
              <p>
                <span className="font-semibold">Set:</span> {product.set_code}
              </p>
              <p>
                <span className="font-semibold">Collector #:</span>{" "}
                {product.collector_number}
              </p>
              <p>
                <span className="font-semibold">Rarity:</span> {product.rarity}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {product.type_line}
              </p>
              <p>
                <span className="font-semibold">Artist:</span> {product.artist}
              </p>
              <p>
                <span className="font-semibold">In Stock:</span>{" "}
                {product.quantity}
              </p>
            </div>

            {product.oracle_text && (
              <div className="bg-black/40 p-4 rounded leading-relaxed whitespace-pre-line">
                {product.oracle_text}
              </div>
            )}

            {product.description && (
              <div className="bg-gray-500/40 p-4 rounded font-bold text-white leading-relaxed">
                {product.description}
              </div>
            )}

            <div className="flex justify-left items-center gap-6">
              <p className="text-green-400 text-2xl font-bold">
                ${product.price}
              </p>
              <BackButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
