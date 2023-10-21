"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

/**
 * (ratio: height x 2.5 = width) Example: Image width 1375px, height 550px 
 */
const Carousel = () => {
  return (
    <div className="">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        // onSlideChange={(swiper) => console.log(swiper)}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
        className="max-w-[1300px]"
      >
        <SwiperSlide className="!h-auto max-h-[550px] bg-white">
          <Image
            alt="Flame banner"
            priority
            src={`https://res.cloudinary.com/flame-media/image/upload/v1695795540/dev/banner/ahb17kyh3n3yzty4mt0u.jpg`}
            width={1200}
            height={550}
            sizes="100vw"
            className="min-w-full w-0 max-w-full max-h-auto object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="!h-auto max-h-[550px] bg-white">
          <Image
            alt="Flame banner"
            priority
            src={`https://res.cloudinary.com/flame-media/image/upload/v1696307823/dev/banner/iq518l1ndfh7yubu3eiq.jpg`}
            width={1200}
            height={550}
            sizes="100vw"
            className="min-w-full w-0 max-w-full max-h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
