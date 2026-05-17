"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  // Form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(""); // Oracle Text

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        // Prefill form fields
        setName(data.name || "");
        setPrice(data.price || "");
        setDescription(data.oracle_text || data.description || "");

        setLoading(false);
      } catch (err) {
        console.error("Error loading product", err);
      }
    }

    loadProduct();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        description,
      }),
    });

    router.push("/admin/products");
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-semibold">Name</label>
          <input
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold">Price</label>
          <input
            className="border p-2 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold">Description (Oracle Text)</label>
          <textarea
            className="border p-2 w-full h-40"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}