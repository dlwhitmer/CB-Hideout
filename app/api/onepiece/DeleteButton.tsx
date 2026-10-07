"use client";

type DeleteButtonProps = {
  id: number;
};
export default function DeleteButton({ id }: DeleteButtonProps) {
  async function handleDelete() {
    console.log("Sending DELETE to:", `/api/magic/products/${id}`);

    await fetch(`/api/magic/products/${id}`, {
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