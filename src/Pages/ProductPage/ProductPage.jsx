import React, { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

import { HiEmojiSad } from "react-icons/hi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Link, useParams } from "react-router-dom";
import { allcategories } from "../../components/Shared/Header/NavbarItems";
import { FaChevronUp, FaStar } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";

function extractBrands(categories) {
  let brands = [];

  categories.forEach((category) => {
    if (category.subcategories) {
      brands = brands.concat(extractBrands(category.subcategories));
    } else if (category.brand) {
      brands.push(category.brand);
    }
  });

  console.log("brands:", brands);

  return brands;
}

function ProductPage() {
  let { products } = useContext(AuthContext);

  let { category, brand, subcategory } = useParams();

  if (category && subcategory && brand) {
    products = products.filter(
      (product) =>
        product.cat === category &&
        (product.brand === brand || product.type === brand) &&
        product.subcat === subcategory
    );
  } else if (category && subcategory && !brand) {
    products = products.filter(
      (product) =>
        (product.cat === category && product.subcat === subcategory) ||
        (product.cat === category && product.brand === subcategory)
    );
  } else if (category && brand && !subcategory) {
    products = products.filter(
      (product) => product.cat === category && product.subcat === subcategory
    );
  } else if (category === "products" && !subcategory && !brand) {
    products = products;
  } else if (category && !subcategory && !brand) {
    products = products.filter((product) => product.cat === category);
  }

  let productsPerPage;
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  productsPerPage = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(products.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [sortType, setSortType] = useState("");

  const handleSortTypeChange = (data) => {
    setSortType(data);
  };

  const handlePostsPerPage = (e) => {
    setPostsPerPage(e.target.value);
  };

  const sortedItems = () => {
    switch (sortType) {
      case "high-to-low":
        return productsPerPage.sort((a, b) => b.price - a.price);
      case "low-to-high":
        return productsPerPage.sort((a, b) => a.price - b.price);
      default:
        return productsPerPage;
    }
  };

  const brands = extractBrands([allcategories]);
  console.log(brands);
  return (
    <div>
      <div className="container mx-auto flex flex-col items-center py-5 md:items-start">
        <div className="breadcrumbs text-sm">
          <ul>
            <li className="capitalize">
              <a>{category}</a>
            </li>
            <li className="capitalize">
              <a>{subcategory}</a>
            </li>
            {brand && <li className="capitalize">{brand}</li>}
          </ul>
        </div>
        <h1 className="pb-10 text-center text-5xl font-bold capitalize">
          {brand ? brand : name}
        </h1>

        <div className="flex grid-cols-5 flex-col gap-10 md:grid">
          <div className="col-span-1 hidden md:block md:w-60">
            <div className=" space-y-5 p-2 ">
              <span className="flex items-center justify-between pt-5">
                Category <FaChevronUp />
              </span>
              <ul className="list-inside list-disc">
                {allcategories.map((item, index) => (
                  <li key={index} className="capitalize">
                    <a href={`/products/${item.name}`}>{item.name}</a>
                  </li>
                ))}
                <li className="list-none font-semibold text-primary">
                  Sell All
                </li>
              </ul>
              <span className="flex items-center justify-between border-t pt-5">
                Brands <FaChevronUp />
              </span>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                  Samsung
                </li>
                <li className="flex items-center justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                  Intel
                </li>
                <li className="flex items-center justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                  Amd
                </li>
                <li className="flex items-center justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                  Gigabyte
                </li>
                <li className="flex items-center justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                  Asus
                </li>
                <li className="font-semibold text-primary">Sell All</li>
              </ul>
              <div className="flex flex-col gap-2">
                <span className="flex items-center justify-between border-t pt-5">
                  Price range <FaChevronUp />
                </span>
                <div className="flex justify-between">
                  <input
                    className="input-bordered input-primary input h-10 w-20"
                    type="number"
                    placeholder="0"
                  />
                  <input
                    className="input-bordered input-primary input h-10 w-20"
                    type="number"
                    placeholder="10000"
                  />
                </div>
                <div className="flex justify-center">
                  <button className="btn btn-primary">Apply</button>
                </div>
              </div>
              <span className="flex items-center justify-between border-t pt-5">
                Ratings <FaChevronUp />
              </span>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                  <div className="flex text-xl text-warning">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                  <div className="flex text-xl text-warning">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar className="text-accent" />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                  <div className="flex text-xl text-warning">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar className="text-accent" />
                    <FaStar className="text-accent" />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                  <div className="flex text-xl text-warning">
                    <FaStar />
                    <FaStar />
                    <FaStar className="text-accent" />
                    <FaStar className="text-accent" />
                    <FaStar className="text-accent" />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                  />
                  <div className="flex text-xl text-warning">
                    <FaStar />
                    <FaStar className="text-accent" />
                    <FaStar className="text-accent" />
                    <FaStar className="text-accent" />
                    <FaStar className="text-accent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 px-4 md:px-0">
            {productsPerPage.length > 0 && (
              <div className="flex w-full items-center justify-between">
                <div>
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("filter").showModal()
                    }
                  >
                    <LuSettings2 />
                  </button>
                  <dialog id="filter" className="modal filter">
                    <div className="modal-box">
                      <div className="space-y-5">
                        <span className="flex items-center justify-between">
                          Category <FaChevronUp />
                        </span>
                        <ul className="list-inside list-disc">
                          {allcategories.map((item, index) => (
                            <li key={index} className="capitalize">
                              <a href={`/products/${item.name}`}>{item.name}</a>
                            </li>
                          ))}
                          <li className="list-none font-semibold text-primary">
                            Sell All
                          </li>
                        </ul>
                        <span className="flex items-center justify-between border-t pt-5">
                          Brands <FaChevronUp />
                        </span>
                        <ul className="flex flex-col gap-3">
                          <li className="flex items-center justify-start gap-3">
                            <input
                              type="checkbox"
                              className="checkbox-primary checkbox"
                            />
                            Samsung
                          </li>
                          <li className="flex items-center justify-start gap-3">
                            <input
                              type="checkbox"
                              className="checkbox-primary checkbox"
                            />
                            Intel
                          </li>
                          <li className="flex items-center justify-start gap-3">
                            <input
                              type="checkbox"
                              className="checkbox-primary checkbox"
                            />
                            Amd
                          </li>
                          <li className="flex items-center justify-start gap-3">
                            <input
                              type="checkbox"
                              className="checkbox-primary checkbox"
                            />
                            Gigabyte
                          </li>
                          <li className="flex items-center justify-start gap-3">
                            <input
                              type="checkbox"
                              className="checkbox-primary checkbox"
                            />
                            Asus
                          </li>
                          <li className="font-semibold text-primary">
                            Sell All
                          </li>
                        </ul>
                        <div className="flex flex-col gap-2">
                          <span className="flex items-center justify-between border-t pt-5">
                            Price range <FaChevronUp />
                          </span>
                          <div className="flex justify-between">
                            <input
                              className="input-bordered input-primary input h-10 w-20"
                              type="number"
                              placeholder="0"
                            />
                            <input
                              className="input-bordered input-primary input h-10 w-20"
                              type="number"
                              placeholder="10000"
                            />
                          </div>
                          <div className="flex justify-center">
                            <button className="btn btn-primary">Apply</button>
                          </div>
                        </div>
                        <span className="flex items-center justify-between border-t pt-5">
                          Ratings <FaChevronUp />
                        </span>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-5">
                            <input
                              type="checkbox"
                              className="checkbox-primary checkbox"
                            />
                            <div className="flex text-xl text-warning">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                            </div>
                          </div>
                          <div className="flex items-center gap-5">
                            <input
                              type="checkbox"
                              className="checkbox-primary checkbox"
                            />
                            <div className="flex text-xl text-warning">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar className="text-accent" />
                            </div>
                          </div>
                          <div className="flex items-center gap-5">
                            <input
                              type="checkbox"
                              className="checkbox-primary checkbox"
                            />
                            <div className="flex text-xl text-warning">
                              <FaStar />
                              <FaStar />
                              <FaStar />
                              <FaStar className="text-accent" />
                              <FaStar className="text-accent" />
                            </div>
                          </div>
                          <div className="flex items-center gap-5">
                            <input
                              type="checkbox"
                              className="checkbox-primary checkbox"
                            />
                            <div className="flex text-xl text-warning">
                              <FaStar />
                              <FaStar />
                              <FaStar className="text-accent" />
                              <FaStar className="text-accent" />
                              <FaStar className="text-accent" />
                            </div>
                          </div>
                          <div className="flex items-center gap-5">
                            <input
                              type="checkbox"
                              className="checkbox-primary checkbox"
                            />
                            <div className="flex text-xl text-warning">
                              <FaStar />
                              <FaStar className="text-accent" />
                              <FaStar className="text-accent" />
                              <FaStar className="text-accent" />
                              <FaStar className="text-accent" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
                <div>
                  <select
                    onChange={handlePostsPerPage}
                    className="select-bordered select w-20 max-w-xs"
                  >
                    <option value={20} selected>
                      20
                    </option>
                    <option value={40}>40</option>
                    <option value={60}>60</option>
                    <option value={80}>80</option>
                  </select>
                  <div className="dropdown-end dropdown">
                    <label
                      tabIndex={0}
                      className="btn-outline btn btn-primary m-1"
                    >
                      Sort
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu rounded-box w-52 bg-white p-2 shadow"
                    >
                      <li onClick={() => handleSortTypeChange("low-to-high")}>
                        <a>Low to High</a>
                      </li>
                      <li onClick={() => handleSortTypeChange("high-to-low")}>
                        <a>High to Low</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {productsPerPage.length > 0 || products.length > 0 ? (
              <div className="grid gap-8 p-5 md:grid-cols-2 md:p-0 lg:grid-cols-3">
                {sortType === "" &&
                  productsPerPage.map((item, index) => (
                    <ProductCard key={index} item={item} />
                  ))}

                {sortType !== "" &&
                  sortedItems().map((item, index) => (
                    <ProductCard key={index} item={item} />
                  ))}
              </div>
            ) : (
              <div className="flex h-96 flex-col items-center gap-5">
                <p className="rounded-full bg-error bg-opacity-10 p-10 text-7xl text-error">
                  <HiEmojiSad />
                </p>
                <h1 className="text-3xl font-bold">Sorry! No Products Found</h1>
                <h1 className="text-xl font-bold">
                  Please try searching for something else
                </h1>
                <Link
                  to="/"
                  className="btn-outline btn btn-primary rounded px-8 py-3 font-semibold"
                >
                  Back to homepage
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="btn-group flex gap-2">
          {pageNumbers.length > 1 &&
            pageNumbers.map((number, index) => (
              <button
                key={index}
                onClick={() => paginate(number)}
                className={`btn-neutral btn hover:btn-primary ${
                  currentPage === number ? "btn-active" : "bg-white text-black"
                }`}
              >
                {number}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
