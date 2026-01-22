import React from "react";
import ProductColorSelect from "../ProductColorSelect";
import SkeletonBox from "../SkeletonBox";

export default function ProductColors({
  product,
  handleColorPicker,
  productColor,
  isLoading,
}) {
  return (
    <>
      <div className="text-gray-500 mb-6">Avaliable Colors</div>
      <div className="flex gap-8 mb-8 pl-2">
        {isLoading ? (
          <>
            {[1, 2].map((_, id) => (
              <SkeletonBox
                key={id}
                borderRadius={"100%"}
                height={40}
                width={40}
              />
            ))}
          </>
        ) : (
          <>
            {product?.colors.map((color) => (
              <ProductColorSelect
                color={color}
                handleColorPicker={handleColorPicker}
                productColor={productColor}
                key={color}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}
