import React, { useContext, useState } from "react";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import BigCard from "./BigCard";
import SmallCard from "./SmallCard";
import useShowAtThreshold from "../../../hooks/useShowAtThreshold/useShowAtThreshold";
import { useQuery } from "@tanstack/react-query";

const ProductGrid = () => {
  let { products, scrolltop } = useContext(AuthContext);

  const { data: latestItems = [] } = useQuery(
    {
      queryKey: ["latestItems"],
      queryFn: () =>
        fetch(`${import.meta.env.VITE_SERVER_URL}/latestItems`).then(res =>
          res.json()
        ),
    },
    []
  );

  const [count, setCount] = useState(0);

  const handleChange = e => {
    const newCount = Number(e.target.value);
    if (newCount <= 10) {
      setCount(newCount);
    }
  };

  const showBorder = useShowAtThreshold(3800);

  return (
    <div className="py-5 md:py-20">
      <div className="container mx-auto">
        <div className="mb-14 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-secondary md:text-5xl">
            Recent Products
          </h1>
          <span
            className={`transition-width h-1 w-20 rounded-full bg-primary duration-500 ${
              showBorder ? "lg:w-20" : "lg:w-0"
            }`}
          ></span>
        </div>
        <div className="grid grid-cols-1 gap-5 p-5 md:p-0 lg:grid-cols-2">
          <BigCard latestItem={latestItems[0]} />

          <div className="flex flex-col gap-5">
            <SmallCard latestItem={latestItems[1]} />
            <SmallCard latestItem={latestItems[2]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
