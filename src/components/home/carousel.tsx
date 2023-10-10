"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const Carousel = () => {
  return (
    <div className="">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        //onSlideChange={(swiper) => console.log(swiper)}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
        className="h-full max-h-[580px]"
      >
        <SwiperSlide className="!h-auto max-h-[600px] bg-white">
          <Image
            alt="Flame banner"
            priority
            src={`https://res.cloudinary.com/flame-media/image/upload/v1695795540/dev/banner/ahb17kyh3n3yzty4mt0u.jpg`}
            width={1200}
            height={600}
            sizes="100vw"
            className="w-full h-auto object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="!h-auto max-h-[600px] bg-white">
          <Image
            alt="Flame banner"
            priority
            src={`https://res.cloudinary.com/flame-media/image/upload/v1696307823/dev/banner/iq518l1ndfh7yubu3eiq.jpg`}
            width={1200}
            height={600}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="!h-auto max-h-[600px] bg-white">
          <Image
            alt="Flame banner"
            priority
            src={`https://pub-1b78f46b31aa4b9d89b9fa57dedf700f.r2.dev/BANNER-1.png`}
            width={1200}
            height={600}
            sizes="100vw"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
