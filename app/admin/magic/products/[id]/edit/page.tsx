"use client";
import BackButton from "../../../../../backButton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { MagicProduct } from "../../../../../../lib/db/schema/magic_products";

export default function EditMagicProductPage() {
  const { id } = useParams();
  const [form, setForm] = useState<MagicProduct | null>(null);

  console.log("EDIT PAGE PARAM ID:", id);

  useEffect(() => {
    if (!id) return; // prevents undefined fetch

    async function load() {
      const res = await fetch(`/api/magic/products/${id}`);
      const json = await res.json();
      setForm(json.data);
    }

    load();
  }, [id]);

  if (!id) return <div>Loading ID...</div>;
  if (!form) return <div>Loading card...</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("FORM BEING SAVED:", form);

    const response = await fetch(`/api/magic/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    console.log("SAVE STATUS:", response.status);

    if (!response.ok) {
      console.error("SAVE FAILED");
      return;
    }

    const result = await response.json();
    console.log("SAVE RESPONSE:", result);

    console.log("SAVE RESPONSE:", result);

    window.location.href = `/admin/magic/products`;
  }

  return (
    <div className="min-h-screen bg-[#ffd380] w-full">
      <div className="text-[30px] text-black font-bold text-center min-h-screen pt-3 mx-auto max-w-[400px]  ">
        <h1>Edit Magic Products</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-[#fbf2c4] gap-2 pt-5 max-w-sm"
        >
          <div className="flex justify-center pt-1">
            <BackButton />
          </div>
          <div className="flex justify-center">
            <img
              src={form.imageUrl}
              alt={form.productName}
              width={180}
              height={250}
              className="rounded shadow"
            />
          </div>
          <label className="block text-[16px] font-semibold">
            Product Name
          </label>
          <input
            className="text-[20px] border p-2 rounded"
            value={form.productName}
            readOnly
          />
          <label className="block text-[16px] font-semibold">Set Name</label>
          <input
            className="text-[20px] border p-2 rounded"
            value={form.setName}
            readOnly
          />
          <label className="block text-[16px] font-semibold">Set Code</label>
          <input
            className=" text-[20px] border p-2 rounded"
            value={form.setCode}
            readOnly
          />
          <label className="block text-[16px] font-semibold">
            Release Date
          </label>
          <input
            className=" text-[20px] border p-2 rounded"
            value={form.releaseDate}
            readOnly
          />
          <label className="block text-[16px] font-semibold">
            Packs Per Box
          </label>
          <input
            className="text-[20px] border p-2 rounded"
            type="number"
            value={form.packsPerBox ?? ""}
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setForm({
                ...form,
                packsPerBox: isNaN(num) ? 0 : num,
              });
            }}
          />
          <label className="block text-[16px] font-semibold">
            Cards Per Pack
          </label>
          <input
            className="text-[20px] border p-2 rounded"
            type="number"
            value={form.cardsPerPack ?? ""}
            onChange={(e) => {
              const num = parseInt(e.target.value);
              setForm({
                ...form,
                cardsPerPack: isNaN(num) ? 0 : num,
              });
            }}
          />
          <label className="block text-[16px] font-semibold">
            Market Price
          </label>
          <div className="relative">
            <span className="absolute left-15 top-1/2 -translate-y-1/2 text-[20px]">
              $
            </span>

            <input
              className="text-[20px] border p-2 pl-7 rounded"
              type="number"
              step="0.01"
              value={form.marketPrice ?? ""}
              onChange={(e) => {
                const num = parseFloat(e.target.value);

                setForm({
                  ...form,
                  marketPrice: isNaN(num) ? 0 : num,
                });
              }}
            />
          </div>
          <label className="block text-[16px] font-semibold">Our Price</label>
          <div className="relative">
            <span className="absolute left-15 top-1/2 -translate-y-1/2 text-[20px]">
              $
            </span>

            <input
              className="text-[20px] border p-2 pl-7 rounded"
              type="number"
              step="0.01"
              value={form.ourPrice ?? ""}
              onChange={(e) => {
                const num = parseFloat(e.target.value);
                setForm({
                  ...form,
                  ourPrice: isNaN(num) ? 0 : num,
                });
              }}
            />
          </div>
          <label className="block text-[16px] font-semibold">Quantity</label>
          <div>
            <input
              className="text-[20px] border p-2 rounded"
              type="number"
              value={form.quantity ?? ""}
              placeholder="Quantity"
              onChange={(e) => {
                const num = parseInt(e.target.value);
                setForm({
                  ...form,
                  quantity: isNaN(num) ? 0 : num,
                });
              }}
            />
          </div>
          <label className="block text-[16px] font-semibold ">
            Description
          </label>
          <textarea
            className="text-[20px] border p-2 rounded"
            value={form.description ?? ""}
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button
            type="submit"
            className="mx-auto w-[120px] h-auto text-[20px] bg-blue-600 text-white p-2 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
