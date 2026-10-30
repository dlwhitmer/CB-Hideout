"use client";
import HomeHero from "./components/mainpage/HomeHero";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage() {
  
  
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };


  return (
    <main className="main-page">
      <HomeHero />
      <div className="main-page-banners">
        <Slider {...settings}>
          <div>
            <img
              src={"./products/magic/banners/magic_banner_5.webp"}
              alt="Magic"
              className="slider-banner"
            />
          </div>

          <div>
            <img
              src={"./products/Lorcana/banners/lorcana-banner4.webp"}
              alt="Lorcana"
              className="slider-banner"
            />
          </div>

          <div>
            <img
              src={"./products/Gundam/banners/gundam-banner1.webp"}
              alt="Gundam"
              className="slider-banner"
            />
          </div>
          <div>
            <img
              src={"./products/Onepiece/banners/onepiece-banner2.webp"}
              alt="One Piece"
              className="slider-banner"
            />
          </div>
          <div>
            <img
              src={"./products/RiftBound/banners/riftbound-banner1.webp"}
              alt="Rift Bound"
              className="slider-banner"
            />
          </div>
        </Slider>
      </div>
    </main>
  );
}
