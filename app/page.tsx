"use client";
import HomeHero from "./components/mainpage/HomeHero";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <main>
      <div className="relative min-h-screen bg-[url('/images/arcane-bg.webp')] bg-cover bg-center bg-no-repeat">
        <HomeHero />

        <Slider {...settings}>
          <div>
            <img
              src="/images/magic_banner_5.webp"
              alt="Magic"
              className="w-full h-auto object-contain"
            />
          </div>

          <div>
            <img
              src="/images/pokemon_banner_2.webp"
              alt="Pokémon"
              className="w-full h-auto object-contain"
            />
          </div>

          <div>
            <img
              src="/images/yugioh_banner_2.webp"
              alt="Yu-Gi-Oh!"
              className="w-full h-auto object-contain"
            />
          </div>
        </Slider>
      </div>
    </main>
  );
}
