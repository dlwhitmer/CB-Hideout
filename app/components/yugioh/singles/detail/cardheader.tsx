import { YugiohSingle, YugiohPrinting } from "../../../../../lib/db/schema";

type Props = {
  product: YugiohSingle;
  printing?: YugiohPrinting;
};

export default function CardHeader({ product }: Props) {
  return (
      <section className="bg-[var(--dpm)] rounded shadow p-1">
         <div className="text-center font-bold">
        <h2 className="text-xl">Card Name:</h2>
        <p className="text-lg mb-2 ">{product.name}</p>
      </div>
        </section>
       )}