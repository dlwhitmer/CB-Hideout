import Link from "next/link";
import DeleteButton from "./DeleteButton";
import VerticalDivider from "@/app/componets/vertical_divider";

interface Product {
  id: number;
  name: string;
  price: number | string;
  description: string | null;
  scryfall_id: string;
  set_code: string;
  collector_number: string;
  rarity: string;
  type_line: string;
  oracle_text: string | null;
  artist: string;
  image_url: string;
}

async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  console.log("BASE URL:", process.env.NEXT_PUBLIC_BASE_URL);

  const res = await fetch(`${baseUrl}/api/products/list`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch products");
    return [];
  }

  const data = await res.json();

  return data.products; // ✅ THIS is the missing piece
}
export default async function ProductsListPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>

        <Link
          href="/admin/products/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 text-center w-[80px]">Image</th>
              <th className="px-3 py-2 text-center w-[120px]">Scryfall ID</th>
              <th className="px-3 py-2 text-center w-[90px]">Name</th>
              <th className="px-3 py-2 text-center w-[80px]">Set</th>
              <th className="px-3 py-2 text-center w-[80px]">Rarity</th>
              <th className="px-3 py-2 text-center w-[80px]">Price</th>
              <th className="px-3 py-2 text-right w-[140px]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-2 text-center">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-17 h-20 object-cover rounded mx-auto"
                  />
                </td>

                <td className="px-3 py-2 text-center font-bold text-[#000] break-all">
                  {p.scryfall_id}
                </td>

                <td className="px-3 py-2 text-center font-bold text-[#000] ">
                  {p.name}
                </td>

                <td className="px-3 py-2 text-center font-bold text-[#000] ">
                  {p.set_code.toUpperCase()}
                </td>

                <td className="px-3 py-2 text-center font-bold text-[#000] ">
                  {p.rarity}
                </td>

                <td className="px-3 py-2 text-center font-bold text-[#000] font-bold">
                  ${Number(p.price || 0).toFixed(2)}
                </td>

                <td className="px-3 py-2">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={String(p.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
