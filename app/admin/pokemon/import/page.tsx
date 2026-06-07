"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImportPage() {
  const router = useRouter();

  const [pokemonId, setPokemonId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState<boolean>(false);

  async function handleImport(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;
    if (!pokemonId.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/pokemon/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pokemon_id: pokemonId.trim(),
          price,
          flavor_text: description,
        }),
      });

      if (!res.ok) throw new Error("Import failed");

      setPokemonId("");
      setPrice("");
      setDescription("");

      router.refresh(); // optional but recommended
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Import Pokemon Card</h1>

      <form onSubmit={handleImport} className="flex flex-col gap-4 max-w-lg">
        <input
          className="p-2 bg-gray-800 border border-gray-700"
          placeholder="Pokemon ID"
          value={pokemonId}
          onChange={(e) => setPokemonId(e.target.value)}
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
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 p-2 rounded"
        >
          {loading ? "Importing..." : "Import Card"}
        </button>
      </form>
    </div>
  );
}
