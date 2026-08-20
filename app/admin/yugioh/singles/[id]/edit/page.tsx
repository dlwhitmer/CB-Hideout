"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BackButton from "../../../../../backButton";
import type {
  YugiohSingle,
  YugiohPrinting,
} from "../../../../../../lib/db/schema";

export default function EditYugiohSinglePage() {
  const { id } = useParams();
  const [form, setForm] = useState<YugiohSingle | null>(null);
  const [printings, setPrintings] = useState<YugiohPrinting[]>([]);

  console.log("EDIT PAGE PARAM ID:", id);

  useEffect(() => {
    if (!id) return;

    async function load() {
      const res = await fetch(`/api/yugioh/singles/${id}`);
      const json = await res.json();

      console.log("EDIT RESPONSE:", json);

      setForm(json.data);
      setPrintings(json.printings ?? []);
    }

    load();
  }, [id]);

  if (!id) return <div>Loading ID...</div>;
  if (!form) return <div>Loading card...</div>;
  if (!printings) return <div>Loading printings...</div>;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch(`/api/yugioh/singles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    window.location.href = `/admin/yugioh/singles`;
  }

  return (
    <section className="bg-green-600 ">
    <div className="text-[30px] bg-[#ffd380] text-black font-bold text-center min-h-screen pt-2 mx-auto max-w-[400px]  ">
      <h1>Edit Yugioh Single</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 pt-3 max-w-sm"
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
          className=" text-[20px] text-center border p-2 rounded"
          value={form.name}
          readOnly
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <div className=" border space-y-2">
          {printings.map((printing) => (
            <div key={printing.id} className="text-[20px]">
              {printing.setName} — {printing.setRarity}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {printings.map((printing) => (
            <div key={printing.id} className="text-[20px] border p-2 rounded">
              <div>{printing.setName}</div>
              <div className="text-base">{printing.setRarity}</div>
            </div>
          ))}
        </div>

        <div className="relative">
          <span className="absolute left-38 top-1/2 -translate-y-1/2 text-[20px]">
            $
          </span>

          <input
            className=" w-[100px] text-[20px] border p-2 pl-7 rounded"
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
          className=" text-[20px] bg-blue-600 text-white p-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
    </section>
  );
}
