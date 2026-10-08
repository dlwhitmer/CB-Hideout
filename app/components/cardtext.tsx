import { YugiohSingle, YugiohPrinting, YugiohSet } from "../../lib/db/schema";

type Props = {
  product: YugiohSingle;
  printing?: YugiohPrinting;
  set?: YugiohSet;
};

export default function CardText({ product }: Props) {
  return (
    <main className="grid grid-cols-2 gap-8 w-full">

      <h1 className="text-black text-center underline text-2xl font-bold max-w-full">
       Card Text
      </h1>
      <div className="grid grid-cols-1  gap-x-[60px] mx-[36px] text-center w-full">
        <p>
          {/* <span className="text-[#e12729]  underline font-semibold">Card Description:</span> */}
          <span className="font-semibold"> {product.desc}</span>
        </p>

      </div>
    </main>
  );
}
