import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SkeletonProductCard from "./SkeletonProductCard";

export default function CollectionSection({ id, isLoading, product }) {
  const [products, setProducts] = useState([]);
  const productCollections = product?.collection?.collection_id

  // console.log(products.filter((product)=> product.collection.collection_id === 'urban').map((product) => product.product_id) )
  // console.log(product.collection.collection_id)
  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products`,
      );
      const { data } = await res.json();
      setProducts(data);
    }
    fetchProduct();
  }, []);

  return (
    <div className="py-15 lg:py-30 px-4 lg:px-20">
      <div className="text-3xl font-semibold">In this collection</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-15">
        {isLoading ? 
        <SkeletonProductCard productCards={4}/>
        : (
          < >
        {products
          ?.filter((product) => product?.collection?.collection_id === productCollections )
          ?.slice(0, 4)
          ?.map((product) => (
            <div key={product.product_id} className="">
              <ProductCard item={product} id={id}/>
            </div>
          ))}
          </>
        )}

      </div>
    </div>
  );
}
