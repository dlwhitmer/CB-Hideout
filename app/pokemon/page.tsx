import Image from "next/image";
import { db } from "@/lib/db";
import { pokemonCards } from "@/lib/db/schema/pokemon";
import { eq, like, and, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    type?: string;
    rarity?: string;
  };
}) {
  const page = Number(searchParams?.page ?? 1);
  const type = searchParams?.type ?? "";
  const rarity = searchParams?.rarity ?? "";

  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  // ---------------------------
  // DATA QUERY
  // ---------------------------
  const rows = await db
    .select()
    .from(pokemonCards)
    .where(
      and(
        type ? like(pokemonCards.types, `%${type}%`) : undefined,
        rarity ? eq(pokemonCards.rarity, rarity) : undefined
      )
    )
    .limit(pageSize)
    .offset(offset);

  // ---------------------------
  // COUNT QUERY
  // ---------------------------
  const totalResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(pokemonCards);

  const total = totalResult[0]?.count ?? 0;
  const totalPages = Math.ceil(total / pageSize);

  // ---------------------------
  // RENDER
  // ---------------------------
  return (
    <div className="min-h-screen bg-[url('/images/bg-17.webp')] bg-no-repeat bg-[length:100%_100%]">
      
      {/* FILTER BAR */}
      <form className="flex gap-4 mb-4 pt-3 text-white">
        <select
          name="type"
          defaultValue={type}
          className="bg-gray-800 border border-gray-600 p-2 rounded"
        >
          <option value="">All Types</option>
          <option value="Creature">Creature</option>
          <option value="Instant">Instant</option>
          <option value="Sorcery">Sorcery</option>
          <option value="Artifact">Artifact</option>
          <option value="Enchantment">Enchantment</option>
          <option value="Planeswalker">Planeswalker</option>
          <option value="Land">Land</option>
        </select>

        <select
          name="rarity"
          defaultValue={rarity}
          className="bg-gray-800 border border-gray-600 p-2 rounded"
        >
          <option value="">All Rarities</option>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="mythic">Mythic</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </form>

      {/* TITLE */}
      <div className="flex justify-center">
        <Image
          src="/images/pokemon.webp"
          alt="Pokemon"
          width={300}
          height={100}
          className="h-[80px] md:h-[300px] lg:h-[90px] object-contain"
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-5 gap-6">
        {rows.map((p) => (
          <a
            key={p.id}
            href={`/pokemon/${p.id}`}
            className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition block"
          >
            <Image
              src={p.imageLarge || "/placeholder.png"}
              alt={p.name || "Pokemon card"}
              width={320}
              height={446}
              className="rounded shadow"
            />

            <h2 className="font-semibold text-sm text-white text-center">
              {p.name}
            </h2>

            <p className="text-gray-400 text-sm">${p.price}</p>
          </a>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-8 text-white">
        {page > 1 && (
          <a
            href={`/pokemon?page=${page - 1}`}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Previous
          </a>
        )}

        {page < totalPages && (
          <a
            href={`/pokemon?page=${page + 1}`}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
}