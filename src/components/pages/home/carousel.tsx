"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

/**
 * (ratio: height x 2.5 = width) Example: Image width 1375px, height 550px
 */
const Carousel = () => {
  return (
    <div className="bg-[#252525]">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ clickable: true }}
        // onSlideChange={(swiper) => console.log(swiper)}
        // autoplay={{
        //   delay: 4000,
        //   disableOnInteraction: false,
        // }}
        effect="fade"
        // loop
        className="max-w-[1300px]"
      >
        <SwiperSlide className="!h-auto max-h-[550px] bg-white">
          <Image
            alt="Flame Banner"
            priority
            src={`https://cdn.flameagricultural.com/banner-welcome-1375-1.png`}
            width={1375}
            height={550}
            sizes="100vw"
            className="min-w-full w-0 max-w-full max-h-auto object-cover"
            quality={95}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
