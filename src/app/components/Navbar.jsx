import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cartAmount = useSelector((state) => state.counter.items);
  const totalQuantity = cartAmount.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="max-w-360 mx-auto w-full h-25 sm:h-32 flex items-center justify-between border-b border-b-gray-200 px-5  2xl:px-0">
      <Link
        href={"/"}
        className="text-xl sm:text-3xl md:text-5xl font-semibold"
      >
        StyleNest
      </Link>
      <div className="sm:flex gap-4 text-2xl hidden">
        <CiSearch className="cursor-not-allowed" />
        <CiUser className="cursor-not-allowed" />
        <Link href={"/cart"} className="relative">
          <IoBagCheckOutline  />
          <div
            className={`absolute -top-[5px] -right-[5px] text-white text-xs px-[5px] py-[2px] rounded-[10px] ${
              totalQuantity <= 0 ? "" : "bg-black"
            }`}
          >
            {totalQuantity <= 0 ? "" : totalQuantity > 9 ? "9+" : totalQuantity}
          </div>
        </Link>
      </div>
      <Link href={"/cart"} className="relative sm:hidden">
          <IoBagCheckOutline className="text-2xl" />
          <div
            className={`absolute -top-[5px] -right-[5px] text-white text-xs px-[5px] py-[2px] rounded-[10px] ${
              totalQuantity <= 0 ? "" : "bg-black"
            }`}
          >
            {totalQuantity <= 0 ? "" : totalQuantity > 9 ? "9+" : totalQuantity}
          </div>
        </Link>
      

    </div>
  );
}
