import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./Featured.css";
import { FaStar } from "react-icons/fa";
import { FiCloudLightning, FiHeart } from "react-icons/fi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useShowAtThreshold from "../../../hooks/useShowAtThreshold/useShowAtThreshold";
import { useQuery } from "@tanstack/react-query";

const Featured = () => {
  const [tabselect, setTabSelect] = useState("tab1");

  const [count, setCount] = useState(0);

  const { products, scrolltop } = useContext(AuthContext);

  // let featured = products.filter(product => product.featured === true)

  const { data: featured = [] } = useQuery(
    {
      queryKey: ["featured"],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_SERVER_URL}/featured`).then(res =>
          res.json()
        ),
    },
    []
  );

  const { data: latest = [] } = useQuery(
    {
      queryKey: ["latest"],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_SERVER_URL}/latest`).then(res =>
          res.json()
        ),
    },
    []
  );

  const { data: bestseller = [] } = useQuery(
    {
      queryKey: ["bestseller"],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_SERVER_URL}/bestseller`).then(res =>
          res.json()
        ),
    },
    []
  );

  const { data: special = [] } = useQuery(
    {
      queryKey: ["special"],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_SERVER_URL}/special`).then(res =>
          res.json()
        ),
    },
    []
  );

  const showBorder = useShowAtThreshold(1300);

  return (
    <div className="bg-primary py-20 dark:bg-opacity-10">
      <div className="container mx-auto flex flex-col items-center gap-5 text-center  ">
        <h1
          className={`text-3xl font-bold text-base-100 dark:text-gray-200 md:text-5xl`}
        >
          Featured Products
        </h1>
        <span
          className={`transition-width h-1 w-20 rounded-full bg-base-100 duration-500 ${
            showBorder ? "md:w-20" : "md:w-0"
          }`}
        ></span>
        <p className="text-base-100">
          These are the most highly rated product in our store{" "}
          <span className="text-base-100 underline">Learn More</span>{" "}
        </p>

        <div className="my-5 grid grid-cols-2 items-center gap-5 overflow-x-auto rounded-xl border-white sm:justify-center md:flex md:gap-0 md:rounded-full md:border-2 md:bg-accent">
          <button
            onMouseMove={() => setTabSelect("tab1")}
            className={`flex flex-shrink-0 items-center rounded-full px-5  py-2 text-xl transition-all duration-300 md:border-r-2 ${
              tabselect === "tab1"
                ? "bg-secondary bg-opacity-100 font-semibold text-base-100 md:bg-primary"
                : "bg-accent text-neutral"
            }`}
          >
            Featured
          </button>
          <button
            onMouseMove={() => setTabSelect("tab2")}
            className={`flex flex-shrink-0 items-center rounded-full px-5  py-2 text-xl transition-all duration-300 md:border-r-2 ${
              tabselect === "tab2"
                ? "bg-secondary bg-opacity-100 font-semibold text-base-100 md:bg-primary"
                : "bg-accent text-neutral"
            }`}
          >
            Latest
          </button>
          <button
            onMouseMove={() => setTabSelect("tab3")}
            className={`flex flex-shrink-0 items-center rounded-full px-5  py-2 text-xl transition-all duration-300 md:border-r-2 ${
              tabselect === "tab3"
                ? "bg-secondary bg-opacity-100 font-semibold text-base-100 md:bg-primary"
                : "bg-accent text-neutral"
            }`}
          >
            Bestsellers
          </button>
          <button
            onMouseMove={() => setTabSelect("tab4")}
            className={`flex flex-shrink-0 items-center rounded-full px-5  py-2 text-xl transition-all duration-300 md:border-r-2 ${
              tabselect === "tab4"
                ? "bg-secondary bg-opacity-100 font-semibold text-base-100 md:bg-primary"
                : "bg-accent text-neutral"
            }`}
          >
            Specials
          </button>
        </div>
      </div>

      {tabselect === "tab1" && (
        <div className="container mx-auto grid grid-cols-1 justify-items-center gap-5 px-5 md:grid-cols-2 md:px-0 lg:grid-cols-4">
          {featured.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </div>
      )}

      {tabselect === "tab2" && (
        <div className="grid-cols-1;md:grid-cols-2 container mx-auto grid gap-5 px-5 md:px-0 lg:grid-cols-4">
          {latest.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </div>
      )}

      {tabselect === "tab3" && (
        <div className="grid-cols-1;md:grid-cols-2 container mx-auto grid gap-5 px-5 md:px-0 lg:grid-cols-4">
          {bestseller.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </div>
      )}
      {tabselect === "tab4" && (
        <div className="grid-cols-1;md:grid-cols-2 container mx-auto grid gap-5 px-5 md:px-0 lg:grid-cols-4">
          {special.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </div>
      )}

      <Link onClick={scrolltop} to="/products">
        <div className="mt-10 flex justify-center">
          <div className="btn-secondary btn w-52 rounded-full border-2 border-white text-base-100 transition-all  duration-300 ease-in-out hover:w-56 ">
            SEE ALL PRODUCTS &nbsp; <FaArrowRight className="text-xl" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Featured;
