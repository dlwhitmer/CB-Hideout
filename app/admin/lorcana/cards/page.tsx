"use client";

import BackButton from "../../../backButton";
import { useEffect, useState, useCallback } from "react";
import { SelectLorcanaCard } from "../../../../lib/db/schema";

export default function LorcanaCardsPage() {
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");
  const [loading, setLoading] = useState(true);
  const [setName, setSetName] = useState("");
  const [lorcanaCards, setLorcanaCards] = useState<SelectLorcanaCard[]>([]);
  const [sets, setSets] = useState<
    {
      SetID: string;
      Name: string
    }[]
  >([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  // ⭐ FIXED LOADER — fetches + returns data ONLY
  const loadLorcanaCards = useCallback(
    async (currentPage: number) => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.set("page", String(currentPage));
        params.set("limit", String(limit));
        if (setName) params.set("SetID", setName); // ⭐ THIS LINE
        const res = await fetch(`/api/lorcana/cards/list?${params.toString()}`);
        const text = await res.text();
        const data = JSON.parse(text);

        return data; // ⭐ ONLY return — no state updates here
      } catch (err) {
        console.error("LOAD ERROR:", err);
        return { data: [], total: 0 };
      } finally {
        setLoading(false);
      }
    },
    [limit, setName],
  );

  // ⭐ Load sets
  useEffect(() => {
    const loadSets = async () => {
      const res = await fetch("/api/lorcana/sets/list");
      const data = await res.json();
      setSets(data)
    };

    loadSets();
  }, []);

  // ⭐ MAIN LOAD + DEDUPE
  useEffect(() => {
    const load = async () => {
      const result = await loadLorcanaCards(1);

      const cards: SelectLorcanaCard[] = result.data ?? [];

      setLorcanaCards(cards);
      setTotal(result.total);
      setPage(1);
    };

    load();
  }, [loadLorcanaCards]);

  return (
    <section className="bg-[#ffd380] p-6">
      <div>
        {/* FILTERS */}
        <div className="text-black bg-white flex gap-5 mb-4">
          <select value={setName} onChange={(e) => setSetName(e.target.value)}>
            <option value="">All Sets</option>

            {sets.map((s) => (
              <option key={s.SetID} value={s.SetID}>
                {s.Name}
              </option>
            ))}
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
            src="/images/Lorcana-Logo.webp"
            alt="Lorcana Logo"
            width={220}
            height={70}
            className="h-auto"
          />
        </div>

        {/* TABLE */}
        <div>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-black font-bold">Loading...</div>
            </div>
          )}

          <div className="flex justify-center p-3">
            <BackButton />
          </div>

          <table className="admin-table">
            <thead className="text-gray-700">
              <tr className="bg-[#f8cc1b] text-black">
                <th className="px-3 py-2 text-center">Image</th>
                <th className="px-3 py-2 text-center">Lorcana ID</th>
                <th className="px-3 py-2 text-center">Set ID</th>
                <th className="px-3 py-2 text-center">Set Name</th>
                <th className="px-3 py-2 text-center">Card Name</th>
                {/* <th className="px-3 py-2 text-center">Actions</th> */}
              </tr>
            </thead>

            <tbody>
              {lorcanaCards.map((p) => (
                <tr key={p.id}>
                  <td className="p-2 flex justify-center">
                    <img src={p.Image} width={80} />
                  </td>
                  <td className="text-center">{p.UniqueID}</td>
                  <td className="text-center">{p.SetID}</td>
                  
                  <td className="text-center">{p.SetName}</td>
                  <td className="text-center">{p.Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={async () => {
              const newPage = page - 1;
              setPage(newPage);

              const result = await loadLorcanaCards(newPage);
              setLorcanaCards(result.data); // ⭐ REQUIRED
              setTotal(result.total);
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
            onClick={async () => {
              const newPage = page + 1;
              setPage(newPage);

              const result = await loadLorcanaCards(newPage);
              setLorcanaCards(result.data); // ⭐ REQUIRED
              setTotal(result.total);
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
