"use client";

export default function DeleteButton({ yugiohId }: { yugiohId: string | null }) {
  async function handleDelete() {
    console.log("Sending DELETE to:", `/api/yugioh/singles${yugiohId}`);

    await fetch(`/api/yugioh/singles${yugiohId}`, {
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