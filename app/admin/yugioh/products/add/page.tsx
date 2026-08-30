"use client";

import { useState } from "react";
import BackButton from "../../../../backButton";
import SquealerText from "../../../../components/Squealer";
import SquealerEmbossedText from "../../../../components/SquealerEmbossed";

export default function AddYugiohProducts() {
  const [form, setForm] = useState({
    productType: "",
    setCode: "",
    setName: "",
    productName: "",
    releaseDate: "",
    cardsPerPack: "",
    packsPerBox: "",
    marketPrice: "",
    ourPrice: "",
    imageUrl: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/yugioh/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Product save failed:", response.status, text);
        return;
      }

      const data = await response.json();
      console.log("Product saved:", data);

      setForm({
        productType: "",
        setCode: "",
        setName: "",
        productName: "",
        releaseDate: "",
        cardsPerPack: "",
        packsPerBox: "",
        marketPrice: "",
        ourPrice: "",
        imageUrl: "",
        description: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
    }
  };
  return (
    <section>
      <div>
        <img
        src={"/images/yugioh_logo.webp"}
        alt="Yugioh Logo"
        className="bg-black rounded-2xl mx-auto w-[300px]"
        />
        <div className="text-white text-[25px] rounded-3xl bg-[#f0492f] text-center w-[300px] mx-auto">
       <div>
   
          <h1>Add Products to DB</h1>
        
       </div>
        </div>
      </div>
      <form className="text-black" onSubmit={handleSubmit}>
        <div className="flex justify-center p-2">
          <select
            value={form.productType}
            onChange={(e) => setForm({ ...form, productType: e.target.value })}
            className="prod-in"
          >
            <option value="">Product Type</option>
            <option value="Set">Set</option>
            <option value="Booster Pack">Booster Pack</option>
            <option value="Booster Box">Booster Box</option>
            <option value="Collector Booster">Collector Booster</option>
            <option value="Collector Booster Box">Collector Booster Box</option>
            <option value="Bundle">Bundle</option>
          </select>
        </div>
        <div className="add-div">
          <input
            value={form.setCode}
            placeholder="Set Code"
            onChange={(e) => setForm({ ...form, setCode: e.target.value })}
            className="prod-in"
          />

          <input
            value={form.setName}
            placeholder="Set Name"
            onChange={(e) => setForm({ ...form, setName: e.target.value })}
            className=" prod-in"
          />
          <input
            value={form.productName}
            placeholder="Product Name"
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
            className="prod-in"
          />
        </div>
        <div className="add-div">
          <input
            value={form.releaseDate}
            placeholder="Release Date"
            onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
            className="prod-in"
          />
          <input
            value={form.cardsPerPack}
            placeholder="Cards Per Deck"
            onChange={(e) => setForm({ ...form, cardsPerPack: e.target.value })}
            className="prod-in"
          />
          <input
            value={form.packsPerBox}
            placeholder="Packs Per Box"
            onChange={(e) => setForm({ ...form, packsPerBox: e.target.value })}
            className="prod-in"
          />
        </div>
        <div className="add-div">
          <input
            value={form.marketPrice}
            placeholder="Market Price"
            onChange={(e) => setForm({ ...form, marketPrice: e.target.value })}
            className="prod-in"
          />
          <input
            value={form.ourPrice}
            placeholder="Our Price"
            onChange={(e) => setForm({ ...form, ourPrice: e.target.value })}
            className="prod-in"
          />
          <input
            value={form.imageUrl}
            placeholder="Image Url"
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="prod-in"
          />
        </div>
        <div className="flex justify-center pt-2">
          <textarea
            value={form.description}
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="prod-in h-[100px]"
          />
        </div>
        <div className="w-40 mx-auto flex justify-center mt-4 border-3">
          <button type="submit">Submit</button>
        </div>
      </form>
      <div className="flex justify-center p-2">
              <BackButton />
            </div>
    </section>
  );
}
