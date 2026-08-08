import Image from "next/image";
import { YugiohSingle, YugiohPrinting } from "../../../../../lib/db/schema";
import BackButton from "../../../../backButton";

type Props = {
  product: YugiohSingle;
  printing?: YugiohPrinting;
};

export default function CardImage({ product }: Props) {
  return (
    <section className="bg-transparent rounded shadow">
       <div className="flex justify-center ">
        <BackButton/>
      </div>
      <Image
        src={product.imageLarge || "/placeholder.png"}
        alt={product.name}
        width={300}
        height={420}
        className="rounded"
      />
     
    </section>
  );
}