"use client";

import { useState } from "react";

type SearchResult = {
  name: string;
  setCode: string;
  cardNumber: string;
  productId: string;
  setName: string;
  imageUrl: string;
  ourPrice: number;
};

export default function GundamSinglesSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [importingId, setImportingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query.trim()) {
      setError("Enter a card name or card ID.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");
    setResults([]);

    try {
      const response = await fetch(
        `/api/gundam/singles/search?q=${encodeURIComponent(query.trim())}`,
        { cache: "no-store" },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Search failed.");
      }

      setResults(data.results ?? []);

      if (data.results?.length === 0) {
        setMessage("No matching cards found.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleImport(card: SearchResult) {
    setImportingId(card.cardNumber);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/gundam/singles/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          setCode: card.setCode,
          productId: card.productId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Import failed.");
      }

      setMessage(data.message || `${card.name} imported successfully.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed.");
    } finally {
      setImportingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Gundam Singles</h1>
            <p className="mt-2 text-gray-400">
              Search OPTCG and import individual cards.
            </p>
          </div>

          <a
            href="/admin/gundam/singles/inventory"
            className="rounded-lg border border-gray-600 px-4 py-2 hover:bg-gray-800"
          >
            View Inventory
          </a>
        </div>

        <form
          onSubmit={handleSearch}
          className="mb-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter card name or card ID..."
            className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <div className="mb-5 rounded-lg border border-red-700 bg-red-950 p-3 text-red-300">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-5 rounded-lg border border-green-800 bg-green-950 p-3 text-green-300">
            {message}
          </div>
        )}

        {results.length > 0 && (
          <p className="mb-4 text-gray-400">
            Found {results.length} matching cards.
          </p>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((card, index) => (
            <div
              key={`${card.setCode}-${card.cardNumber}-${index}`}
              className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950"
            >
              <div className="flex h-64 items-center justify-center bg-gray-900 p-3">
                {card.imageUrl ? (
                  <img
                    src={`/api/gundam/image?code=${card.cardNumber}`}
                    alt={card.name}
                    className="h-full max-w-full object-contain"
                    onError={() => console.log("IMAGE FAILED:", card.imageUrl)}
                    onLoad={() => console.log("IMAGE LOADED:", card.imageUrl)}
                    
                  />
                ) : (
                  <span className="text-gray-500">No image available</span>
                )}
              </div>

              <div className="space-y-3 p-4">
                <h2 className="font-bold">{card.name}</h2>

                <p className="text-sm text-gray-400">Card ID: {card.setCode}</p>

                <p className="text-sm text-gray-400">Set: {card.setName}</p>

                <button
                  type="button"
                  onClick={() => handleImport(card)}
                  disabled={importingId !== null}
                  className="w-full rounded-lg bg-green-700 px-4 py-2 font-semibold hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {importingId === card.cardNumber
                    ? "Importing..."
                    : "Import Card"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
