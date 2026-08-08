import { YugiohSingle } from "../../../../../lib/db/schema";
import PerfectText from "../../../Perfect";
type Props = {
  product: YugiohSingle;
};

export default function CardDesctiption({ product }: Props) {
  return (
    <section className="bg-[var(--dpm)] rounded shadow p-4">
      <h2 className="text-lg underline text-center font-extrabold mb-2">
        Card Description
      </h2>

      <div className="font-arial-black text-extrabold text-center">
        <PerfectText>
          <p className="whitespace-pre-line text-black">{product.desc}</p>
        </PerfectText>
      </div>
    </section>
  );
}
