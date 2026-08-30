"use client";

import { cardboard } from "../../../../lib/fonts";
import Link from "next/link";
import BackButton from "../../../backButton";
import DeleteButton from "../../pokemon/DeleteButton";
import { useEffect, useState, useCallback } from "react";
import { PokemonSingle } from "../../../../lib/db/schema";

export default function PokemonSinglesPage() {
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");
  const [loading, setLoading] = useState(true);
  const [setName, setSetName] = useState("");
  const [pokemonSingles, setPokemonSingles] = useState<PokemonSingle[]>([]);
  const [sets, setSets] = useState<{ set_code: string; set_name: string }[]>(
    [],
  );

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  const loadPokemonSingles = useCallback(
    async (currentPage: number) => {
      console.log("Starting load");

      setLoading(true);

      try {
        const params = new URLSearchParams();

        params.set("page", String(currentPage));
        params.set("limit", String(limit));

        if (setName) params.set("set", setName);
        if (type) params.set("type", type);
        if (rarity) params.set("rarity", rarity);

        const res = await fetch(
          `/api/pokemon/singles/list?${params.toString()}`,
        );

        const text = await res.text();

        console.log("API RESPONSE:", text);

        const data = JSON.parse(text);

        console.log("ADMIN FIRST CARD:", data.data?.[0]);

        setPokemonSingles(data.data ?? []);
        setTotal(data.total);
        setPage(currentPage);
      } catch (err) {
        console.error("LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    },
    [limit, setName, type, rarity], // ⭐ FIXED
  );

  useEffect(() => {
    const loadSets = async () => {
      const res = await fetch("/api/pokemon/sets/list");
      const data = await res.json();
      setSets(data);
    };

    loadSets();
  }, []);

  useEffect(() => {
    const load = async () => {
      await loadPokemonSingles(1);
    };
    load();
  }, [loadPokemonSingles]);

  return (
    <section className=" bg-[#ffd380] p-6">
      <div className="">
        {/* FILTERS */}
        <div className="text-black bg-white flex gap-5 mb-4">
          <select value={setName} onChange={(e) => setSetName(e.target.value)}>
            <option value="">All Sets</option>

            {Array.from(new Map(sets.map((s) => [s.set_name, s])).values()).map(
              (s) => (
                <option key={s.set_name} value={s.set_name}>
                  {s.set_name}
                </option>
              ),
            )}
          </select>

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
        <div className="flex justify-center mb-2">
          <img
            src="/images/pokemon.webp"
            alt="Yu-Gi-Oh Logo"
            width={220}
            height={70}
            className="h-auto"
          />
        </div>

        {/* TABLE */}
        <div className="">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-black font-bold">Loading...</div>
            </div>
          )}
          <div className="flex justify-center p-3">
            <BackButton />
          </div>
          <table className="admin-table">
            <thead className=" text-gray-700">
              <tr className="bg-[#f8cc1b] text-black">
                <th className="px-3 py-2 text-center">Image</th>
                <th className="px-3 py-2 text-center">Pokemon ID</th>
                <th className="px-3 py-2 text-center">Name</th>
                <th className="px-3 py-2 text-center">Price</th>
                <th className="px-3 py-2 text-center">In-Stock</th>
                <th className="px-3 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {pokemonSingles.map((p) => (
                <tr key={p.id} className="admin-tbody">
                  <td className="px-3 py-2 text-center">
                    {p.imageSmall ? (
                      <img
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
                    {p.pokemonId}
                  </td>

                  <td className="px-3 py-2 text-center font-bold">{p.name}</td>

                  <td className="px-3 py-2 text-center font-bold">
                    ${Number(p.price || 0).toFixed(2)}
                  </td>

                  <td className="px-3 py-2 text-center font-bold">
                    {p.quantity}
                  </td>

                  <td className="px-3 py-2">
                    <div className="flex flex-wrap justify-center gap-1">
                      <Link
                        href={`/admin/pokemon/singles/${p.id}/edit`}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>

                      <DeleteButton id={p.id} />
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
            onClick={() => {
              const newPage = page - 1;
              setPage(newPage);
              loadPokemonSingles(newPage);
            }}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
          >
            Previous
          </button>

          <span className="self-center">
            Page {page} / {totalPages || 1}
          </span>

          <button
            onClick={() => {
              const newPage = page + 1;
              setPage(newPage);
              loadPokemonSingles(newPage);
            }}
            disabled={page >= totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
