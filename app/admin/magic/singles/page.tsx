"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MagicSingle } from "../../../../lib/db/schema";

export default function MagicSinglesPage() {
  const [cards, setCards] = useState<MagicSingle[]>([]);
  const [total, setTotal] = useState(0);
  const [setFilter, setSetFilter] = useState("");
  const [sets, setSets] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 20;

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    async function loadSets() {
      const res = await fetch("/api/magic/sets/list");
      const data = await res.json();
      setSets(data);
    }
    loadSets();
  }, []);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `/api/magic/singles?page=${page}&limit=${limit}&set=${setFilter}`,
      );
      const data = await res.json();

      setCards(data.rows);
      setTotal(data.total);
    }

    load();
  }, [page, setFilter]);

  return (
    <div>
      <h1>Magic Singles</h1>

      <Link href="/admin/magic/singles/add" className="btn">
        Add New Card
      </Link>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter by Set:</label>

        <select
          value={setFilter}
          onChange={(e) => {
            setSetFilter(e.target.value);
            setPage(1); // reset pagination when changing sets
          }}
          className="bg-white text-black border p-2 rounded"
        >
          <option value="">All Sets</option>

          {sets.map((s) => (
            <option key={s.set_code} value={s.set_code}>
              {s.set_name}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-white text-black">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Set</th>
            <th className="p-2">Rarity</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Price</th>
            <th className="p-2">Scryfall ID</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {cards.map((card) => (
            <tr key={card.id} className="border-b">
              <td className="p-2">
                <img
                  src={card.image_small || "/placeholder.png"}
                  alt={card.name}
                  className="w-16 h-auto rounded shadow"
                />
              </td>

              <td className="p-2">{card.name}</td>
              <td className="p-2">{card.set_name}</td>
              <td className="p-2">{card.rarity}</td>
              <td className="p-2">{card.quantity}</td>
              <td className="p-2">${card.price}</td>
              <td className="p-2">{card.scryfall_id}</td>

              <td className="p-2 space-x-2">
                <Link
                  href={`/admin/magic/singles/${card.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  className="text-red-600 hover:underline"
                  onClick={async () => {
                    await fetch(`/api/magic/singles/${card.id}`, {
                      method: "DELETE",
                    });
                    location.reload();
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ⭐ PAGINATION CONTROLS */}
      <div className="flex items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
