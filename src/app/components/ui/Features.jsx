import React from "react";
import { FiMinusCircle } from "react-icons/fi";

export default function Features({ productInfo, id }) {
  return (
    <>
      {productInfo.product_id === id && (
        <div className="border-b last:border-0 border-gray-300 pb-8">
          <div className="flex justify-between mt-5 mb-2">
            <div className="font-semibold text-lg">{productInfo.title}</div>
            <FiMinusCircle className="text-gray-500 text-xl" />
          </div>
          <div className="pl-6">
            {productInfo.description.map((description, id) => (
              <li key={id} className="list-disc text-gray-600 text-sm">
                {description}
              </li>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
