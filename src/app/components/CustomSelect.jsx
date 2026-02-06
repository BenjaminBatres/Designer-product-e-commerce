import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function CustomSelect({
  options = [],
  select,
  handleSelect,
  setOpen,
  open,
}) {
  const selectRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className={`relative mb-3 w-40`} ref={selectRef}>
      <div
        className="border border-gray-200 shadow-sm rounded-sm py-2.5 px-3 flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold">{select}</span>
        <IoIosArrowDown />
      </div>
      {open && (
        <div className="absolute top-full left-0 bg-white border border-gray-300 rounded-sm w-full z-10">
          {options.map((option, id) => (
            <div
              key={id}
              className="py-2.5 px-3 cursor-pointer transition-all duration-200 font-futura-medium hover:bg-[#4539ca]"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
