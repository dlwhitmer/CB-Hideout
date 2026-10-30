export default function TestPage() {
  const magic1 = "./products/magic/products/magic1.webp";
  const magic2 = "./products/magic/products/magic2.webp";
  const magic3 = "./products/magic/products/magic3.webp";
  const magic4 = "./products/magic/products/magic4.webp";
  const gundam4 = "./products/gundam/products/gundam4.webp";
  const magicmat1 = "./products/magic/products/magicmat1.webp";
  const magicmat2 = "./products/magic/products/magicmat2.webp";
  const magicmat3 = "./products/magic/products/magicmat3.webp";

  return (
    <section>
      <div className="grid grid-cols-5 pb-2 pt-2 min-w-1/5 mx-auto">
        <div className="border-2 h-84 content-start grid justify-center">
          <img className="h-52 hover:scale-110" src={magic1} />
          <p className="text-center text-lg font-bold">Secrets of StrixHaven</p>
          <p className="text-center text-base font-semibold">$130.00</p>
          <div className="mx-auto">
            <button className="text-lg border rounded-lg pr-2 pl-2">
              More Information
            </button>
          </div>
          <div className="mx-auto pt-2">
            <button className="text-xl mx-auto border-2 rounded-xl bg-amber-400 w-40">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="border-2 h-84 content-start grid justify-center">
          <img className="h-52 hover:scale-110" src={magic2} />
          <p className="text-center text-lg font-bold">
            Teenage Muntant Turtles
          </p>
          <p className="text-center text-base font-semibold">$130.00</p>
          <div className="mx-auto">
            <button className="text-lg border rounded-lg pr-2 pl-2">
              More Information
            </button>
          </div>
          <div className="mx-auto pt-2">
            <button className="text-xl mx-auto border-2 rounded-xl bg-amber-400 w-40">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="border-2 h-84 content-start grid justify-center">
          <img className="h-52 hover:scale-110" src={magic3} />
          <p className="text-center text-lg font-bold">Lord of the Rings</p>
          <p className="text-center text-base font-semibold">$130.00</p>
          <div className="mx-auto">
            <button className="text-lg border rounded-lg pr-2 pl-2">
              More Information
            </button>
          </div>
          <div className="mx-auto pt-2">
            <button className="text-xl mx-auto border-2 rounded-xl bg-amber-400 w-40">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="border-2 h-84 content-start grid justify-center">
          <img className="h-52 hover:scale-110" src={magic4} />
          <p className="text-center text-lg font-bold">Modern Horizons 3</p>
          <p className="text-center text-base font-semibold">$130.00</p>
          <div className="mx-auto">
            <button className="text-lg border rounded-lg pr-2 pl-2">
              More Information
            </button>
          </div>
          <div className="mx-auto pt-2">
            <button className="text-xl mx-auto border-2 rounded-xl bg-amber-400 w-40">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="border-2 h-84 content-start grid justify-center">
          <img className="h-52 hover:scale-110" src={gundam4} />
          <p className="text-center text-xl font-bold">Phantom Aria</p>
          <p className="text-center text-base font-semibold">$120.00</p>
          <div className="mx-auto">
            <button className="text-lg border rounded-lg pr-2 pl-2">
              More Information
            </button>
          </div>
          <div className="mx-auto pt-2">
            <button className="text-xl mx-auto border-2 rounded-xl bg-amber-400 w-40">
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 pb-10 pt-1 min-w-1/5 mx-auto">
        <div className="border-2 h-84 content-start grid justify-center">
          <img className="h-35 hover:scale-110" src={magicmat1} pb-17 />
          <p className="text-center text-lg pt-17 font-bold">Magic Mat</p>
          <p className="text-center text-base font-semibold">$30.00</p>
          <div className="mx-auto">
            <button className="text-lg border rounded-lg pr-2 pl-2">
              More Information
            </button>
          </div>
          <div className="mx-auto pt-2">
            <button className="text-xl mx-auto border-2 rounded-xl bg-amber-400 w-40">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="border-2 h-84 content-start grid justify-center">
          <img className="h-35 content-align hover:scale-110" src={magicmat2} />
          <p className="text-center pt-17 text-lg font-bold">
            Magic Mat
          </p>
          <p className="text-center text-base font-semibold">$25.00</p>
          <div className="mx-auto">
            <button className="text-lg border rounded-lg pr-2 pl-2">
              More Information
            </button>
          </div>
          <div className="mx-auto pt-2">
            <button className="text-xl mx-auto border-2 rounded-xl bg-amber-400 w-40">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="border-2 h-84 content-start grid justify-center">
          <img className="h-35 content-center hover:scale-110" src={magicmat3} pb-17/>
          <p className="text-center pt-17 text-lg font-bold">Magic Mat</p>
          <p className="text-center text-base font-semibold">$35.00</p>
          <div className="mx-auto">
            <button className="text-lg border rounded-lg pr-2 pl-2">
              More Information
            </button>
          </div>
          <div className="mx-auto pt-2">
            <button className="text-xl mx-auto border-2 rounded-xl bg-amber-400 w-40">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="border-2 h-84 content-start grid justify-center">
          <img className="h-52 hover:scale-110" src={magic4} />
          <p className="text-center text-lg font-bold">Modern Horizons 3</p>
          <p className="text-center text-base font-semibold">$130.00</p>
          <div className="mx-auto">
            <button className="text-lg border rounded-lg pr-2 pl-2">
              More Information
            </button>
          </div>
          <div className="mx-auto pt-2">
            <button className="text-xl mx-auto border-2 rounded-xl bg-amber-400 w-40">
              Add To Cart
            </button>
          </div>
        </div>
        <div className="border-2 h-84 content-start grid justify-center">
          <img className="h-52 hover:scale-110" src={gundam4} />
          <p className="text-center text-xl font-bold">Phantom Aria</p>
          <p className="text-center text-base font-semibold">$120.00</p>
          <div className="mx-auto">
            <button className="text-lg border rounded-lg pr-2 pl-2">
              More Information
            </button>
          </div>
          <div className="mx-auto pt-2">
            <button className="text-xl mx-auto border-2 rounded-xl bg-amber-400 w-40">
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
