"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UniversalImportPage() {
  const [game, setGame] = useState("magic");
  const [type, setType] = useState("singles");
  const [id, setId] = useState("");
  const [setCode, setSetCode] = useState("");
  const router = useRouter(); // ⭐ THIS FIXES THE REDLINE

  const handleSubmit = async () => {
    let url = "";

    if (type === "cards") {
      url = `/api/${game}/cards/import-all`;
    } else if (type === "import-set") {
      url = `/api/${game}/cards/import-set`;
    } else if (type === "booster") {
      url = `/api/${game}/cards/import-all`;
    } else if (type === "promos") {
      url = `/api/${game}/cards/promos`;
    } else if (type === "don") {
      url = `/api/${game}/cards/don`;
    } else if (type === "st") {
      url = `/api/${game}/cards/starter`;
    } else if (type === "sets") {
      url = `/api/${game}/sets/import`;
    } else {
      url = `/api/${game}/${type}/import`;
    }

    let body = {};

    if (type === "singles") {
      body = { id };
    } else if (type === "cards") {
      body = {}; // no body needed
    } else if (type === "import-set") {
      if (game === "gundam") {
        body = { setName: id };
      } else if (game === "lorcana") {
        body = { setId: setCode };
      } else if (game === "onepiece") {
        body = { setId: setCode };
      } else if (game === "riftbound") {
        body = { setId: setCode }; // ✔ FIXED
      } else {
        body = { setCode: setCode };
      }
    }

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

    if (type === "sets" || type === "singles") {
      switch (game) {
        case "magic":
          return "Scryfall Id";
        case "pokemon":
          return "Set Code (example: sv2)";
        case "gundam":
          return "Set Code";
        case "lorcana":
          return "SetId";
        case "onepiece":
          return "SetId";
        case "riftbound":
          return "SetId";
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
        <option value="lorcana">Lorcana</option>
        <option value="gundam">Gundam</option>
        <option value="onepiece">Onepiece</option>
        <option value="riftbound">RiftBound</option>
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
        <option value="import-set">One Set</option>
        <option value="booster">Booster Cards</option>
        <option value="st">Starter Deck Cards</option>
        <option value="promos">One Piece Promo Cards</option>
        <option value="don">Don!! Cards</option>
      </select>

      <div className="space-y-4">
        {/* SINGLES FORM */}
        {type === "singles" && (
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="text-white bg-gray-800 p-2  text-center rounded w-[250px] placeholder:text-white placeholder:font-medium"
          />
        )}

        {/* ONE SET IMPORT */}
        {type === "import-set" && (
          <input
            type="text"
            placeholder={getPlaceholder()} // optional, if you want dynamic text
            value={setCode}
            onChange={(e) => setSetCode(e.target.value)}
            className="text-white bg-gray-800 p-2  text-center rounded w-[250px] placeholder:text-white placeholder:font-medium"
          />
        )}

        {/* SETS FORM */}
        {type === "sets" && game !== "lorcana" && game !== "onepiece" && game !== "riftbound" &&(
          <div className="mb-4">
            <label className="block text-sm font-medium text-black">
              Enter set code
            </label>
            <input
              type="text"
              value={setCode}
              onChange={(e) => setSetCode(e.target.value)}
              className="w-full p-2 border rounded"
            />
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
