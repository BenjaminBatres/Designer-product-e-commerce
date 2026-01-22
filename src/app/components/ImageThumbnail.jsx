import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

export default function ImageThumbnails({ setActive, images, active }) {
  return (
    <div className="mt-4">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: images?.length > 3 ? 2.3 : 2,
          },
          768: {
            slidesPerView: images?.length > 3 ? 3.3 : 2,
          },
        }}
        spaceBetween={3}
        navigation
        modules={[Navigation]}
        className="select-none"
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}>
            {images?.length > 1 && (
              <button
                onClick={() => setActive(index)}
                className={`
              h-50 w-full rounded-xl border-4 cursor-pointer
              transition-all duration-300 ease-out
              ${
                active === index
                  ? "border-[#4539ca]"
                  : "border-transparent hover:border-[#4539ca]"
              }
            `}
              >
                <Image
                  src={img.image_url}
                  alt={img.color ?? "product image"}
                  width={210}
                  height={210}
                  placeholder="empty"
                  loading="lazy"
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
