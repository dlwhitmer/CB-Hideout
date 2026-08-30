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

  const handleSubmit = async () => {
    const url =
      type === "cards"
        ? "/api/magic/cards/import-all"
        : `/api/${game}/${type}/import`;

    const body =
      type === "singles"
        ? { id }
        : type === "packs"
          ? { packName }
          : type === "cards"
            ? {} // no body needed
            : game === "yugioh"
              ? { setName: setCode }
              : { setCode };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    alert(data.message || "Import complete");
  };

  const getPlaceholder = () => {
    if (type === "cards") return ""; // no input needed

    if (type === "packs") return "Pack name";

    if (type === "sets" || type === "singles") {
      switch (game) {
        case "magic":
          return "Set Name (example: Modern Horizons 3)";
        case "pokemon":
          return "Set Code (example: sv2)";
        case "yugioh":
          return "Set Name";
        default:
          return "";
      }
    }

    return "";
  };

  return (
    <div className="text-black bg-[#fbf2c4] min-h-screen text-center w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6">Universal Importer</h1>

      {/* GAME SELECT */}
      <label className=" text-[20px] text-center font-bold block ">
        Select Game:
      </label>
      <select
        value={game}
        onChange={(e) => setGame(e.target.value)}
        className="text-white bg-gray-800 p-2 text-center rounded w-[250px]"
      >
        <option value="magic">Magic</option>
        <option value="pokemon">Pokémon</option>
        <option value="yugioh">Yu‑Gi‑Oh</option>
      </select>

      {/* IMPORT TYPE SELECT */}
      <label className=" text-[20px] text-black font-bold block">
        Import Type:
      </label>
      <select
        value={type}
        onChange={(e) => {
          console.log("CHANGING TYPE TO:", e.target.value);
          setType(e.target.value);
        }}
        className=" text-white text-center bg-gray-800 p-2 rounded mb-6 w-[250px]"
      >
        <option value="singles">Singles</option>
        <option value="cards">Cards</option>
        <option value="sets">Sets</option>
      </select>

      <div className="space-y-4">
        {/* SINGLES FORM */}
        {type === "singles" && (
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={setCode}
            onChange={(e) => setId(e.target.value)}
            className="text-white bg-gray-800 p-2  text-center rounded w-[250px] placeholder:text-white placeholder:font-medium"
          />
        )}

        {/* PACKS FORM */}
        {type === "packs" && (
          <>
            <input
              type="text"
              placeholder="Pack Name"
              value={packName}
              onChange={(e) => setPackName(e.target.value)}
              className="text-white bg-gray-800 p-2  text-center rounded w-[250px] placeholder:text-white placeholder:font-medium"
            />
          </>
        )}

        {/* SETS FORM */}
        {type === "sets" && (
          <div className="text-white mb-4">
            <p className="mb-2 font-medium">
              Import all{" "}
              {game === "magic"
                ? "Magic: The Gathering"
                : game === "pokemon"
                  ? "Pokémon"
                  : "Yu‑Gi‑Oh"}{" "}
              sets
            </p>
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
