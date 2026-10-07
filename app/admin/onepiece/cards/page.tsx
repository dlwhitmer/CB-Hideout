"use client";

import BackButton from "../../../backButton";
import { useEffect, useState, useCallback } from "react";
import { InsertOnePieceCard } from "../../../../lib/db/schema";

export default function OnePieceCardsPage() {
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");
  const [loading, setLoading] = useState(true);
  const [setName, setSetName] = useState("");

  // ⭐ Correct One Piece card state
  const [onePieceCards, setOnePieceCards] = useState<InsertOnePieceCard[]>([]);

  // ⭐ Correct One Piece sets state (snake_case because API returns snake_case)
  const [sets, setSets] = useState<
    {
      set_id: string;
      set_name: string;
    }[]
  >([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  // ⭐ Correct loader — typed JSON, no One Piece leftovers
  const loadOnePieceCards = useCallback(
    async (currentPage: number) => {
      setLoading(true);

      try {
        const params = new URLSearchParams();
        params.set("page", String(currentPage));
        params.set("limit", String(limit));
        if (setName) params.set("set", setName);

        const res = await fetch(
          `/api/onepiece/cards/list?${params.toString()}`,
        );

        // ⭐ Typed JSON — THIS FIXES YOUR RED PROPERTIES
        const data: {
          data: InsertOnePieceCard[];
          total: number;
        } = await res.json();

        return data;
      } catch (err) {
        console.error("LOAD ERROR:", err);
        return { data: [], total: 0 };
      } finally {
        setLoading(false);
      }
    },
    [limit, setName],
  );

  // ⭐ Load One Piece sets (snake_case)
  useEffect(() => {
    const loadSets = async () => {
      const res = await fetch("/api/onepiece/sets/list");

      const data: {
        set_name: string;
        set_id: string;
      }[] = await res.json();

      setSets(data);
    };

    loadSets();
  }, []);

  // ⭐ MAIN LOAD + DEDUPE
  useEffect(() => {
    const load = async () => {
      const result = await loadOnePieceCards(1);

      const cards: InsertOnePieceCard[] = result.data ?? [];

      const uniqueCards = Object.values(
        cards.reduce(
          (
            acc: Record<string, InsertOnePieceCard>,
            card: InsertOnePieceCard,
          ) => {
            if (!acc[card.cardImageId]) acc[card.cardImageId] = card;
            return acc;
          },
          {} as Record<string, InsertOnePieceCard>,
        ),
      );

      setOnePieceCards(uniqueCards);
      setTotal(result.total);
      setPage(1);
    };

    load();
  }, [loadOnePieceCards]);
  console.log(
    "CARD KEYS:",
    onePieceCards.map((c) => c.cardImageId),
  );
  if (loading) {
    return (
      <section className="bg-[#ffd380] p-6">
        <div className="text-black font-bold">Loading...</div>
      </section>
    );  if (loading) {
    return (
      <section className="bg-[#ffd380] p-6">
        <div className="text-black font-bold">Loading...</div>
      </section>
    );
  }
  } 
  return (
    <section className="bg-[#ffd380] p-6">
      <div>
        {/* FILTERS */}
        <div className="text-black bg-white flex gap-5 mb-4">
          <select value={setName} onChange={(e) => setSetName(e.target.value)}>
            <option value="">All Sets</option>

            {sets.map((s) => (
              <option key={s.set_id} value={s.set_id}>
                {s.set_name}
              </option>
            ))}
          </select>

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Event">Event</option>
            <option value="Character">Character</option>
            <option value="Leader">Leader</option>
          </select>

          <select value={rarity} onChange={(e) => setRarity(e.target.value)}>
            <option value="">All Rarities</option>
            <option value="C">Common</option>
            <option value="UC">Uncommon</option>
            <option value="R">Rare</option>
            <option value="SR">Super Rare</option>
            <option value="SEC">Secret Rare</option>
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
            src="/images/OnePiece-Logo.webp"
            alt="One Piece Logo"
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
                <th className="px-3 py-2 text-center">Card ID</th>
                <th className="px-3 py-2 text-center">Set</th>
                <th className="px-3 py-2 text-center">Name</th>
              </tr>
            </thead>

            <tbody>
              {onePieceCards.map((p) => (
                <tr key={p.cardImageId}>
                  <td className="p-2 flex justify-center">
                    <img src={p.cardImage} width={80} />
                  </td>
                  <td className="text-center">{p.cardImageId}</td>
                  <td className="text-center">{p.setName}</td>
                  <td className="text-center">{p.cardName}</td>
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

              const result = await loadOnePieceCards(newPage);
              setOnePieceCards(result.data);
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

              const result = await loadOnePieceCards(newPage);
              setOnePieceCards(result.data);
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
