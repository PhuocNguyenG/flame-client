"use client";
import React, { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { Swiper as typeSwiper } from "swiper/types";
export const CarouselDetailItem = ({
  data,
  alt,
}: {
  data: string[];
  alt: string;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<typeSwiper>();

  return (
    <>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          } as CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={data.length > 1 ? true : false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className=" h-[500px] [&_.swiper-button-prev:after]:bg-white/80 [&_.swiper-button-prev:after]:p-1 [&_.swiper-button-prev:after]:rounded-md [&_.swiper-button-next:after]:bg-white/80 [&_.swiper-button-next:after]:p-1 [&_.swiper-button-next:after]:rounded-md"
      >
        {data?.map((item, idx) => {
          return (
            <SwiperSlide className="w-fit h-full rounded-sm" key={idx}>
              <Image
                src={item}
                alt={alt}
                className="m-auto object-contain w-fit h-full rounded-sm"
                priority
                height={500}
                width={500}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={(value) => setThumbsSwiper(value)}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="max-w-[500px] mt-[10px] [&_.swiper-slide-thumb-active]:opacity-100 [&_.swiper-slide-thumb-active]:border [&_.swiper-slide-thumb-active]:transition-opacity"
      >
        {data.map((item, idx) => {
          return (
            <SwiperSlide
              className="!flex p-1 !h-[unset] opacity-30 border-primary rounded-sm"
              key={idx}
            >
              <Image
                src={item}
                className="m-auto rounded-sm w-[80px] h-auto min-h-[80px] max-h-[80px] object-cover"
                alt={alt}
                height={80}
                width={80}
                quality={30}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
