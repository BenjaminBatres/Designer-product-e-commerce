import React from "react";
import { LuRecycle } from "react-icons/lu";
import { RiPaintLine } from "react-icons/ri";
import { TbPlant } from "react-icons/tb";
import { RiWaterFlashLine } from "react-icons/ri";
export default function EcoFriendlyChoices() {
  const choices = [
    { icon: <LuRecycle />, title: "Recycled Materials" },
    { icon: <RiPaintLine />, title: "Low Impact Dye" },
    { icon: <TbPlant />, title: "Carbon Neutral" },
    { icon: <RiWaterFlashLine />, title: "Water Conservation" },
  ];
  return (
    <div className="flex flex-col sm:flex-row flex-wrap lg:max-w-150">
      {choices.map((item, id) => (
        <div key={id} className="sm:w-[50%] mb-6">
          <div className="flex items-center gap-2">
            <div className="h-11 w-11 rounded-full shadow-md/7 border-b border-gray-200  flex justify-center items-center">
              <span className="text-xl text-[#4539ca]">{item.icon}</span>
            </div>
            <div className="text-gray-500">{item.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
