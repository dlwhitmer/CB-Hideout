"use client";

export default function DeleteButton({id}: { id: number | string | null}) {
  async function handleDelete() {
    console.log("Sending DELETE to:", `/api/pokemon/products${id}`);

    await fetch(`/api/pokemon/products${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  }

  return (
     <button
      type="button"
      onClick={handleDelete}
      className=" bg-red-600 hover:bg-red-500 text-white py-1 rounded"
    >
      Delete
    </button>
  );
}