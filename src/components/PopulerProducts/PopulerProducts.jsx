import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Autoplay } from "swiper";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { async } from "@firebase/util";
import ProductCard from "../ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const PopulerProducts = () => {
  const { products } = useContext(AuthContext);
  let projectType = [
    "",
    "smartphone",
    "laptop",
    "components",
    "accessories",
    "camera",
  ];

  const [allProducts, setAllProducts] = useState([]);

  const [type, setType] = useState("");

  const [TypeCount, setTypeCount] = useState(0);

  useEffect(() => {
    if (type !== "") {
      setAllProducts(products.filter(product => product.cat === type));
    }
  }, [type]);

  if (TypeCount > 5) {
    setTypeCount(0);
  } else if (TypeCount < 0) {
    setTypeCount(5);
  }

  const handleType = n => {
    setTypeCount(n);
    setType(projectType[n]);
  };

  useEffect(() => {
    setType(projectType[TypeCount]);
  }, [TypeCount]);

  function getDeviceWidth() {
    return window.innerWidth;
  }
  const deviceWidth = getDeviceWidth();

  return (
    <div className="bg-accent dark:bg-opacity-10 md:py-20">
      <div className="container mx-auto p-5 md:p-0">
        <div className="flex flex-col justify-between gap-2 py-5 md:flex-row">
          <p className="xl py-2 text-xl font-bold text-primary md:text-4xl">
            Populer Products
          </p>
          <div className="flex items-center justify-center gap-5">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleType(0)}
                className={`btn-primary btn rounded-3xl border transition-all duration-300 ${
                  type !== "" ? "btn-outline" : "text-base-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleType(1)}
                className={`btn-primary btn rounded-3xl border transition-all duration-300 ${
                  type !== "smartphone" ? "btn-outline" : "text-base-100"
                }`}
              >
                Smartphones
              </button>
              <button
                onClick={() => handleType(2)}
                className={`btn-primary btn rounded-3xl border transition-all duration-300 ${
                  type !== "laptop" ? "btn-outline" : ""
                }`}
              >
                Laptops
              </button>
              <button
                onClick={() => handleType(3)}
                className={`btn-primary btn rounded-3xl border transition-all duration-300 ${
                  type !== "components" ? "btn-outline" : "text-base-100"
                }`}
              >
                Desktop components
              </button>
              <button
                onClick={() => handleType(4)}
                className={`btn-primary btn rounded-3xl border transition-all duration-300 ${
                  type !== "accessories" ? "btn-outline" : "text-base-100"
                }`}
              >
                Accessories
              </button>
              <button
                onClick={() => handleType(5)}
                className={`btn-primary btn rounded-3xl border transition-all duration-300 ${
                  type !== "camera" ? "btn-outline" : "text-base-100"
                }`}
              >
                Camera
              </button>
            </div>
            <div className="hidden w-full justify-between gap-3 text-base-100 md:flex md:w-32 lg:justify-center ">
              <button onClick={() => setTypeCount(TypeCount - 1)}>
                <FaArrowLeft
                  className="cursor-pointer rounded-full border-2 p-2 text-4xl  text-primary transition-all duration-300 hover:border-primary lg:p-5 lg:text-6xl"
                  disabled
                />
              </button>
              <button onClick={() => setTypeCount(TypeCount + 1)}>
                <FaArrowRight className="cursor-pointer rounded-full border-2 p-2 text-4xl  text-primary transition-all duration-300 hover:border-primary lg:p-5 lg:text-6xl" />
              </button>
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={deviceWidth > 1024 ? 4 : deviceWidth > 768 ? 2 : 1}
          spaceBetween={30}
          slidesPerGroup={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
          className="mySwiper p-5"
        >
          {type !== "" &&
            allProducts.map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard item={item} />
              </SwiperSlide>
            ))}
          {type === "" &&
            products.slice(0, 30).map((item, index) => (
              <SwiperSlide key={index}>
                <ProductCard item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default PopulerProducts;
