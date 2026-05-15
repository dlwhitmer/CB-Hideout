"use client";

export default function DeleteButton({ id }: { id: number }) {
  async function handleDelete() {
    console.log("Sending DELETE to:", `/api/products/${id}`);

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="w-full bg-red-600 hover:bg-red-500 text-white py-1 rounded"
    >
      Delete
    </button>
  );
}