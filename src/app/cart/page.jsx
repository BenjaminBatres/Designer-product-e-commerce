"use client";
import React, { useState } from "react";
// Links
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
// components
import Navbar from "../components/Navbar";
import Spinner from "../components/ui/Spinner";
import CartItem from "../components/ui/CartItem";
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
    }, 3000);
  };
  const total = () => {
    let itemPrice = 0;
    cartAmount.forEach((item) => {
      itemPrice += +(item.price * item.quantity).toFixed(2);
    });
    return itemPrice;
  };
  return (
    <>
      <Navbar />
      <ToastContainer theme="dark" autoClose={2900} />
      <div className="py-10 px-6 md:px-12">
        <div className="max-w-350 mx-auto w-full">
          <div className="flex gap-3 items-center mb-10">
            <Link href={"/"} className="text-gray-500">
              Home
            </Link>
            <PiGreaterThanLight className="text-sm" />
            <div className="font-semibold">Cart</div>
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
            <div className="hidden md:flex justify-between border-b border-gray-200 h-10">
              <div>Product</div>
              <div>Quantity</div>
              <div>Price</div>
            </div>
          )}

          {cartAmount.map((product) => (
            <CartItem product={product} key={product.id} />
          ))}
          {cartAmount.length > 0 && (
            <div className="bg-gray-100 mt-8 float-right w-full md:w-[45%] mb-6 p-3 rounded-sm space-y-4">
              <div className="flex justify-between">
                <div className="font-semibold">Subtotal:</div>
                <div>${(total() * 0.9).toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">Tax:</div>
                <div>${(total() * 0.1).toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div className="font-semibold">Total:</div>
                <div>${total()}</div>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-black w-full text-white py-3.5 font-semibold active:translate-y-px cursor-pointer"
                  onClick={() => notify()}
                >
                  Check out
                </button>
              </div>
            </div>
          )}
          {loading && <Spinner />}
        </div>
      </div>
    </>
  );
}
