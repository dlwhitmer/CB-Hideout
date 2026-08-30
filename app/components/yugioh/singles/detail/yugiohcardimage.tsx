import Image from "next/image";
import { YugiohSingle, YugiohPrinting } from "../../../../../lib/db/schema";
import BackButton from "../../../../backButton";

type Props = {
  product: YugiohSingle;
  printing?: YugiohPrinting;
};

export default function YugiohCardImage({ product }: Props) {
  return (
    <section className="bg-transparent rounded shadow">
      <div className="bg-black flex justify-center p-3 ">
        <BackButton />
      </div>
      <Image
        src={product.imageLarge || "/placeholder.png"}
        alt={product.name}
        width={300}
        height={420}
        className="rounded transition-all duration-300 hover:pt-24 pb-23 hover:scale-150"
      />
    </section>
  );
}
