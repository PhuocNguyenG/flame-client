"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Carousel = () => {
  return (
    <div className="min-h-[calc(100vh-60px)]">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        //onSlideChange={(swiper) => console.log(swiper)}
        loop
      >
        <SwiperSlide className="min-h-[calc(100vh-60px)] bg-orange-300">
          Slide 1
        </SwiperSlide>
        <SwiperSlide className="min-h-[calc(100vh-60px)] bg-orange-300">
          Slide 2
        </SwiperSlide>
        <SwiperSlide className="min-h-[calc(100vh-60px)] bg-orange-300">
          Slide 3
        </SwiperSlide>
        <SwiperSlide className="min-h-[calc(100vh-60px)] bg-orange-300">
          Slide 4
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
