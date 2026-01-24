import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SidebarCartItems from "./ui/SidebarCartItems";
import Link from "next/link";
import { GiShoppingCart } from "react-icons/gi";

export default function Sidebar({ isOpen, setIsOpen }) {
  const cartAmount = useSelector((state) => state.counter.items);
  const total = () => {
    let itemPrice = 0;
    cartAmount.forEach((item) => {
      itemPrice += +(item.price * item.quantity).toFixed(2);
    });
    return itemPrice;
  };

  // Click outside pattern
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
    <div className={`fixed inset-0 ${isOpen ? "bg-black/50 z-10" : "-z-10"}`}>
      <div
        ref={ref}
        className={`float-right w-[85%] sm:w-115 h-full bg-white shadow-lg transform transition-transform duration-300 ${
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

        <div className={`p-4 space-y-8 overflow-y-auto ${cartAmount.length > 4 ? "h-105 sm:h-170" : 'h-auto'}`}>
          {cartAmount?.map((product) => (
            <SidebarCartItems
              product={product}
              key={product.id}
              setIsOpen={setIsOpen}
            />
          ))}
        </div>
        {cartAmount.length === 0 ? (
          <div className="flex flex-col gap-3 items-center justify-center px-4  ">
            <GiShoppingCart className="text-7xl md:text-9xl" />
            <div className="text-md md:text-lg">
              Your shopping cart is empty
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-[#4539ca] text-white w-full text-md md:text-lg py-3 rounded-sm text-center active:translate-y-px cursor-pointer"
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="px-4 py-2">
            <div className="bg-gray-100 p-2">
              <ul className="flex justify-between mb-4">
                <li>Total: </li>
                <li>${total()}</li>
              </ul>
              <Link
                href={"/cart"}
                className="bg-[#4539ca] text-white py-3 block text-center w-full font-semibold active:translate-y-px"
              >
                Check Out
              </Link>
              <div className="text-center text-sm text-gray-500 mt-2">
                Taxes calculated at checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
