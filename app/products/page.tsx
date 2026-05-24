import { Product } from "@/types/product";
// import { PageProps } from "@/types/page-props";
export const dynamic = "force-dynamic";

type SearchParams = {
  page?: string;
  type?: string;
  rarity?: string;
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
    `${baseUrl}/api/products/list?page=${page}&type=${type}&rarity=${rarity}`,
    { cache: "no-store" },
  );

  console.log("RES STATUS:", response.status);

  const data = await response.json();

  const products = data.rows;
  const total = data.total ?? data.rows.length;

  const pageSize = 20;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="min-h-screen bg-[url('/images/bg-17.webp')] bg-no-repeat bg-[length:100%_100%]">
      {/* FILTER BAR */}
      <div className="flex gap-4 mb-6 text-white">
        <a href="/products">All</a>
        <a href="/products?type=Creature">Creature</a>
        <a href="/products?type=Instant">Instant</a>
        <a href="/products?type=Sorcery">Sorcery</a>

        <span className="mx-2">|</span>

        <a href="/products?rarity=common">Common</a>
        <a href="/products?rarity=uncommon">Uncommon</a>
        <a href="/products?rarity=rare">Rare</a>
        <a href="/products?rarity=mythic">Mythic</a>
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-white">Products</h1>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((p) => (
          <a
            key={p.id}
            href={`/products/${p.id}`}
            className="bg-gray-800 p-3 rounded shadow hover:scale-105 transition block"
          >
            <img
              src={p.image_url || "/placeholder.png"}
              alt={p.name}
              className="w-80 rounded shadow"
            />

            <h2 className="font-semibold text-white text-center">{p.name}</h2>

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
