"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UniversalImportPage() {
  const [game, setGame] = useState("magic");
  const [type, setType] = useState("singles");
  const [id, setId] = useState("");
  const [packName, setPackName] = useState("");
  const [setCode, setSetCode] = useState("");

  const router = useRouter(); // ⭐ THIS FIXES THE REDLINE
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const body =
  type === "singles"
    ? { id }
    : type === "packs"
      ? { packName }
      : game === "yugioh"
        ? { setName: setCode }
        : { setCode };
    console.log("FRONTEND BODY:", body);

    const res = await fetch(`/api/${game}/${type}/import`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.success) {
      // ⭐ THIS IS WHERE router.push GOES
      if (data.success) {
        router.push(`/admin/${game}/singles`);
      }
    }
  };

  const getPlaceholder = () => {
    if (type !== "singles") return "";

    switch (game) {
      case "magic":
        return "Enter Scryfall ID";
      case "pokemon":
        return "Enter Pokémon Card ID (sv2-123)";
      case "yugioh":
        return "Enter YGO Card ID";
      default:
        return "";
    }
  };

  return (
    <div className="text-white max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Universal Import</h1>

      {/* GAME SELECT */}
      <label className="block mb-2">Select Game:</label>
      <select
        value={game}
        onChange={(e) => setGame(e.target.value)}
        className="bg-gray-800 p-2 rounded mb-4 w-full"
      >
        <option value="magic">Magic</option>
        <option value="pokemon">Pokémon</option>
        <option value="yugioh">Yu‑Gi‑Oh</option>
      </select>

      {/* IMPORT TYPE SELECT */}
      <label className="block mb-2">Import Type:</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="bg-gray-800 p-2 rounded mb-6 w-full"
      >
        <option value="singles">Singles</option>
        <option value="packs">Packs</option>
        <option value="sets">Sets</option>
      </select>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SINGLES FORM */}
        {type === "singles" && (
          <>
            <input
              type="text"
              placeholder={getPlaceholder()}
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="bg-gray-800 p-2 rounded w-full"
            />
          </>
        )}

        {/* PACKS FORM */}
        {type === "packs" && (
          <>
            <input
              type="text"
              placeholder="Pack Name"
              value={packName}
              onChange={(e) => setPackName(e.target.value)}
              className="bg-gray-800 p-2 rounded w-full"
            />
          </>
        )}

        {/* SETS FORM */}
        {type === "sets" && (
          <input
            type="text"
            placeholder="Set Code ie. mh3 or amsh"
            value={setCode}
            onChange={(e) => setSetCode(e.target.value)}
            className="bg-gray-800 p-2 rounded w-full"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Import
        </button>
      </form>
    </div>
  );
}
