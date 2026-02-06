import React, { useState } from "react";
import Image from "next/image";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/app/redux/counterSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function CartItem({ product }) {
  const dispatch = useDispatch();
  return (

      <div className="flex flex-col xl:flex-row gap-4 md:gap-8 border-b border-gray-200 py-6">
        <figure className="h-100 sm:h-50 sm:w-[45%] xl:w-100">
          <Link href={`/product/${product.productId}`}>
           <Image
              src={product.image}
              width={500}
              height={500}
              alt=""
              className="w-full h-full object-cover rounded-sm"
            />
          </Link>
        </figure>
        <div className="w-full">
          <Link href={`/product/${product.productId}`} className="mb-3 text-xl font-medium">{product.name}</Link>
          <div className="mb-3 text-gray-600">
            <span className="capitalize">{product.color}</span>
            {product.size && (
              <span className="uppercase"> &bull; {product.size}</span>
            )}
          </div>
          <div className="mb-2 hidden sm:block text-gray-600">
            {product.description}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex w-[120px] 2xl:w-[150px] items-center justify-between rounded-sm bg-gray-50 border border-gray-200 py-2 px-3 select-none">
                <button
                   onClick={() => dispatch(decreaseQuantity(product.id))}
                  className="cursor-pointer text-black/70"
                >
                  <FaMinus className="text-xs" />
                </button>
                <span className="font-semibold">{product.quantity}</span>
                <FaPlus
                   onClick={() => dispatch(increaseQuantity(product.id))}
                  className="text-xs cursor-pointer text-black/70"
                />
              </div>
              <button onClick={() => dispatch(removeFromCart(product.id))} className="text-gray-500 cursor-pointer">Remove</button>
            </div>
            <div className="font-semibold">${product.price}</div>
          </div>
        </div>
      </div>
  );
}
