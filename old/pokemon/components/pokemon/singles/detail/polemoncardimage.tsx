import Image from "next/image";
import { PokemonSingle } from "../../../../../lib/db/schema";
import BackButton from "../../../../backButton";

type Props = {
  product: PokemonSingle;
};

export default function PokemonCardImage({ product }: Props) {
  return (
    <section className="bg-transparent rounded shadow">
      <div className="flex justify-center p-3 ">
        <BackButton />
      </div>
        <img
          src={product.imageLarge || "/placeholder.png"}
          alt={product.name}
          width={300}
          height={420}
          className="rounded transition-all duration-300 hover:pt-22 pb-22 hover:scale-150"
        />
    </section>
  );
}
