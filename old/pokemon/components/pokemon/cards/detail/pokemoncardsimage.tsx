
import { PokemonCard } from "../../../../../lib/db/schema";
import BackButton from "../../../../backButton";

type Props = {
  product: PokemonCard;
};

export default function PokemonCardsImage({ product }: Props) {
  return (
    <section className="bg-transparent rounded shadow">
      <div className="relative z-50 flex justify-center pointer-events-auto">
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
