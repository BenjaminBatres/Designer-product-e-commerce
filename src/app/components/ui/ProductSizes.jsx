import React from "react";
import SkeletonBox from "../SkeletonBox";

export default function ProductSizes({
  product,
  handleSize,
  activeSize,
  isLoading,
}) {
  return (
    <>
      <div className="text-gray-500 mb-4">Avaliable Sizes</div>
      <div className="flex gap-4 mb-7 flex-wrap">
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5].map((_, id) => (
              <SkeletonBox height={55} width={70} borderRadius={4} key={id} />
            ))}
          </>
        ) : (
          <>
            {product?.sizes.map((sizes, id) => (
              <button
                key={id}
                onClick={() => handleSize(sizes, id)}
                className={`${activeSize === id ? "border-[#4539ca]" : "border-gray-200"} border-[1.5px] rounded-sm px-5 py-3 text-xl uppercase cursor-pointer`}
              >
                {sizes}
              </button>
            ))}
          </>
        )}
      </div>
    </>
  );
}
