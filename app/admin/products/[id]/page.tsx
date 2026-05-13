interface Props {
  params: { id: string };
}

export default function EditProductPage({ params }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <p>Editing product ID: {params.id}</p>
    </div>
  );
}