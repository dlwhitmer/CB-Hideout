"use client";
import DeleteButton from "../DeleteButton";
import { useEffect, useState } from "react";
import Link from "next/link";
// import BackButton from "../../../backButton";
import { MagicProduct } from "../../../../lib/db/schema/magic_products";

export default function MagicProductsPage() {
  const [products, setProducts] = useState<MagicProduct[]>([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const limit = 10;

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/magic/products/list");
      const data = await res.json();

      setProducts(data.data);
    }

    loadProducts();
  }, []);

  //   useEffect(() => {
  //     async function load() {
  //       const res = await fetch(
  //         `/api/magic/products?page=${page}&limit=${limit}&set=${setFilter}`,
  //       );
  //       const data = await res.json();

  //       setProducts(data.rows);
  //       setTotal(data.total);
  //     }

  //     load();
  //   }, [page, setFilter]);

  return (
    <section className=" bg-[#ffd380] p-6">
      <div className=" min-h-screen mx-auto w-full text-black bg-[#ffd380] font-bold text-center ">
        <div className="flex justify-center mb-2">
          <img
            src="/images/Magic-Logo.webp"
            alt="Yu-Gi-Oh Logo"
            width={220}
            height={70}
            className="h-auto"
          />
        </div>

        <table className="mx-auto w-[900px]">
          <thead>
            <tr className="bg-[#f8cc1b] min-h-screen w-full mx-auto text-black">
              <th className="px-3 py-2 !text-center">Image</th>
              <th className="px-3 py-2 !text-center">Product Name</th>
              <th className="px-3 py-2 !text-center">Set Name</th>
              <th className="px-3 py-2 !text-center">Our Price</th>
              <th className="px-3 py-2 !text-center">Quantity</th>
              <th className="px-3 py-2 !text-center">Status</th>
              <th className="px-3 py-2 !text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((prod) => (
              <tr key={prod.id} className="admin-tbody">
                <td className="p-2">
                  <img
                    src={prod.imageUrl || "/placeholder.png"}
                    alt={prod.productName}
                    className="w-[100px] h-auto rounded shadow"
                  />
                </td>

                <td className="px-3 py-2 text-center font-bold">
                  {prod.productName}
                </td>

                <td className="px-3 py-2 text-center font-bold">
                  {prod.setName}
                </td>

                <td className="px-3 py-2 text-center font-bold">
                  ${prod.ourPrice}
                </td>

                <td className="px-3 py-2 text-center font-bold">
                  {prod.quantity}
                </td>

                <td className="px-3 py-2 text-center font-bold">
                  {prod.quantity > 0 ? "In Stock" : "Out of Stock"}
                </td>

                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex justify-center gap-1">
                    <Link
                      href={`/admin/magic/products/${prod.id}/edit`}
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>

                    <DeleteButton id={prod.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
          >
            Previous
          </button>

          <span className="self-center">
            Page {page} / {totalPages || 1}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
