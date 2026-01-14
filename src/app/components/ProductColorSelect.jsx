import React from "react";

export default function ProductColorSelect({ color, handleColorPicker }) {
  return (
    <div
      key={color}
      className={`${
        productColor === color ? "border-2 border-gray-600" : ""
      } rounded-full h-6 w-6 flex items-center justify-center`}
    >
      <button
        onClick={() => handleColorPicker(color, idx)}
        className={`h-4 w-4 rounded-full cursor-pointer ${
          color === "white" ? "border-gray-500 border" : ""
        }`}
        style={{ backgroundColor: color }}
      ></button>
    </div>
  );
}
