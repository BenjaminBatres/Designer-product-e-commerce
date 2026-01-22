import React from "react";
import { RiCouponLine } from "react-icons/ri";

export default function OrderSummary({ notify, total }) {
  return (
    <div className="lg:w-[30%]">
      <div className="p-5 border border-gray-200 rounded-sm">
        <div className="text-2xl font-semibold mb-6">Order Summary</div>
        <div className="flex justify-between mb-4">
          <div>Subtotal</div>
          <div className="font-semibold">${total()}</div>
        </div>
        <div className="flex justify-between mb-4">
          <div>Shipping</div>
          <div className="font-semibold">FREE</div>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex items-center gap-2 text-[#4539ca] cursor-not-allowed hover:underline">
            <RiCouponLine className="text-lg" />
            <span className="font-medium">Add coupon code</span>
          </div>
        </div>
        <div className="h-px my-8 bg-gray-200"></div>
        <div className="flex justify-between mb-6">
          <div className="text-2xl">Total</div>
          <div className="text-3xl font-medium">${total()}</div>
        </div>
        <button
          className="bg-[#4539ca] w-full text-white py-3.5 font-semibold active:translate-y-px cursor-pointer"
          onClick={() => notify()}
        >
          Check out
        </button>
      </div>
    </div>
  );
}
