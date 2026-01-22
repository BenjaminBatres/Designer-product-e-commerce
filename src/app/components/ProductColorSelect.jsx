import React from "react";
import { IoCheckmark } from "react-icons/io5";

export default function ProductColorSelect({
  productColor,
  color,
  handleColorPicker,
}) {
  return (
    <div
      key={color}
      className={`${
        productColor === color ? "border border-gray-600" : ""
      } rounded-full h-10 w-10 flex items-center justify-center`}
    >
      <button
        onClick={() => handleColorPicker(color)}
        className={`h-9 w-9 rounded-full cursor-pointer flex justify-center items-center ${
          color === "white" ? "border-gray-500 border" : ""
        }`}
        style={{ backgroundColor: color }}
      >
        {productColor === color && (
          <IoCheckmark className={`${color === "white" ? "text-black" : "text-white"} text-3xl`} />
        )}
      </button>
    </div>
  );
}
