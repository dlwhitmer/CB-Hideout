import { cardboard } from "@/lib/fonts";
import { Product } from "@/types/product";
// import { PageProps } from "@/types/page-props";
export const dynamic = "force-dynamic";

type SearchParams = {
  page?: string;
  type?: string;
  rarity?: string;
};

type ProductsResponse = {
  rows: Product[];
  total: number;
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    type?: string;
    rarity?: string;
  }>;
}) {
  const sp = await searchParams;

  const page = parseInt(sp.page ?? "1");
  const type = sp.type ?? "";
  const rarity = sp.rarity ?? "";

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  console.log("BASE URL:", process.env.NEXT_PUBLIC_BASE_URL);

  const response = await fetch(
    `${baseUrl}/api/products/pokemon/list?page=${page}&type=${type}&rarity=${rarity}`,
    { cache: "no-store" },
  );

  console.log("RES STATUS:", response.status);

  const data: ProductsResponse = await response.json();

  const products = data.rows;
  const total = data.total ?? data.rows.length;

  const pageSize = 20;
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
      <div className="flex justify-center">
        <img
          src="/images/pokemon.webp"
          alt="Pokemon"
          className=" flex items-center h-[80px]  md:h-[300px] lg:h-[90px] object-contain"
        ></img>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-5 gap-6">
        {products.map((p) => (
          <a
            key={p.id}
            href={`/products/pokemon/${p.id}`}
            className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition block"
          >
            <img
              src={p.image_url || "/placeholder.png"}
              alt={p.name}
              className="w-80 rounded shadow"
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
            href={`/products?page=${page - 1}`}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Previous
          </a>
        )}

        {page < totalPages && (
          <a
            href={`/products?page=${page + 1}`}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
}
