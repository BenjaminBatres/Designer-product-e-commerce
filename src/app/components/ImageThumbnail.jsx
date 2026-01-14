import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

export default function ImageThumbnails({
  setActive,
  images,
  active,
  setIsColorSelected,
}) {
  const imagesLength = images?.length;
  return (
    <div className="flex mt-4">
      <Swiper
        slidesPerView={Math.min(imagesLength, 4)}
        spaceBetween={10}
        navigation
        modules={[Navigation]}
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index} className="!w-20 !h-20">
            <button
              onClick={() => {
                setActive(index);
                setIsColorSelected(false);
              }}
              className={`w-20 h-20 border rounded-md p-1 transition ${
                active === index
                  ? "border-black ring-2 ring-black/30"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={img.image_url}
                alt={img.color ?? "product image"}
                width={80}
                height={80}
                placeholder="empty"
                loading="lazy"
                className="w-full h-full object-cover rounded"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
