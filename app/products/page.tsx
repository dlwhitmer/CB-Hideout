
import { Product } from "@/types/product";
import { PageProps } from "@/types/page-props";
export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const page = parseInt(sp?.page || "1");

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
console.log("BASE URL:", process.env.NEXT_PUBLIC_BASE_URL);

const response = await fetch(
  `${baseUrl}/api/products/list?page=${page}`,
  { cache: "no-store" }
);

  console.log("RES STATUS:", response.status);

  const data = await response.json();

  const { products, total } = data;

  const pageSize = 20;
  const totalPages = Math.ceil(total / pageSize);

  return (
    // ... your JSX stays the same

    <div className="min-h-screen bg-[url('/images/bg-17.webp')] bg-no-repeat bg-[length:100%_100%]">
      <h1 className="text-3xl font-bold mb-6 text-white">Products</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products?.map((p: Product) => (
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

            <h2 className="font-semibold text-white">{p.name}</h2>
            <p className="text-gray-400 text-sm">${p.price}</p>
          </a>
        ))}
      </div>

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