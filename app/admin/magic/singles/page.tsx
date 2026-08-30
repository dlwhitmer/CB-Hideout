"use client";
import DeleteButton from "../DeleteButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import BackButton from "../../../backButton";
import { MagicSingle } from "../../../../lib/db/schema";

export default function MagicSinglesPage() {
  const [cards, setCards] = useState<MagicSingle[]>([]);
  const [total, setTotal] = useState(0);
  const [setFilter, setSetFilter] = useState("");
  const [sets, setSets] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 10;

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
    <section className=" bg-[#ffd380] p-6">
      <div className=" min-h-screen mx-auto w-full text-black bg-[#ffd380] font-bold text-center ">
        <div className="mb-4">
          <label className="mr-2 text-[18px] font-semibold">
            Filter by Set:
          </label>

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
        <div className="flex justify-center mb-2">
          <img
            src="/images/Magic-Logo.webp"
            alt="Yu-Gi-Oh Logo"
            width={220}
            height={70}
            className="h-auto"
          />
        </div>
        <div className="flex justify-center p-3">
          <BackButton />
        </div>

        <table className="admin-table">
          <thead>
            <tr className="bg-[#f8cc1b] text-black">
              <th className="px-3 py-2 text-center">Image</th>
              <th className="px-3 py-2 text-center">Scryfall ID</th>
              <th className="px-3 py-2 text-center">Name</th>
              <th className="px-3 py-2 text-center">Price</th>
              <th className="px-3 py-2 text-center">Quantity</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cards.map((card) => (
              <tr key={card.id} className="admin-tbody">
                <td className="p-2">
                  <img
                    src={card.imageSmall || "/placeholder.png"}
                    alt={card.frontName}
                    className="w-16 h-auto rounded shadow"
                  />
                </td>
                <td className="px-3 py-2 text-center font-bold">
                  {card.scryfallId}
                </td>
                <td className="px-3 py-2 text-center font-bold">
                  {card.frontName}
                </td>
                <td className="px-3 py-2 text-center font-bold">
                  ${card.price}
                </td>
                <td className="px-3 py-2 text-center font-bold">
                  {card.quantity}
                </td>

                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex justify-center gap-1">
                    <Link
                      href={`/admin/magic/singles/${card.id}/edit`}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <DeleteButton id={card.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
          >
            Previous
          </button>

          <span className="self-center">
            Page {page} / {totalPages || 1}
          </span>

          <button
            onClick={() => setPage(page + 1)}
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
