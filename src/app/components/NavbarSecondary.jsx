import React from "react";
import Link from "next/link";
import { IoBagCheckOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function NavbarSecondary({setIsSidebarOpen}) {
  const cartAmount = useSelector((state) => state.counter.items);
  const totalQuantity = cartAmount.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  return (
    <div className="h-25 flex justify-between items-center px-5 md:px-15 xl:px-25">
      <div className="flex gap-35 items-center">
        <Link href={"/"} className="text-2xl font-semibold">
          StyleNest
        </Link>
        <ul className="hidden md:flex gap-8">
          <li className="text-gray-500">Shop all</li>
          <li className="cursor-not-allowed">
            <Link href={"/"} className="text-gray-500">
              Latest arrivals
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex gap-4 items-center">
        <Link href={"/cart"} className="relative">
          <IoBagCheckOutline className="text-2xl" />
          <div
            className={`absolute -top-[5px] -right-[5px] text-white text-xs px-[5px] py-[2px] rounded-[10px] ${
              totalQuantity <= 0 ? "" : "bg-[#4539ca]"
            }`}
          >
            {totalQuantity <= 0 ? "" : totalQuantity > 9 ? "9+" : totalQuantity}
          </div>
        </Link>
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden cursor-pointer">
          <i className="bx  bx-menu text-2xl  mt-2.5"></i>
        </button>
      </div>
    </div>
  );
}
