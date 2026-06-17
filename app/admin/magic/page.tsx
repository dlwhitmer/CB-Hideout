"use client";
import { cardboard } from "@/lib/fonts";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { useEffect, useState } from "react";
import Image from "next/image";

export interface Product {
  id: string;
  scryfallId: string | null;
  name: string;
  quantity: number;

  setCode: string | null;
  setName: string | null;

  manaCost: string | null;
  cmc: number | null;

  colors: string | null;
  colorIdentity: string | null;

  power: string | null;
  toughness: string | null;

  keywords: string | null;

  typeLine: string | null;
  oracleText: string | null;

  layout: string | null;
  cardFaces: string | null;

  collectorNumber: string | null;
  rarity: string | null;

  price: number | null;

  imageUrl: string | null;
  artist: string | null;

  description: string | null;
  releasedAt: string | null;

  created_at: string | null;
}
      
export default function Page() {
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 20;
  const totalPages = Math.ceil(total / limit);

  async function loadProducts(currentPage: number) {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      params.set("page", String(currentPage));
      params.set("limit", String(limit));

      if (type) params.set("type", type);
      if (rarity) params.set("rarity", rarity);

      const res = await fetch(`/api/magic/list?${params.toString()}`, {
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        params.set("page", "1");
        params.set("limit", String(limit));

        if (type) params.set("type", type);
        if (rarity) params.set("rarity", rarity);

        const res = await fetch(`/api/magic/list?${params.toString()}`, {
          cache: "no-store",
        });

        const data = await res.json();

        setProducts(data.rows);
        setTotal(data.total);
        setPage(1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
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
      <div className="flex justify-center items-center mb-6">
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
          <span
            className="
              block
              text-[40px]
              italic
              text-transparent
              bg-clip-text
              bg-gradient-to-b
              from-[#cc3300]
              to-[#ff9900]
            "
          >
            The Gathering
          </span>
        </h1>

        {/* <Link
          href="/admin/magic/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link> */}
      </div>

      {/* TABLE */}
      {/* TABLE */}
      <div className="relative overflow-x-auto rounded-lg border bg-white shadow">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <div className="text-black font-bold">Loading...</div>
          </div>
        )}

        <table className="min-w-full text-sm text-black">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-3 py-2 text-center">Image</th>
              <th className="px-3 py-2 text-center">In Stock</th>
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
                  <Image
                    src={p.imageUrl ?? ""}
                    alt={p.name}
                    width={150}
                    height={150}
                    className="w-16 h-22 object-cover"
                  />
                </td>

                <td className="px-3 py-2 text-center font-bold">
                  {p.quantity}
                </td>
                <td className="px-3 py-2 text-center font-bold">
                  {p.scryfallId}
                </td>

                <td className="px-3 py-2 text-center font-bold">{p.name}</td>

                <td className="px-3 py-2 text-center font-bold">
                  {p.setCode?.toUpperCase() ?? ""}
                </td>

                <td className="px-3 py-2 text-center font-bold">{p.rarity}</td>

                <td className="px-3 py-2 text-center font-bold">
                  ${Number(p.price || 0).toFixed(2)}
                </td>

                <td className="px-3 py-2">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/magic/${p.id}/edit`}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                  
                   <DeleteButton scryfallId={p.scryfallId} />


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
