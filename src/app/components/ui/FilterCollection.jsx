import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function FilterCollection({
  title,
  options,
  activeOption,
  handleActiveSelection,
  setIsCollapsed,
  isCollapsed,
  idx,
}) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-gray-400 overflow-hidden">
      {idx ? (
        <div
          style={{ marginBottom: isCollapsed === idx && "16px" }}
          className={`flex items-center justify-between transition-all duration-300`}
          onClick={() => setIsCollapsed(idx)}
        >
          <div className="font-semibold text-lg">{title}</div>
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
          <div className="font-semibold text-lg">{title}</div>
          {isOpen ? (
            <FaPlus className="cursor-pointer" />
          ) : (
            <FaMinus className="cursor-pointer" />
          )}
        </div>
      )}
      <ul
        className="space-y-3 mb-6 overflow-hidden transition-height duration-300"
        style={{ height: (idx ? idx === isCollapsed : isOpen) ? 100 : 0 }}
      >
        {options.map((options, id) => (
          <li key={id}>
            <div
              className="space-x-3 cursor-pointer"
              onClick={() => handleActiveSelection(id, options)}
            >
              <input
                type="checkbox"
                name=""
                id={id}
                readOnly
                className="accent-[#4539ca]"
                checked={activeOption === id}
              />
              <span className="text-black/70">{options}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
