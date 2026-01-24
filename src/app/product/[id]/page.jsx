"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
// Components
import ImageThumbnails from "@/app/components/ImageThumbnail";
import NavbarSecondary from "@/app/components/NavbarSecondary";
import Spinner from "@/app/components/ui/Spinner";
import Features from "@/app/components/ui/Features";
import ProductDescription from "@/app/components/ui/ProductDescription";
import ProductSizes from "@/app/components/ui/ProductSizes";
import ProductColors from "@/app/components/ui/ProductColors";
import SectionInfo from "@/app/components/SectionInfo";
import CollectionSection from "@/app/components/CollectionSection";
import Footer from "@/app/components/Footer";
import EcoFriendlySection from "@/app/components/EcoFriendlySection";
import SkeletonBox from "@/app/components/SkeletonBox";
import SkeletonThumbnails from "@/app/components/SkeletonThumbnails";
import Sidebar from "@/app/components/Sidebar";
import SidebarSecondary from "@/app/components/SidebarSecondary";
//Icons
import { FaMinus, FaPlus } from "react-icons/fa";
// Swiper
import "swiper/css";
import "swiper/css/navigation";
// Data
import ProductInfo from "../../data/product-info.json";
// Redux
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/counterSlice";
import { nanoid } from "@reduxjs/toolkit";

export default function page() {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [salePrice, setSalePrice] = useState([]);
  const [listPrice, setListPrice] = useState([]);
  const [activeSize, setActiveSize] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState([]);
  const [productColor, setProductColor] = useState(null);
  const [productColors, setProductColors] = useState(
    product?.images[active].image_url,
  );
  const [shoeSizeId, setShoeSizeId] = useState([]);
  const imagesByColor = product?.images.reduce((acc, img) => {
    if (!acc[img.color]) acc[img.color] = [];
    acc[img.color].push(img.image_url); // whole object
    return acc;
  }, {});

  const uniqueImages = product?.images.filter(
    (img, index, self) =>
      index === self.findIndex((i) => i.image_url === img.image_url),
  );

  const dispatch = useDispatch();

  const handleSize = (size, id) => {
    setSelectedSize(size);
    setActiveSize(id);
  };

  const handleAddToCart = () => {
    setIsOpen(true);
    dispatch(
      addToCart({
        id: nanoid(),
        productId: product.product_id,
        name: product.name,
        quantity: count,
        price: parseInt(salePrice.join("")),
        image: productColors || product?.images[0].image_url,
        color: productColor,
        size: selectedSize,
        sizeId: shoeSizeId[activeSize],
        description: product.description,
      }),
    );
  };

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${id}`,
      );
      const data = await res.json();
      setProductColor(data.colors[0]);
      setProduct(data);
      setSalePrice(data.inventory.slice(0, 1).map((pri) => pri.sale_price));
      setListPrice(data.inventory.slice(0, 1).map((pri) => pri.list_price));
      setDiscountPercentage(
        data.inventory.map((discount) => discount.discount_percentage),
      );
      setIsLoading(false);
      setSelectedSize(data?.sizes[0]);
    }
    fetchProduct();
    setLoading(true);
  }, [active, id]);

  useEffect(() => {
    if (!product || !productColor) return;

    const sku = product.inventory
      .filter((item) => item.color === productColor)
      .map((item) => item.sku);

    setShoeSizeId(sku);
  }, [productColor, product]);

  const handleColorPicker = (color) => {
    setProductColor(color);
    setProductColors(imagesByColor[color][0]);
  };
  return (
    <div className="bg-[#f3f5f7] min-h-screen p-3">
      <NavbarSecondary setIsSidebarOpen={setIsSidebarOpen} />
      <SidebarSecondary isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="min-h-screen bg-white rounded-lg shadow-2xl/20 sm:shadow-2xl/40">
        <div className="px-4 py-15 lg:p-15 xl:p-25">
          <div className="flex flex-col lg:flex-row mb-30 gap-8">
            <div className="lg:w-[50%] xl:w-[40%] lg:min-h-130">
              {isLoading ? (
                <>
                  <SkeletonBox width={"100%"} height={800} borderRadius={8} />
                  <div className="flex gap-2 mt-5">
                    <SkeletonThumbnails thumbnails={3} />
                  </div>
                </>
              ) : (
                <>
                  <figure className="w-full relative">
                    {loading && <Spinner />}
                    <Image
                      width={500}
                      height={500}
                      src={uniqueImages[active].image_url}
                      alt=""
                      onLoad={() => setLoading(false)}
                      loading="eager"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </figure>
                  <ImageThumbnails
                    images={uniqueImages}
                    setActive={setActive}
                    active={active}
                  />
                </>
              )}
            </div>
            <div className="lg:w-[50%] lg:pl-8">
              <ProductDescription
                isLoading={isLoading}
                product={product}
                salePrice={salePrice}
                listPrice={listPrice}
                discountPercentage={discountPercentage}
              />
              <ProductColors
                isLoading={isLoading}
                product={product}
                handleColorPicker={handleColorPicker}
                productColor={productColor}
              />
              {product?.sizes.length > 0 && (
                <ProductSizes
                  isLoading={isLoading}
                  product={product}
                  activeSize={activeSize}
                  handleSize={handleSize}
                />
              )}
              <div className="text-gray-500 mb-4">Quantity</div>
              {isLoading ? (
                <>
                  <div className="skeleton-box w-full lg:w-[150px] h-10 mb-8"></div>
                  <SkeletonBox height={60} marginBottom={40} />
                </>
              ) : (
                <>
                  <div className="flex w-full lg:w-[150px] items-center justify-between rounded-sm bg-gray-50 border border-gray-200 py-2 px-3 select-none mb-8">
                    <button
                      onClick={() => setCount(count - 1)}
                      disabled={count <= 1}
                      className="cursor-pointer text-black/70"
                    >
                      <FaMinus />
                    </button>
                    <span className="font-semibold">{count}</span>
                    <FaPlus
                      onClick={() => setCount(count + 1)}
                      className="text-sm cursor-pointer text-black/70"
                    />
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex justify-center py-5 lg:px-10 xl:px-23 rounded-[10px] w-full cursor-pointer active:translate-y-px bg-[#4539ca] mb-10"
                  >
                    <div className="text-white">Add to Cart</div>
                  </button>
                </>
              )}
              {ProductInfo.map((item, idx) => (
                <Features productInfo={item} id={id} key={idx} />
              ))}
            </div>
          </div>
          <SectionInfo />
          <EcoFriendlySection />
        </div>
        <CollectionSection product={product} id={id} isLoading={isLoading} />

        <Footer />
      </div>
    </div>
  );
}
