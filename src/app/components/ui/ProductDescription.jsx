import React from "react";
import Rating from "./Rating";
import SkeletonBox from "../SkeletonBox";

export default function ProductDescription({
  product,
  listPrice,
  salePrice,
  discountPercentage,
  isLoading,
}) {
  return (
    <>
      {isLoading ? (
        <>
          <SkeletonBox marginBottom={20} height={48} width={"55%"} />
          <SkeletonBox height={28} width={"20%"} marginBottom={4} />
          <SkeletonBox height={24} width={"15%"} marginBottom={8} />
          <SkeletonBox height={24} width={"40%"} marginBottom={15} />
          <SkeletonBox height={50} marginBottom={15} />
        </>
      ) : (
        <>
          <div className="text-4xl sm:text-5xl font-semibold mb-5">
            {product?.name}
          </div>
          <div className="flex items-end gap-2 mb-2">
            <div className="text-3xl">${salePrice}</div>
            {listPrice.join("") !== salePrice.join("") && (
            <div className="text-lg line-through text-gray-500">
              ${listPrice}
            </div>
            )} 
          </div>
          {discountPercentage[0] && (
            <div className="bg-[#fefbec] border border-[#fcefbe] w-20 uppercase text-[#cd9969] rounded-full flex justify-center mb-2">
              {discountPercentage[0]}% off
            </div>
          )}
          <div className="flex items-center gap-2 mb-5">
            <div className="text-lg">{product?.rating.toFixed(1)}</div>
            <Rating rating={product?.rating || 0} />
            <div className="cursor-not-allowed text-[#4539ca] hover:underline">
              See all {product?.reviews} reviews
            </div>
          </div>
          <div className="text-gray-500 mb-6">{product?.description}</div>
        </>
      )}
    </>
  );
}
