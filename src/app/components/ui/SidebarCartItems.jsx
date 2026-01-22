import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/app/redux/counterSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
export default function SidebarCartItems({ product, setIsOpen }) {
  const dispatch = useDispatch();
  const cartAmount = useSelector((state) => state.counter.items);
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    if (cartAmount.length === 1) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <figure className="p-1.5 w-25 h-25 sm:w-30 sm:h-33 bg-gray-100 rounded-sm">
          <Link href={`/product/${product.productId}`}>
            <Image
              src={product.image}
              width={500}
              height={500}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
        </figure>
        <ul className="px-4">
          <li className="font-semibold text-sm sm:text-base">
            <Link href={`/product/${product.productId}`}>{product.name}</Link>
          </li>
          <li className="font-semibold text-sm sm:text-base">
            <span className="capitalize">{product.color}</span>
            {product.size && (
              <span className="uppercase"> / {product.size}</span>
            )}
          </li>
          <li className="flex gap-3 my-2">
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
          </li>
          <li>${product.price * product.quantity}</li>
        </ul>
      </div>
      <div>
        <i
          onClick={handleRemoveFromCart}
          className="bx  bx-trash text-lg text-gray-400 cursor-pointer mt-1"
        ></i>
      </div>
    </div>
  );
}
