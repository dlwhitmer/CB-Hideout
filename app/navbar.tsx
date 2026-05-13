import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 h-1">
      
      {/* glass layer */}
      <div className="backdrop-blur-md bg-[#000000] border-b ">
        
        <div className="px-6 py-6 flex items-center justify-between">

          {/* Logo / Brand */}
          <div className="text-white font-bold tracking-widest">
            ARCANE
          </div>

          {/* Links */}
          <ul className="flex space-x-6 text-sm text-white/80 font-medium">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-white transition">
                Checkout
              </Link>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}