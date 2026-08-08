import { PokemonSingle} from "../../../../../lib/db/schema";
import PerfectText from "../../../Perfect";

type Props = {
  product: PokemonSingle;
};

export default function PokemonCardDescription({ product }: Props) {
  return (
    <section className="bg-[#ffffffB3] rounded text-center shadow p-4">
          <h2 className="text-lg underline text-center font-extrabold mb-2">
            Card Description
          </h2>
    
          <div className="font-arial-black text-extrabold text-center">
            <PerfectText>
              <p className="whitespace-pre-line text-black">{product.flavorText}</p>
            </PerfectText>
          </div>
        </section>

  );
}
