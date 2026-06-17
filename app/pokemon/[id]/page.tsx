import { DetailPageParams } from "@/types/route-params";
import { db } from "@/lib/db";
import * as pokemon from "@/lib/db/schema/pokemon";
import { eq } from "drizzle-orm";
import BackButton from "@/app/backtopokemonbutton";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: DetailPageParams) {
  const p = await params;
  const id = p.id;

  const result = await db
    .select()
    .from(pokemon.pokemonCards)
    .where(eq(pokemon.pokemonCards.id, Number(id)));

  const product = result[0];

  if (!product) {
    return <p className="p-6 text-red-400">Product not found.</p>;
  }

  return (
    <main className="min-h-screen bg-[url('/images/bg-27.webp')] bg-no-repeat bg-[length:100%_100%]">
      <div className="p-6 max-w-5xl mx-auto text-white">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-shrink-0">
            <Image
              src={product.imageLarge || "/placeholder.png"}
              alt={product.name ?? ""}
              width={320}
              height={320}
              className="rounded shadow"
            />
          </div>

          <div className="bg-[#ffffffB3] h-[400px] w-[250px] flex flex-col gap-4 flex-auto pl-10 pt-4">
            <h1 className="text-3xl text-black font-bold">{product.name}</h1>

            <div className="grid grid-cols-2 gap-y-2 text-black">
              <p>
                <span className="font-semibold">Set:</span>
                <span className="font-semibold">  {product.setCode}</span> 
              </p>
              <p>
                <span className="font-semibold">Collector #</span>
                <span className="font-semibold"> {product.cardNumber}</span>
                
              </p>
              <p>
                <span className="font-semibold">Rarity:</span>
                <span className="font-semibold">   {product.rarity}</span>
              </p>
              <p>
                <span className="font-semibold">Type:</span> 
                <span className="font-semibold">  {product.types}</span> 
              </p>
              <p>
                <span className="font-semibold">Artist:</span> 
                <span className="font-semibold">  {product.artist}</span> 
              </p>
              <p>
                <span className="font-semibold">In-Stock:</span> 
                <span className="font-semibold">  {product.quantity}</span> 
              </p>
              
              <p className="col-span-2">
                <span className="font-bold">Description:</span>{" "}
                <span className="font-semibold">{product.flavorText}</span>
              </p>
            </div>

            <div className="flex justify-left items-center gap-10">
              <p className="text-black text-2xl font-bold">${product.price}</p>
              <BackButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
