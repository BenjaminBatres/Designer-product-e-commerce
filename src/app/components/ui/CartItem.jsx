import React from "react";
import Image from "next/image";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/app/redux/counterSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function CartItem({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="flex mt-8">
      <div className="flex gap-4 flex-1/2">
        <figure className="p-1.5 w-30 h-33 bg-gray-100 rounded-sm">
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.image}
              width={500}
              height={500}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
        </figure>

        <ul className="space-y-1">
          <li className="font-semibold">
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </li>
          <li className="font-semibold capitalize">{product.color}</li>
          <li className="md:hidden">${product.price * product.quantity}</li>
        </ul>
      </div>
      <div className="md:flex-1/2">
        <div className="flex flex-col-reverse md:flex-row items-end md:items-center gap-9 md:gap-6">
          <div className="flex gap-3">
            <button
              onClick={() => dispatch(decreaseQuantity(product.id))}
              className="border border-gray-300 h-6 w-6 md:h-7 md:w-7 flex items-center justify-center cursor-pointer"
            >
              <i className="bx  bx-minus text-sm"></i>
            </button>
            <div className="md:text-lg">{product.quantity}</div>
            <button
              onClick={() => dispatch(increaseQuantity(product.id))}
              className="border border-gray-300 h-6 w-6 md:h-7 md:w-7 flex items-center justify-center cursor-pointer"
            >
              <i className="bx  bx-plus text-sm"></i>
            </button>
          </div>
          <i
            onClick={() => dispatch(removeFromCart(product.id))}
            className="bx  bx-trash text-lg text-gray-400 cursor-pointer"
          ></i>
        </div>
      </div>

      <div className="hidden md:block font-semibold text-lg">
        ${product.price * product.quantity}
      </div>
    </div>
  );
}
