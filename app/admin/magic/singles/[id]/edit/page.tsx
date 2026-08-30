"use client";
import BackButton from "../../../../../backButton";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { MagicSingle } from "../../../../../../lib/db/schema/magic_singles";

export default function EditMagicSinglePage() {
  const { id } = useParams();
  const [form, setForm] = useState<MagicSingle | null>(null);

  console.log("EDIT PAGE PARAM ID:", id);

  useEffect(() => {
    if (!id) return; // prevents undefined fetch

    async function load() {
      const res = await fetch(`/api/magic/singles/${id}`);
      const json = await res.json();
      setForm(json.data);
    }

    load();
  }, [id]);

  if (!id) return <div>Loading ID...</div>;
  if (!form) return <div>Loading card...</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/magic/singles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    window.location.href = `/admin/magic/singles`;
  }

  return (
    <div className="min-h-screen bg-[#ffd380] w-full">
      <div className="text-[30px] text-black font-bold text-center min-h-screen pt-3 mx-auto max-w-[400px]  ">
        <h1>Edit Pokemon Single</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-[#fbf2c4] gap-2 pt-5 max-w-sm"
        >
          <div className="flex justify-center pt-1">
            <BackButton />
          </div>
          <div className="flex justify-center mb-1">
            <img
              src={form.imageSmall}
              alt={form.name}
              width={180}
              height={250}
              className="rounded shadow"
            />
          </div>

          <input
            className=" text-[20px] border p-2 rounded"
            value={form.name}
            readOnly
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="text-[20px] border p-2 rounded"
            value={form.setName}
            readOnly
            onChange={(e) => setForm({ ...form, setName: e.target.value })}
          />

          <input
            className=" text-[20px] border p-2 rounded"
            value={form.rarity}
            readOnly
            onChange={(e) => setForm({ ...form, rarity: e.target.value })}
          />

          <div className="relative">
            <span className="absolute left-15 top-1/2 -translate-y-1/2 text-[20px]">
              $
            </span>

            <input
              className="text-[20px] border p-2 pl-7 rounded"
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => {
                const num = parseFloat(e.target.value);
                setForm({
                  ...form,
                  price: isNaN(num) ? 0 : num,
                });
              }}
            />
          </div>

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
