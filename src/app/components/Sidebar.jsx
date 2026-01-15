import React from "react";
import { useSelector } from "react-redux";
import SidebarCartItems from "./ui/SidebarCartItems";

export default function Sidebar({ isOpen, setIsOpen }) {
  const cartAmount = useSelector((state) => state.counter.items);
  return (
    <div className={`fixed inset-0 ${isOpen ? "bg-black/50 z-10" : "-z-10"}`}>
      <div
        className={`float-right w-115 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b-2 border-gray-200 h-20 px-4">
          <div className="text-3xl font-semibold">Cart</div>
          <i
            onClick={() => setIsOpen(false)}
            className="bx p-2 bx-x text-3xl mt-1.5 cursor-pointer"
          ></i>
        </div>

        <div className="p-4 space-y-8">
          {cartAmount?.map((product) => (
            <SidebarCartItems
              product={product}
              key={product.id}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
        {/* <div>Ch</div> */}
      </div>
    </div>
  );
}
