import Link from "next/link";
import React, { useEffect, useRef } from "react";

export default function SidebarSecondary({ isOpen, setIsOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className={`fixed inset-0 ${isOpen ? "bg-black/50 z-20" : "-z-20"}`}>
      <div
        ref={ref}
        className={`float-right w-70 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-20 flex justify-between items-center px-4 border-b border-gray-300">
          <div className="text-2xl font-semibold">StyleNest</div>
          <i
            onClick={() => setIsOpen(false)}
            className="bx p-2 bx-x text-3xl mt-1.5 cursor-pointer"
          ></i>
        </div>
        <div className="p-4">
            <div className="text-gray-500 text-xl cursor-not-allowed">Shop all</div>
            <Link href={'/'} className="text-gray-500 text-xl">Latest arrivals</Link>
        </div>
      </div>
    </div>
  );
}
