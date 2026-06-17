"use client";
import { cardboard } from "@/lib/fonts";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { PokemonProduct } from "@/types/pokemon";

export default function Page() {
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemonproduct, setPokemonProduct] = useState<PokemonProduct[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 20;
  const totalPages = Math.ceil(total / limit);

  const loadPokemonProducts = useCallback(
    async (currentPage: number) => {
      console.log("Starting load");

      setLoading(true);

      try {
        const params = new URLSearchParams();

        params.set("page", String(currentPage));
        params.set("limit", String(limit));

        const res = await fetch(`/api/pokemon/list?${params.toString()}`, {
          cache: "no-store",
        });

        console.log("Response status:", res.status);

        const data = await res.json();

        console.log("Data:", data);

        setPokemonProduct(data.rows ?? []);
        setTotal(data.total);
        setPage(currentPage);
      } catch (err) {
        console.error("LOAD ERROR:", err);
      } finally {
        console.log("Finished load");
        setLoading(false);
      }
    },
    [type, rarity, limit],
  );

  useEffect(() => {
    const load = async () => {
      await loadPokemonProducts(1);
    };
    load();
  }, [loadPokemonProducts]);

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
          {/* Pokemon — gradient */}
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
            Pokemon
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
          href="/admin/pokemon/add"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </Link> */}
      </div>

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
              <th className="px-3 py-2 text-center">In-Stock</th>
              <th className="px-3 py-2 text-center">Pokemon ID</th>
              <th className="px-3 py-2 text-center">Name</th>
              <th className="px-3 py-2 text-center">Set</th>
              <th className="px-3 py-2 text-center">Rarity</th>
              <th className="px-3 py-2 text-center">Price</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pokemonproduct.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-2 text-center">
                  {p.imageSmall ? (
                    <Image
                      src={p.imageSmall}
                      alt={p.name ?? "card image"}
                      width={64}
                      height={88}
                    />
                  ) : (
                    <div className="w-[64px] h-[88px] bg-gray-200" />
                  )}
                </td>

                <td className="px-3 py-2 text-center font-bold">
                  {p.quantity}
                </td>
                
                <td className="px-3 py-2 text-center font-bold">
                  {p.pokemonId}
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
                      href={`/admin/pokemon/${p.id}/edit`}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                   <DeleteButton pokemonId={p.pokemonId} />
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
          onClick={() => loadPokemonProducts(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <span className="self-center">
          Page {page} / {totalPages || 1}
        </span>

        <button
          onClick={() => loadPokemonProducts(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
