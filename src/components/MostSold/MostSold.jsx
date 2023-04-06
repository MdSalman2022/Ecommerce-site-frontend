import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { useQuery } from "@tanstack/react-query";

const MostSold = () => {
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

  const [count, setCount] = useState(0);

  return (
    <div className="bg-accent py-20 dark:bg-opacity-10">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 pb-14">
        <h1 className="text-4xl font-bold text-secondary">
          Most Sold This Week
        </h1>
        <p className="text-neutral dark:text-accent">
          Top 10 most sold this week, next day delivery.
        </p>
      </div>
      <div className="container mx-auto grid grid-cols-1 justify-items-center gap-5 p-5 md:grid-cols-2 lg:grid-cols-4">
        {bestseller.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MostSold;
