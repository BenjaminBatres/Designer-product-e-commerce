"use client";

// links
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// Components
import ProductCard from "./components/ProductCard";
import SkeletonProductCard from "./components/SkeletonProductCard";
import Navbar from "./components/Navbar";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const notify = () => toast.info("More coming soon!");

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products`
      );
      const { data } = await res.json();
      setProduct(data);
      setIsLoading(false);
    }
    fetchProduct();
  }, []);
  return (
    <div className="bg-[#f2f4f5] p-3 min-h-screen">
      <div className="bg-white min-h-screen rounded-lg shadow-sm">
        <Navbar />
        <ToastContainer theme="dark" />
        <div className="py-10 px-4">
          <div className="max-w-360 mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-neutral-900 text-xl sm:text-4xl font-semibold">
                Latest Arrivals
              </h1>
              <button
                className="rounded-sm shadow-sm py-1 px-4 font-semibold active:translate-y-px"
                onClick={notify}
              >
                View all
              </button>
            </div>

            <div className="py-10">
              <div className="flex flex-wrap justify-between  md:justify-start lg:justify-between gap-3 lg:gap-0 w-full space-y-8">
                {isLoading ? (
                  <SkeletonProductCard productCards={8} />
                ) : (
                  <>
                    {product.slice(0, 8).map((item) => (
                      <div key={item.product_id} className="w-full sm:w-[48%] md:w-[32%] lg:w-[23%]">
                        <ProductCard item={item} />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
