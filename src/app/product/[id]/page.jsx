"use client";
// Links
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import "react-loading-skeleton/dist/skeleton.css";
// Components
import ImageThumbnails from "@/app/components/ImageThumbnail";
import Navbar from "@/app/components/Navbar";
import SkeletonBox from "@/app/components/SkeletonBox";
import SkeletonThumbnails from "@/app/components/SkeletonThumbnails";
import Skeleton from "react-loading-skeleton";
// Icons
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/app/redux/counterSlice";

export default function page() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [salePrice, setSalePrice] = useState([]);
  const [listPrice, setListPrice] = useState([]);
  const [productColor, setProductColor] = useState(null);
  const [productColors, setProductColors] = useState(
    product?.images[active].image_url
  );
  const [isColorSelected, setIsColorSelected] = useState(false);

  const imagesByColor = product?.images.reduce((acc, img) => {
    if (!acc[img.color]) acc[img.color] = [];
    acc[img.color].push(img.image_url); // whole object
    return acc;
  }, {});

  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (count > 0) {
      dispatch(
        addToCart({
          id: product.product_id,
          name: product.name,
          quantity: count,
          price: parseInt(salePrice.join("")),
          image: productColors || product?.images[0].image_url,
          color: productColor,
        })
      );
    }
  };
  const cartAmount = useSelector((state) => state.counter.items);
  function productExistsOnCart() {
    return cartAmount.find((item) => item.id === id);
  }
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${id}`
      );
      const data = await res.json();
      setProduct(data);
      setSalePrice(data.inventory.slice(0, 1).map((pri) => pri.sale_price));
      setListPrice(data.inventory.slice(0, 1).map((pri) => pri.list_price));
      setIsLoading(false);
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.colors?.length && productColor === null) {
      setProductColor(product.colors[0]);
    }
  }, [product, productColors]);

  const handleColorPicker = (color) => {
    setProductColor(color);
    setIsColorSelected(true);
    setProductColors(imagesByColor[color][0]);
  };
  return (
    <>
      <Navbar />
      <div className="max-w-360 mx-auto w-full">
        <div className="flex flex-col md:flex-row mt-8 px-5 sm:px-12 2xl:px-0">
          <div className="w-full md:w-[40%]">
            {isLoading ? (
              <>
                <SkeletonBox width={"100%"} height={500} />
                <div className="flex gap-2 mt-5">
                  <SkeletonThumbnails thumbnails={5} />
                </div>
              </>
            ) : (
              <>
                <figure className="w-full h-130 bg-gray-100 rounded-sm">
                  <Image
                    width={500}
                    height={500}
                    src={
                      isColorSelected
                        ? productColors
                        : product?.images[active].image_url
                    }
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-contain"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </figure>

                <ImageThumbnails
                  active={active}
                  setActive={setActive}
                  setIsColorSelected={setIsColorSelected}
                  images={product?.images}
                />
              </>
            )}
          </div>

          <div className="w-full md:w-[50%] md:pl-10 lg:pl-24 py-14">
            <div className="text-2xl sm:text-4xl font-semibold">
              {product?.name || <Skeleton />}
            </div>
            <div className="sm:text-lg text-gray-400 mt-8">
              {product?.description || <Skeleton count={4} />}
            </div>
            {isLoading ? (
              <>
                <SkeletonBox width={"20%"} height={"1.3rem"} marginTop={15} />
                <div className="text-gray-500 uppercase my-3">Color</div>
                <div className="flex gap-2">
                  <Skeleton borderRadius={20} width={18} height={18} />
                  <Skeleton borderRadius={20} width={18} height={18} />
                </div>
              </>
            ) : (
              <>
                <div className="flex mt-5 gap-2 items-center">
                  {salePrice.join("") === listPrice.join("") ? (
                    <div className="text-gray-500 text-lg">${salePrice}</div>
                  ) : (
                    <>
                      <div className="text-gray-500">${salePrice}</div>
                      <div className="text-gray-500 text-xs line-through">
                        ${listPrice}
                      </div>
                    </>
                  )}
                </div>
                <div className="text-gray-500 uppercase my-3">Color</div>
                <div className="flex gap-2 mb-8">
                  {product?.colors.map((color) => (
                    <div
                      key={color}
                      className={`${
                        productColor === color ? "border-2 border-gray-600" : ""
                      } rounded-full h-6 w-6 flex items-center justify-center`}
                    >
                      <button
                        onClick={() => handleColorPicker(color)}
                        className={`h-4 w-4 rounded-full cursor-pointer ${
                          color === "white" ? "border-gray-500 border" : ""
                        }`}
                        style={{ backgroundColor: color }}
                      ></button>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                  {productExistsOnCart() ? (
                    <Link
                      href={"/cart"}
                      className="flex gap-4 justify-center items-center border-3 py-5 lg:px-10 xl:px-23 rounded-[10px] cursor-pointer active:translate-y-px"
                    >
                      <IoCartOutline className="text-xl" />
                      <div>Go to cart</div>
                    </Link>
                  ) : (
                    <>
                      <div className="flex w-full lg:w-[150px] items-center justify-between  border border-gray-700 py-5 px-3 ">
                        <button
                          onClick={() => setCount(count - 1)}
                          disabled={count <= 1}
                          className="cursor-pointer"
                        >
                          <FaMinus />
                        </button>
                        <span className="font-semibold">{count}</span>
                        <FaPlus
                          onClick={() => setCount(count + 1)}
                          className="text-sm cursor-pointer"
                        />
                      </div>
                      <button
                        onClick={handleAddToCart}
                        className="flex gap-4 justify-center items-center border-3 py-5 lg:px-10 xl:px-23 rounded-[10px] cursor-pointer translate-y-px"
                      >
                        <IoCartOutline className="text-xl" />
                        <div>Add to cart</div>
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
