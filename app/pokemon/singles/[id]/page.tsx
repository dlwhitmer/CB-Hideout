import { DetailPageParams } from "../../../../types/route-params";
import { db } from "../../../../lib/db/db";
import { pokemonSingles } from "../../../../lib/db/schema/pokemon";
import { eq } from "drizzle-orm";
import PokemonDisplay from "../../../components/pokemon/singles/detail/pokemondisplay";


export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: DetailPageParams) {
  
  const p = await params;
  const id = Number(p.id);

  // Fetch product
  const result = await db
    .select()
    .from(pokemonSingles)
    .where(eq(pokemonSingles.id, id));

  const product = result[0];
  

  return (
    <main className="  w-max-full mx-auto space-y-10">
      {/* Top: Image + Header + Stats */}
      <div className="min-h-screen bg-[url('/images/bg-3.webp')] bg-no-repeat bg-[length:100%_100%] p-2">
        <PokemonDisplay product={product}/>
      </div>
    </main>
  );
}
