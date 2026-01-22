import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SkeletonProductCard from "./SkeletonProductCard";

export default function CollectionSection({ id, isLoading }) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products`,
      );
      const { data } = await res.json();
      setProducts(data);
      // setIsLoading(false);
    }
    fetchProduct();
  }, []);

  return (
    <div className="py-15 lg:py-30 px-4 lg:px-20">
      <div className="text-3xl font-semibold">In this collection</div>
      <div className="flex justify-between flex-wrap">
        {isLoading ? 
        <SkeletonProductCard productCards={4}/>
        : (
          < >
        {products
          .filter((product) => product.rating >= 4 && product.product_id !== id)
          .slice(0, 4)
          .map((product) => (
            <div key={product.product_id} className="w-full sm:w-[49%] lg:w-[23%] mt-15">
              <ProductCard item={product}  id={id}/>
            </div>
          ))}
          </>
        )}
      </div>
    </div>
  );
}
