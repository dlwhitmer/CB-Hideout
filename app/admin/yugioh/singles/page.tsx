"use client";
import Link from "next/link";
import DeleteButton from "../DeleteButton";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { YugiohSingle } from "../../../../lib/db/schema";

export default function Page() {
  const [type, setType] = useState("");
  const [race, setRace] = useState("");
  const [selectedSet, setSelectedSet] = useState("");
  const [attribute, setAttribute] = useState("");

  const [sets, setSets] = useState<{ set_code: string; set_name: string }[]>(
    [],
  );
  const [yugiohSingles, setYugiohSingles] = useState<YugiohSingle[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 20;
  const totalPages = Math.ceil(total / limit);

  const loadYugiohSingles = useCallback(
    async (currentPage: number) => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        params.set("page", String(currentPage));
        params.set("limit", String(limit));

        if (selectedSet) params.set("set", selectedSet);
        if (type) params.set("type", type);
        if (race) params.set("race", race);
        if (attribute) params.set("attribute", attribute);

        const res = await fetch(
          `/api/yugioh/singles/list?${params.toString()}`,
          {
            cache: "no-store",
          },
        );

        const data = await res.json();

        setYugiohSingles(data.data ?? []);
        setTotal(data.total ?? 0);
        setPage(currentPage);
      } catch (err) {
        console.error("LOAD ERROR:", err);
      } finally {
        setLoading(false);
      }
    },
    [selectedSet, type, race, attribute],
  );

  useEffect(() => {
    async function load() {
      await loadYugiohSingles(1);
    }

    load();
  }, [loadYugiohSingles]);

  useEffect(() => {
    async function loadSets() {
      try {
        const res = await fetch("/api/yugioh/sets/list");
        const data = await res.json();

        console.log("YuGiOh sets:", data);
        console.log("SET LIST:", data.data);

        setSets(data.data ?? []);
      } catch (err) {
        console.error("SET LOAD ERROR:", err);
      }
    }

    loadSets();
  }, []);
  return (
    <div className="p-6">
      {/* FILTERS */}
      <div className="bg-white text-black flex gap-4 mb-4">
        <select
          value={selectedSet}
          onChange={(e) => {
            console.log("SELECTED SET VALUE:", e.target.value);
            setSelectedSet(e.target.value);
          }}
        >
          <option value="">All Sets</option>
          {sets.map((set) => (
            <option key={set.set_code} value={set.set_name}>
              {set.set_name}
            </option>
          ))}
        </select>
        {/* TYPE */}
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All Types</option>
          <option value="Effect Monster">Effect Monster</option>
          <option value="Normal Monster">Normal Monster</option>
          <option value="Fusion Monster">Fusion Monster</option>
          <option value="Synchro Monster">Synchro Monster</option>
          <option value="XYZ Monster">XYZ Monster</option>
          <option value="Link Monster">Link Monster</option>
          <option value="Spell Card">Spell Card</option>
          <option value="Trap Card">Trap Card</option>
        </select>

        {/* RACE */}
        <select value={race} onChange={(e) => setRace(e.target.value)}>
          <option value="">All Races</option>
          <option value="Dragon">Dragon</option>
          <option value="Warrior">Warrior</option>
          <option value="Spellcaster">Spellcaster</option>
          <option value="Fiend">Fiend</option>
          <option value="Fairy">Fairy</option>
          <option value="Machine">Machine</option>
          <option value="Beast">Beast</option>
          <option value="Zombie">Zombie</option>
          <option value="Aqua">Aqua</option>
          <option value="Pyro">Pyro</option>
          <option value="Thunder">Thunder</option>
          <option value="Rock">Rock</option>
          <option value="Plant">Plant</option>
          <option value="Reptile">Reptile</option>
          <option value="Sea Serpent">Sea Serpent</option>
          <option value="Winged Beast">Winged Beast</option>
          <option value="Dinosaur">Dinosaur</option>
          <option value="Insect">Insect</option>
          <option value="Cyberse">Cyberse</option>
        </select>

        {/* ATTRIBUTE */}
        <select
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
        >
          <option value="">All Attributes</option>
          <option value="LIGHT">LIGHT</option>
          <option value="DARK">DARK</option>
          <option value="FIRE">FIRE</option>
          <option value="WATER">WATER</option>
          <option value="EARTH">EARTH</option>
          <option value="WIND">WIND</option>
          <option value="DIVINE">DIVINE</option>
        </select>

        {/* RESET BUTTON */}
        <button
          onClick={() => {
            setSelectedSet("");
            setType("");
            setRace("");
            setAttribute("");
          }}
        >
          Reset
        </button>
      </div>

      {/* HEADER */}
      <div className="flex justify-center mb-6">
        <Image
          src="/images/yugioh_logo.webp"
          alt="Yu-Gi-Oh Logo"
          width={220}
          height={70}
          className="h-auto"
        />
      </div>

      {/* FILTER BAR */}
      {/* <div className="flex gap-3 mb-6">...</div> */}

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
              <th className="px-3 py-2 text-center">Yu-Gi-Oh ID</th>
              {/* <th className="px-3 py-2 text-center">Name</th> */}
              <th className="px-3 py-2 text-center">Set</th>
              <th className="px-3 py-2 text-center">Type</th>
              <th className="px-3 py-2 text-center">Race</th>
              <th className="px-3 py-2 text-center">Price</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {yugiohSingles.map((p) => {
              const small = p.imageSmall;

              return (
                <tr key={p.id} className="border-t">
                  <td className="px-3 py-2 text-center">
                    {small ? (
                      <Image
                        src={small}
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
                    {p.yugiohId}
                  </td>
                  <td className="px-3 py-2 text-center">{p.primarySet}</td>

                  <td className="px-3 py-2 text-center">{p.type}</td>

                  <td className="px-3 py-2 text-center">{p.race}</td>

                  <td className="px-3 py-2 text-center">
                    ${Number(p.price || 0).toFixed(2)}
                  </td>

                  <td className="px-3 py-2">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/yugioh/${p.id}/edit`}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>

                      <DeleteButton yugiohId={p.yugiohId} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => loadYugiohSingles(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
        >
          Previous
        </button>

        <span className="self-center">
          Page {page} / {totalPages || 1}
        </span>

        <button
          onClick={() => loadYugiohSingles(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
