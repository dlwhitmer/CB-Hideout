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
        case "gundam":
          return "Gundam Id";
        case "lorcana":
          return "Lorcana Id";
        case "onepiece":
          return "OnePiece Id";
        case "riftbound":
          return "Riftbound Id";
        default:
          return "";
      }
    }
    if (type === "import-set") {
      switch (game) {
        case "magic":
          return "Set Code (ie: msh, ysos)";
        case "pokemon":
          return "Set Code (ie: sv2)";
        case "gundam":
          return "Set Code (ie: EB01,EXBP)";
        case "lorcana":
          return "Set ID (ie: AOV, ROJ)";
        case "onepiece":
          return " Set ID (ie: OP-01, EB-01)";
        case "riftbound":
          return "Set Code (ie. sgn, opp)";
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <div className="w-98  text-black pt-3 pb-10 bg-[#a3b7ca] max-h-fit text-center mx-auto">
      <h1 className="uni-title">Universal Importer</h1>

      {/* GAME SELECT */}
      <label className="select-game">Select Game:</label>
      <select
        value={game}
        onChange={(e) => setGame(e.target.value)}
        className="select-drop white-input"
      >
        <option value="magic">Magic</option>
        <option value="lorcana">Lorcana</option>
        <option value="gundam">Gundam</option>
        <option value="onepiece">Onepiece</option>
        <option value="riftbound">RiftBound</option>
      </select>

      {/* IMPORT TYPE SELECT */}
      <label className="import-type">Import Type:</label>
      <select
        value={type}
        onChange={(e) => {
          console.log("CHANGING TYPE TO:", e.target.value);
          setType(e.target.value);
        }}
        className="import-drop white-input"
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
          <div className="mb-4 flex flex-col">
             <label className="set-code-input ">Enter The Cards ID</label>
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="sets-form black-input"
          />
          </div>
        )}
        {/* ONE SET IMPORT */}
        {type === "import-set" && (
          <div className="mb-4 flex flex-col">
             <label className="set-code-input">Enter The SetCode</label>
          <input
            type="text"
            placeholder={getPlaceholder()} // optional, if you want dynamic text
            value={setCode}
            onChange={(e) => setSetCode(e.target.value)}
            className="w-45 h-7 text-sm sm:text-sm text-black mx-auto bg-white p-2  text-center rounded-xl placeholder:text-black placeholder:font-bold"
          />
          </div>
        )}

        {/* SETS FORM */}
        {type === "sets" &&
          game!=="magic" &&
          game !== "lorcana" &&
          game !== "onepiece" &&
          game !== "riftbound" && (
            <div className="mb-4 flex flex-col">
              <label className="set-code-input ">Enter The SetCode</label>
              <input
                type="text"
                value={setCode}
                onChange={(e) => setSetCode(e.target.value)}
                className="w-45 h-7 p-2 mx-auto border-3 rounded-xl"
              />
            </div>
          )}

        <div>
          <button
            type="button"
            onClick={handleSubmit}
            className="text-sm w-20 h-7  bg-blue-600 hover:bg-blue-700 font-bold  rounded"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
