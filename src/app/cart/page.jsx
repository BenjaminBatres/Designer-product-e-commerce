"use client";
import React, { useState } from "react";
// Links
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
// components
import Spinner from "../components/ui/Spinner";
import CartItem from "../components/ui/CartItem";
import OrderSummary from "../components/ui/OrderSummary";
// Icons
import { GiShoppingCart } from "react-icons/gi";
import { PiGreaterThanLight } from "react-icons/pi";
// Redux
import { useSelector } from "react-redux";

export default function page() {
  const cartAmount = useSelector((state) => state.counter.items);
  const [loading, setLoading] = useState(false);

  const notify = () => {
    toast("Order placed!");
    setLoading(!loading);
    setInterval(() => {
      window.location.reload();
    }, 2000);
  };
  const total = () => {
    let itemPrice = 0;
    cartAmount.forEach((item) => {
      itemPrice += +(item.price * item.quantity).toFixed(2);
    });
    return itemPrice;
  };
  return (
    <div className="bg-[#f2f4f5] p-3 sm:p-7 min-h-screen">
      <div className="bg-white min-h-screen rounded-lg shadow-md">
        <ToastContainer theme="dark" autoClose={1900} />
        <div className="py-20 px-4 md:px-10 2xl:p-20">
          <div className="max-w-400 mx-auto w-full">
            <div className="flex gap-3 items-center mb-10">
              <Link href={"/"} className="text-gray-500 text-xl">
                Home
              </Link>
              <PiGreaterThanLight className="text-sm mt-1" />
              <div className="font-semibold text-xl">Cart</div>
            </div>
            <div className="text-3xl sm:text-5xl font-semibold">
              Shopping Cart
            </div>
            {cartAmount.length === 0 ? (
              <div className="flex flex-col gap-3 items-center justify-center max-w-100 mx-auto w-full py-[8vw] ">
                <GiShoppingCart className="text-7xl md:text-9xl" />
                <div className="text-md md:text-lg">
                  Your shopping cart is empty
                </div>
                <Link
                  href={"/"}
                  className="bg-black text-white w-full text-md md:text-lg py-3 rounded-sm text-center active:translate-y-px"
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row mt-10 gap-8 2xl:gap-12">
                <div className="lg:w-[60%]">
                  {cartAmount.map((product) => (
                    <CartItem product={product} key={product.id} />
                  ))}
                </div>
                <OrderSummary notify={notify} total={total} />
              </div>
            )}

            {loading && <Spinner />}
          </div>
        </div>
      </div>
    </div>
  );
}
