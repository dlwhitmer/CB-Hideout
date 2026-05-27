"use client";
import { cardboard } from "@/lib/fonts";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number | string;

  description: string | null;

  scryfall_id: string;
  set_code: string;
  set_name?: string;

  collector_number: string;
  rarity: string;
  type_line: string;
  oracle_text: string | null;

  cmc?: number;

  colors?: string;
  color_identity?: string;

  power: string | null;
  toughness: string | null;

  keywords?: string;

  artist: string;
  image_url: string;

  released_at?: string;
}

export default function Page() {
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 20;
  const totalPages = Math.ceil(total / limit);

  async function loadProducts(currentPage: number) {
    console.log("test");
    const params = new URLSearchParams();

    params.set("page", String(currentPage));
    params.set("limit", String(limit));

    if (type) params.set("type", type);
    if (rarity) params.set("rarity", rarity);

    const res = await fetch(`/api/products/magic/list?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to load products");
      return;
    }

    const data = await res.json();

    setProducts(data.rows);
    setTotal(data.total);
    setPage(currentPage);
  }

  useEffect(() => {
    loadProducts(1);
  }, []);

  useEffect(() => {
    loadProducts(1);
  }, [type, rarity]);

  return (
    <div className="p-6">
      {/* FILTERS */}
      <div className="flex gap-4 mb-4">
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="Creature">Creature</option>
          <option value="Instant">Instant</option>
          <option value="Sorcery">Sorcery</option>
          <option value="Artifact">Artifact</option>
          <option value="Enchantment">Enchantment</option>
          <option value="Planeswalker">Planeswalker</option>
          <option value="Land">Land</option>
        </select>

        <select value={rarity} onChange={(e) => setRarity(e.target.value)}>
          <option value="">All Rarities</option>
          <option value="common">Common</option>
          <option value="uncommon">Uncommon</option>
          <option value="rare">Rare</option>
          <option value="mythic">Mythic</option>
        </select>

        <button
          onClick={() => {
            setType("");
            setRarity("");
          }}
        >
          Reset
        </button>
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className={`${cardboard.className} text-center leading-[1.1]`}>
          {/* MAGIC — gradient */}
          <span
            className="
              block
              text-[60px]
              italic
              text-transparent
              bg-clip-text
              bg-gradient-to-b
              from-[#cc3300]
              to-[#ff9900]
            "
          >
            Magic
          </span>
        </h1>

        <Link
          href="/admin/products/magic/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-lg border bg-white shadow">
        <table className="min-w-full text-sm text-black">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 text-center">Image</th>
              <th className="px-3 py-2 text-center">Scryfall ID</th>
              <th className="px-3 py-2 text-center">Name</th>
              <th className="px-3 py-2 text-center">Set</th>
              <th className="px-3 py-2 text-center">Rarity</th>
              <th className="px-3 py-2 text-center">Price</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-2 text-center">
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-16 h-20 object-cover rounded mx-auto"
                  />
                </td>

                <td className="px-3 py-2 text-center font-bold">
                  {p.scryfall_id}
                </td>

                <td className="px-3 py-2 text-center font-bold">{p.name}</td>

                <td className="px-3 py-2 text-center font-bold">
                  {p.set_code.toUpperCase()}
                </td>

                <td className="px-3 py-2 text-center font-bold">{p.rarity}</td>

                <td className="px-3 py-2 text-center font-bold">
                  ${Number(p.price || 0).toFixed(2)}
                </td>

                <td className="px-3 py-2">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/magic/${p.id}/edit`}
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

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => loadProducts(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <span className="self-center">
          Page {page} / {totalPages || 1}
        </span>

        <button
          onClick={() => loadProducts(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
