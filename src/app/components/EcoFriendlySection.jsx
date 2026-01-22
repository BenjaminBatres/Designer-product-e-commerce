import Image from "next/image";
import React, { useRef, useState } from "react";
import EcoFriendlyChoices from "./ui/EcoFriendlyChoices";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TabImage from "../assets/premium_photo-1760179326362-5701d2f6a5d3.jpg";

export default function EcoFriendlySection() {
  const [activeTab, setActiveTab] = useState(0);
  const nextRef = useRef(null);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const tabLinks = [
    { link: "Sustainablity" },
    { link: "Comfort" },
    { link: "Durablity" },
    { link: "Versatility" },
  ];
  return (
    <>
      <div className="relative sm:hidden">
        <Swiper
          slidesPerView={2.2}
          modules={[Navigation]}
          onReachEnd={() => setShowRightArrow(false)}
          onFromEdge={() => setShowRightArrow(true)}
          className="mb-8 border-b border-gray-300 w-full"
          onBeforeInit={(swiper) => {
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            nextEl: nextRef.current,
          }}
        >
          {tabLinks.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="pb-3 relative">
                <button
                  onClick={() => setActiveTab(0)}
                  className={`font-medium px-2 ${activeTab === idx ? "text-[#4539ca]" : "text-gray-500 cursor-not-allowed hover:text-[#4539ca]"} `}
                >
                  {item.link}
                </button>
                {activeTab === idx && (
                  <span className="absolute bottom-0 left-0 h-0.5 bg-[#4539ca] w-full z-10"></span>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {showRightArrow && (
          <button
            ref={nextRef}
            className="cursor-pointer absolute right-0 top-0 z-11 h-full w-5 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-gray-200/90 to-transparent " />
          </button>
        )}
      </div>
      <div className="border-b border-gray-200 rounded-sm mb-8 hidden sm:block">
            <div className="flex gap-6 pb-2">
              <div className="relative">
                <div className="text-[#4539ca] font-medium px-2">
                  Sustainablity
                </div>
                <span className="absolute left-0 top-[30px] h-[2px] w-full rounded-sm bg-[#4539ca]"></span>
              </div>
              <div className="font-medium text-gray-500 cursor-not-allowed hover:text-[#4539ca] px-2">
                Comfort
              </div>
              <div className="font-medium text-gray-500 cursor-not-allowed hover:text-[#4539ca] px-2">
                Durablity
              </div>
              <div className="font-medium text-gray-500 cursor-not-allowed hover:text-[#4539ca] px-2">
                Versatility
              </div>
            </div>
          </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-[20%]">
          <figure className="h-120 lg:h-60">
            <Image
              src={TabImage}
              alt=""
              width={500}
              height={500}
              className="w-full h-full rounded-sm object-cover object-top "
            />
          </figure>
        </div>
        <div className="w-full">
          <div className="font-semibold text-3xl mb-2">Eco-Friendly Choice</div>
          <p className="text-gray-500 mb-6">
            With our sustainable approach, we curate clothing that makes a
            statement of care-care for the planet, and for the art of fashion
          </p>
          <EcoFriendlyChoices />
        </div>
      </div>
    </>
  );
}
