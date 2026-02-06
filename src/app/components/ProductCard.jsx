import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ item, id }) {
  const salePrice = item.inventory.slice(0, 1).map((pri) => pri.sale_price);
  const listPrice = item.inventory.slice(0, 1).map((pri) => pri.list_price);
  const imagesByColor = item.images.reduce((acc, img) => {
    if (!acc[img.color]) acc[img.color] = [];
    acc[img.color].push(img); // whole object
    return acc;
  }, {});
  const colors = Object.keys(imagesByColor);

  const [colorPicker, setColorPicker] = useState(colors[0]);
  const [imageUrl, setImageUrl] = useState(
    imagesByColor[colors[0]][0].image_url,
  );

  const handleColorPicker = (color, idx) => {
    setColorPicker(colors[idx]);
    setImageUrl(imagesByColor[color][0].image_url);
  };

  return (
    <>
      <Link href={`/product/${item.product_id}`} className="w-full h-87 block">
        <Image
          width={500}
          height={500}
          src={imageUrl}
          alt=""
          className="h-full w-full rounded-lg object-cover"
        />
      </Link>

      <div className="mt-3">
        <div className="text-sm capitalize text-gray-500">{colorPicker}</div>
        <Link
          href={`/product/${item.product_id}`}
          className="font-semibold text-lg"
        >
          {item.name}
        </Link>
        <div className="flex mt-2 gap-2 items-center">
          {salePrice.join("") === listPrice.join("") ? (
            <div className="text-gray-500">
              ${item.inventory.slice(0, 1).map((pri) => pri.sale_price)}
            </div>
          ) : (
            <>
              <div className="text-gray-500">
                ${item.inventory.slice(0, 1).map((pri) => pri.sale_price)}
              </div>
              <div className="text-gray-500 text-xs line-through">
                ${item.inventory.slice(0, 1).map((pri) => pri.list_price)}
              </div>
            </>
          )}
        </div>
        <div className="flex mt-3 gap-2">
          {colors.map((color, idx) => (
            <div
              key={color}
              className={`${
                colorPicker === color && colors.length > 1
                  ? "border-2 border-gray-600"
                  : ""
              } rounded-full h-6 w-6 flex items-center justify-center`}
            >
              <button
                onClick={() => handleColorPicker(color, idx)}
                className={`h-4 w-4 rounded-full ${
                  color === "white" ? "border-gray-500 border" : ""
                } ${colors.length > 1 ? "cursor-pointer" : ""}`}
                style={{ backgroundColor: color }}
              ></button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
