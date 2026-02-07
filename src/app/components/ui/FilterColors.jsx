import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function FilterColors({
  products,
  handleColorSelection,
  colorActiveOption,
  height,
  setIsCollapsed,
  isCollapsed,
  idx,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const allProductColors = products.flatMap((product) => product.colors);
  const sortedProductColors = [];
  for (const colors of allProductColors) {
    if (!sortedProductColors.includes(colors)) {
      sortedProductColors.push(colors);
    }
  }

  return (
    <div className="border-b border-gray-400 overflow-hidden">
      {idx ? (
        <div
          style={{ marginBottom: isCollapsed === idx && "16px" }}
          className={`flex items-center justify-between transition-all duration-300`}
          onClick={() => setIsCollapsed(idx)}
        >
          <div className="font-semibold text-lg">Colors</div>
          {idx === isCollapsed ? (
            <FaPlus className="cursor-pointer" />
          ) : (
            <FaMinus className="cursor-pointer" />
          )}
        </div>
      ) : (
        <div
          style={{ marginBottom: isOpen && "16px" }}
          className={`flex items-center justify-between transition-all duration-300`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="font-semibold text-lg">Colors</div>
          {isOpen ? (
            <FaPlus className="cursor-pointer" />
          ) : (
            <FaMinus className="cursor-pointer" />
          )}
        </div>
      )}
      <ul
        className="flex flex-wrap xmd:max-w-60 gap-4 mb-6 overflow-hidden transition-height duration-300"
        style={{ height: (idx ? idx === isCollapsed : isOpen) ? height : 0 }}
      >
        {sortedProductColors.map((colors, id) => (
          <li
            key={id}
            className={`${colorActiveOption === id ? "border-2 border-gray-600" : ""}
            rounded-full h-6 w-6 flex items-center justify-center`}
          >
            <button
              onClick={() => handleColorSelection(id, colors)}
              className={`h-4 w-4 rounded-full ${colors === "white" && "border border-gray-300"}`}
              style={{ backgroundColor: colors }}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
