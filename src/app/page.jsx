"use client";

// links
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// Components
import ProductCard from "./components/ProductCard";
import SkeletonProductCard from "./components/SkeletonProductCard";
import Navbar from "./components/Navbar";
import FilterCollection from "./components/ui/FilterCollection";
import FilterColors from "./components/ui/FilterColors";
import FilterRating from "./components/ui/FilterRating";
import { RiTShirt2Line } from "react-icons/ri";
import { LuFilter } from "react-icons/lu";
import CustomSelect from "./components/CustomSelect";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const CollectionOptions = ["Latest arrivals", "Urban Oasis", "Fresh Fusion"];
  const CategoryOptions = ["Unisex", "Women", "Men"];
  const [select, setSelect] = useState("Sort By");
  const [sortBy, setSortBy] = useState(null);
  const [activeTab, setActiveTab] = useState("Latest arrivals");
  const [collectionActiveOption, setCollectionActiveOption] = useState(0);
  const [categoryActiveOption, setCategoryOption] = useState(null);
  const [colorActiveOption, setColorOption] = useState(null);
  const [colorSelect, setColorSelect] = useState(null);
  const [ratingSelect, setRatingSelect] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(null);
  const notify = () => toast.info("More coming soon!");
  const handleCollectionActiveSelection = (id, option) => {
    setCategoryOption(null);
    setColorOption(null);
    setCollectionActiveOption(id);
    setActiveTab(option);
    setIsOpen(false);
  };
  const handleCategorySelection = (id, option) => {
    setCollectionActiveOption(null);
    setColorOption(null);
    setCategoryOption(id);
    setActiveTab(option);
    setIsOpen(false);
  };
  const handleColorSelection = (id, color) => {
    setCollectionActiveOption(null);
    setCategoryOption(null);
    setColorOption(id);
    setColorSelect(color);
    setActiveTab("Colors");
    setIsOpen(false);
  };
  const handleRatingSelection = (rating) => {
    setCollectionActiveOption(null);
    setCategoryOption(null);
    setColorOption(null);
    setActiveTab("Ratings");
    setRatingSelect(rating);
    setIsOpen(false);
  };

  const handleSelect = (option) => {
    setSelect(option);
    setOpen(false);
    setSortBy(option);
  };

  const filteredByRating = product.filter(
    (item) => Math.floor(item.rating) === ratingSelect,
  );

  const options = ["High - Low Rating", "Low - High Rating"];

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(
        `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products`,
      );
      const { data } = await res.json();
      setProduct(data);
      setIsLoading(false);
    }
    fetchProduct();
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeTab, isOpen]);
  return (
    <div className="bg-[#f2f4f5] p-3 min-h-screen">
      <div className="bg-white min-h-screen rounded-lg shadow-sm">
        <Navbar />
        <ToastContainer theme="dark" />

        <div
          className={`fixed inset-0 bg-white z-10 p-4 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-between items-center border-b border-gray-400 pb-4 mb-6">
            <div className="text-3xl">Filter</div>
            <i
              onClick={() => setIsOpen(false)}
              className="bx  bx-x text-2xl mt-1.5 cursor-pointer"
            ></i>
          </div>
          <div className="space-y-6">
            <FilterCollection
              title={"Collection"}
              setActiveTab={setActiveTab}
              activeOption={collectionActiveOption}
              handleActiveSelection={handleCollectionActiveSelection}
              options={CollectionOptions}
              idx={1}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <FilterCollection
              title={"Category"}
              setActiveTab={setActiveTab}
              activeOption={categoryActiveOption}
              handleActiveSelection={handleCategorySelection}
              options={CategoryOptions}
              idx={2}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />

            <FilterColors
              products={product}
              handleColorSelection={handleColorSelection}
              colorActiveOption={colorActiveOption}
              height={30}
              idx={3}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />

            <FilterRating
              handleRatingSelection={handleRatingSelection}
              idx={4}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </div>
        </div>

        <div className="py-10 px-4">
          <div className="max-w-400 mx-auto">
            <div className="flex">
              <div className="hidden xmd:block w-[30%] pr-10 lg:pr-20">
                <div className="hidden xmd:block space-y-6">
                  <FilterCollection
                    title={"Collection"}
                    setActiveTab={setActiveTab}
                    activeOption={collectionActiveOption}
                    handleActiveSelection={handleCollectionActiveSelection}
                    options={CollectionOptions}
                  />
                  <FilterCollection
                    title={"Category"}
                    setActiveTab={setActiveTab}
                    activeOption={categoryActiveOption}
                    handleActiveSelection={handleCategorySelection}
                    options={CategoryOptions}
                  />

                  <FilterColors
                    products={product}
                    handleColorSelection={handleColorSelection}
                    colorActiveOption={colorActiveOption}
                  />

                  <FilterRating handleRatingSelection={handleRatingSelection} />
                </div>
              </div>
              <div className="w-full xmd:w-[80%]">
                <div className="flex items-center justify-between xmd:justify-end xl:pr-6">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-1 border border-gray-200 shadow-sm px-4 py-2 mb-4 xmd:hidden cursor-pointer"
                  >
                    <LuFilter />
                    Filter
                  </button>
                  <CustomSelect
                    select={select}
                    options={options}
                    handleSelect={handleSelect}
                    open={open}
                    setOpen={setOpen}
                  />
                </div>

                <div
                  className={`flex flex-wrap relative ${filteredByRating.length === 0 && activeTab === "Ratings" ? "justify-center" : "justify-start"}`}
                >
                  {isLoading ? (
                    <SkeletonProductCard productCards={8} />
                  ) : (
                    <>
                      {activeTab === "Latest arrivals" && (
                        <>
                          {sortBy === "High - Low Rating" ? (
                            <>
                              {product
                                .filter((item) => item.rating)
                                .sort((a, b) => b.rating - a.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : (
                            <>
                              {product.map((item) => (
                                <div
                                  key={item.product_id}
                                  className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                >
                                  <ProductCard item={item} />
                                </div>
                              ))}
                            </>
                          )}
                        </>
                      )}
                      {activeTab === "Urban Oasis" && (
                        <>
                          {sortBy === "High - Low Rating" ? (
                            <>
                              {product
                                .filter(
                                  (item) =>
                                    item.rating &&
                                    item.collection.name == activeTab,
                                )
                                .sort((a, b) => b.rating - a.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : sortBy === "Low - High Rating" ? (
                            <>
                              {product
                                .filter(
                                  (item) =>
                                    item.rating &&
                                    item.collection.name == activeTab,
                                )
                                .sort((a, b) => a.rating - b.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : (
                            <>
                              {product
                                .filter(
                                  (item) => item.collection.name === activeTab,
                                )
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          )}
                        </>
                      )}
                      {activeTab === "Fresh Fusion" && (
                        <>
                          {sortBy === "High - Low Rating" ? (
                            <>
                              {product
                                .filter(
                                  (item) =>
                                    item.rating &&
                                    item.collection.name == activeTab,
                                )
                                .sort((a, b) => b.rating - a.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : sortBy === "Low - High Rating" ? (
                            <>
                              {product
                                .filter(
                                  (item) =>
                                    item.rating &&
                                    item.collection.name == activeTab,
                                )
                                .sort((a, b) => a.rating - b.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : (
                            <>
                              {product
                                .filter(
                                  (item) => item.collection.name === activeTab,
                                )
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          )}
                        </>
                      )}
                      {activeTab === "Unisex" && (
                        <>
                          {sortBy === "High - Low Rating" ? (
                            <>
                              {product
                                .filter(
                                  (item) =>
                                    item.rating &&
                                    item.category.name == activeTab,
                                )
                                .sort((a, b) => b.rating - a.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : sortBy === "Low - High Rating" ? (
                            <>
                              {product
                                .filter(
                                  (item) =>
                                    item.rating &&
                                    item.category.name == activeTab,
                                )
                                .sort((a, b) => a.rating - b.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : (
                            <>
                              {product
                                .filter(
                                  (item) => item.category.name === activeTab,
                                )
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          )}
                        </>
                      )}
                      {activeTab === "Women" && (
                        <>
                          {sortBy === "High - Low Rating" ? (
                            <>
                              {product
                                .filter(
                                  (item) =>
                                    item.rating &&
                                    item.category.name == activeTab,
                                )
                                .sort((a, b) => b.rating - a.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : sortBy === "Low - High Rating" ? (
                            <>
                              {product
                                .filter(
                                  (item) =>
                                    item.rating &&
                                    item.category.name == activeTab,
                                )
                                .sort((a, b) => a.rating - b.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : (
                            <>
                              {product
                                .filter(
                                  (item) => item.category.name === activeTab,
                                )
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          )}
                        </>
                      )}
                      {activeTab === "Men" && (
                        <>
                          {product
                            .filter((item) => item.category.name === activeTab)
                            .map((item) => (
                              <div
                                key={item.product_id}
                                className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                              >
                                <ProductCard item={item} />
                              </div>
                            ))}
                        </>
                      )}
                      {activeTab === "Colors" && (
                        <>
                          {sortBy === "High - Low Rating" ? (
                            <>
                              {product
                                .filter(
                                  (item) =>
                                    item.rating &&
                                    item.colors.includes(colorSelect),
                                )
                                .sort((a, b) => b.rating - a.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : sortBy === "Low - High Rating" ? (
                            <>
                              {product
                                .filter(
                                  (item) =>
                                    item.rating &&
                                    item.colors.includes(colorSelect),
                                )
                                .sort((a, b) => a.rating - b.rating)
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          ) : (
                            <>
                              {product
                                .filter((item) =>
                                  item.colors.includes(colorSelect),
                                )
                                .map((item) => (
                                  <div
                                    key={item.product_id}
                                    className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                                  >
                                    <ProductCard item={item} />
                                  </div>
                                ))}
                            </>
                          )}
                        </>
                      )}
                      {activeTab === "Ratings" && (
                        <>
                          {filteredByRating.length === 0 ? (
                            <div className=" xmd:absolute left-[50%] top-40 xmd:-translate-x-[50%] flex flex-col justify-center items-center">
                              <div className="border-b border-gray-200 rounded-full h-12 w-12 flex justify-center items-center">
                                <RiTShirt2Line className="text-2xl text-[#4539ca]" />
                              </div>
                              <div className="text-2xl font-semibold mb-2">
                                Noting found just yet
                              </div>
                              <p className="text-black/70 font-medium">
                                Adjust your filter a bit, and let's see what we
                                can find!
                              </p>
                            </div>
                          ) : (
                            filteredByRating.map((item) => (
                              <div
                                key={item.product_id}
                                className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                              >
                                <ProductCard item={item} />
                              </div>
                            ))
                          )}
                        </>
                      )}
                      {activeTab === "High - Low Rating" && (
                        <>
                          {product
                            .filter((item) => item.rating)
                            .sort((a, b) => b.rating - a.rating)
                            .map((item) => (
                              <div
                                key={item.product_id}
                                className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                              >
                                <ProductCard item={item} />
                              </div>
                            ))}
                        </>
                      )}
                      {activeTab === "Low - High Rating" && (
                        <>
                          {product
                            .filter((item) => item.rating)
                            .sort((a, b) => a.rating - b.rating)
                            .map((item) => (
                              <div
                                key={item.product_id}
                                className="w-full sm:w-[calc(100%/2)] xl:w-[calc(100%/3)] sm:odd:pr-3 xl:odd:pr-6 mb-12 xl:pr-6"
                              >
                                <ProductCard item={item} />
                              </div>
                            ))}
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
