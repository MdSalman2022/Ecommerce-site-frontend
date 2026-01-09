import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

import FeaturedCard from "./FeaturedCard";
import useShowAtThreshold from "../../../hooks/useShowAtThreshold/useShowAtThreshold";
import { useQuery } from "@tanstack/react-query";

const FeaturedCategory = () => {
  const { data: featured = [] } = useQuery(
    {
      queryKey: ["featured"],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_SERVER_URL}/featured`).then((res) =>
          res.json()
        ),
    },
    []
  );

  const showBorder = useShowAtThreshold(2300);

  return (
    <div className="mx-2 py-5 px-2 md:mx-0 lg:py-20">
      <div className="my-5 flex flex-col items-center gap-5 text-center lg:pb-10">
        <h1 className="text-3xl font-bold text-secondary lg:text-5xl">
          Featured Category
        </h1>
        <span
          className={`transition-width h-1 w-20 rounded-full bg-primary duration-500 ${
            showBorder ? "lg:w-20" : "lg:w-0"
          }`}
        ></span>
      </div>

      <div className="container mx-auto flex flex-col items-center justify-center gap-3 rounded-3xl bg-accent py-5 dark:bg-gray-300 md:border md:py-0 md:pr-3 lg:grid lg:grid-cols-4 lg:gap-14">
        <div className="image-full relative flex h-96 w-72 items-center justify-center overflow-hidden  rounded-3xl border border-b-2 bg-white dark:bg-gray-300 md:w-80 md:rounded-l-3xl md:border-b-0 lg:col-span-1 lg:h-[600px] lg:w-96 lg:border-r">
          <h1 className="absolute top-5 z-50 text-center text-3xl font-bold text-primary md:text-4xl lg:top-24">
            Smartphones
          </h1>
          <LazyLoadImage
            height="300px"
            width="500px"
            src="https://i.ibb.co/9Zxt731/s22ultra.webp"
            alt="s22u"
            className="absolute -bottom-20 w-full lg:-bottom-10"
          />
        </div>
        <div className="col-span-3 grid grid-cols-1 place-content-center justify-items-center gap-5 px-5 dark:bg-gray-300 md:grid-cols-2 md:p-5 lg:col-span-3 lg:grid-cols-4 lg:gap-0 lg:p-0">
          {featured &&
            featured.map((item, index) => (
              <FeaturedCard key={index} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategory;
