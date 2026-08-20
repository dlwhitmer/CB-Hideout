"use client";
import Link from "next/link";
import DeleteButton from "../DeleteButton";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import BackButton from "../../../backButton";
import { YugiohSingle, YugiohPrinting } from "../../../../lib/db/schema";

type YugiohAdminRow = YugiohSingle & {
  setName: string | null;
};

export default function Page() {
  const [type, setType] = useState("");
  const [race, setRace] = useState("");
  const [selectedSet, setSelectedSet] = useState("");
  const [attribute, setAttribute] = useState("");

  const [sets, setSets] = useState<{ set_code: string; set_name: string }[]>(
    [],
  );
  const [yugiohSingles, setYugiohSingles] = useState<YugiohAdminRow[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  const loadYugiohSingles = useCallback(
    async (currentPage: number) => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(limit),
          set: selectedSet,
          type,
          race,
          attribute,
        });

        const res = await fetch(
          `/api/yugioh/singles/list?${params.toString()}`,
        );
        const data = await res.json();

        console.log("SINGLES:", data);

        setYugiohSingles(data.rows ?? []);
        setTotal(data.total ?? 0);
      } catch (err) {
        console.error("SINGLES LOAD ERROR:", err);
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
        setSets(data.data ?? []);
      } catch (err) {
        console.error("SET LOAD ERROR:", err);
      }
    }
    loadSets();
  }, []);
  return (
    <section className=" bg-[#ffd380] p-6">
      <div>
        {/* FILTERS */}
        <div className="bg-white text-black flex flex-wrap justify-center gap-4 mb-4 px-2">
          <select
            value={selectedSet}
            onChange={(e) => {
              console.log("SELECTED SET VALUE:", e.target.value);
              setSelectedSet(e.target.value);
            }}
          >
            <option value="">All Sets</option>
            {sets.map((set) => (
              <option key={set.set_name} value={set.set_name}>
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
        <div className="flex justify-center mb-2">
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
        <div className="text-black  min-h-screen text-center w-full mx-auto">
          {loading && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
              <div className="text-black font-bold">Loading...</div>
            </div>
          )}
          <div className="flex justify-center p-3">
            <BackButton />
          </div>

          <table className="admin-table">
            <thead className=" text-gray-700">
               <tr className="bg-[#f8cc1b] text-black">
                <th className="w-[60px] px-1 py-2 text-center">Image</th>
                <th className="w-[70px] px-1 py-2 text-center">Yu-Gi-Oh ID</th>
                <th className="w-[110px] px-1 py-2 text-center">Name</th>
                <th className="w-[65px] px-1 py-2 text-center">Price</th>
                <th className="w-[55px] px-1 py-2 text-center">In-Stock</th>
                <th className="w-[100px] px-1 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {yugiohSingles.map((p) => (
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
                    {p.yugiohId}
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

                      <DeleteButton yugiohId={p.yugiohId} />
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
              loadYugiohSingles(newPage);
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
              loadYugiohSingles(newPage);
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
