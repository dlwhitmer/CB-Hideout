"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImportPage() {
  const router = useRouter();

  const [scryfallId, setScryfallId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  async function handleImport(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scryfall_id: scryfallId,
        price,
        description,
      }),
    });

    router.push("/admin/products");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Import MTG Card</h1>

      <form onSubmit={handleImport} className="flex flex-col gap-4 max-w-lg">
        <input
          className="p-2 bg-gray-800 border border-gray-700"
          placeholder="Scryfall ID"
          value={scryfallId}
          onChange={(e) => setScryfallId(e.target.value)}
        />
        <input
          className="p-2 bg-gray-800 border border-gray-700"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          className="p-2 bg-gray-800 border border-gray-700"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-green-600 hover:bg-green-700 p-2 rounded">
          Import Card
        </button>
      </form>
    </div>
  );
}
