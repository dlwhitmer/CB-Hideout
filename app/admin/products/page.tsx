import db from "@/db/connect";

export default function ProductsPage() {

  const products = db
    .prepare("SELECT id, scryfall_id, name, price, image_url FROM products")
    .all();

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((p: any) => (
          <li key={p.id}>
            {p.name} — ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}