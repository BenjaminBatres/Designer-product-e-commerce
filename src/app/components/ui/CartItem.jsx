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

    // <div className="flex mt-8">
    //   <div className="flex gap-4 flex-1/2">
    //     <figure className="p-1.5 w-25 h-25 sm:w-30 sm:h-33 bg-gray-100 rounded-sm">
    //       <Link href={`/product/${product.id}`}>
    //         <Image
    //           src={product.image}
    //           width={500}
    //           height={500}
    //           alt=""
    //           className="w-full h-full object-cover"
    //         />
    //       </Link>
    //     </figure>

    //     <ul className="space-y-1">
    //       <li className="font-semibold">
    //         <Link href={`/product/${product.id}`}>{product.name}</Link>
    //       </li>
    //       <li className="font-semibold capitalize">{product.color}</li>
    //       <li className="md:hidden">${product.price * product.quantity}</li>
    //     </ul>
    //   </div>
    //   <div className="md:flex-1/2">
    //     <div className="flex flex-col-reverse md:flex-row items-end md:items-center gap-9 md:gap-6">
    //       <div className="flex gap-3">
    //         <button
    //           onClick={() => dispatch(decreaseQuantity(product.id))}
    //           className="border border-gray-300 h-6 w-6 md:h-7 md:w-7 flex items-center justify-center cursor-pointer"
    //         >
    //           <i className="bx  bx-minus text-sm"></i>
    //         </button>
    //         <div className="md:text-lg">{product.quantity}</div>
    //         <button
    //           onClick={() => dispatch(increaseQuantity(product.id))}
    //           className="border border-gray-300 h-6 w-6 md:h-7 md:w-7 flex items-center justify-center cursor-pointer"
    //         >
    //           <i className="bx  bx-plus text-sm"></i>
    //         </button>
    //       </div>
    //       <i
    //         onClick={() => dispatch(removeFromCart(product.id))}
    //         className="bx  bx-trash text-lg text-gray-400 cursor-pointer"
    //       ></i>
    //     </div>
    //   </div>

    //   <div className="hidden md:block font-semibold text-lg">
    //     ${product.price * product.quantity}
    //   </div>
    // </div>
  );
}
