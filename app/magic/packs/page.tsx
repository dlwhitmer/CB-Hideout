// import { cardboard } from "@/lib/fonts";
import { headers } from "next/headers";
import MagicWord from "@/app/components/MagicWord";
import Image from 'next/image'

export const dynamic = "force-dynamic";

type SearchParams = {
  page?: string;
  type?: string;
  rarity?: string;
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const page = parseInt(sp.page ?? "1");
  const type = sp.type ?? "";
  const rarity = sp.rarity ?? "";

  // FIX: absolute URL required in server components
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(
    `${protocol}://${host}/api/magic/list?page=${page}&type=${type}&rarity=${rarity}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch magic cards: ${response.status}`);
  }

  const data = await response.json();

  const products = data.rows;
  const total = data.total;
  const pageSize = data.pageSize;
  const totalPages = Math.ceil(total / pageSize);

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
      <h1 className="text-center leading-[1.1]">
        <MagicWord>
          <span
            className="
            block 
            text-[80px] 
            font-style: italic
            text-transparent 
            bg-clip-text 
            bg-gradient-to-b 
            from-[#cc3300] 
            to-[#ff9900]
          "
          >
            Magic
          </span>
        </MagicWord>

        <span
          className="
            block 
            text-[50px] 
            text-[#f17908] 
            [text-shadow:_2px_4px_6px_#000]
          "
        >
          The Gathering
        </span>
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-5 gap-6">
        {products.map((p: any) => (
          <a
            key={p.id}
            href={`/magic/${p.id}`}
            className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition block"
          >
            <Image
              src={p.imageUrl || "/placeholder.png"}
              alt={p.name}
              width={300}
              height={300}
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
            href={`/magic?page=${page - 1}`}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Previous
          </a>
        )}

        {page < totalPages && (
          <a
            href={`/magic?page=${page + 1}`}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
}
