import Image from "next/image";
export default function Home() {
  return (
    <main
      className="min-h-screen bg-[url('/images/arcane-bg.webp')] bg-no-repeat bg-[length:100%_100%]
 "
    >
      <div className="flex justify-center pt-2 md:-m-6 lg:pt-2">
        <Image
          src="/images/CBH_Logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="w-[200px] sm:w-[200px] md:w-[300px] lg:w-[350px] object-contain"
        ></Image>
      </div>
    </main>
  );
}
