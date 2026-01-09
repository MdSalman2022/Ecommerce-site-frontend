import React, { useContext, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const ProductCard = ({ item }) => {
  let { cart, setCart, scrolltop } = useContext(AuthContext);

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  let specialprice;
  if (item.special) {
    specialprice = item.price - ((item.price * item.discount) / 100).toFixed(1);
  }

  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    const newCount = Number(e.target.value);
    if (newCount <= 10) {
      setCount(newCount);
    }
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= item?.rating) {
      stars.push(<FaStar key={i} className="text-xl" />);
    } else {
      stars.push(<FaStar key={i} className="text-xl text-gray-300" />);
    }
  }

  const encodedProductName = encodeURIComponent(item.name).replace(/%20/g, "-");

  const handleCart = (data, count) => {
    const cartItem = cart.find((item) => item._id === data._id);

    if (cartItem) {
      const updatedCart = cart.map((item) => {
        if (item._id === data._id) {
          return {
            ...item,
            quantity: count ? count : item.quantity + 1,
            totalPrice: item.price * (count ? count : item.quantity + 1),
          };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newCartItem = {
        ...data,
        quantity: count ? count : 1,
        totalPrice: data.price * (count ? count : 1),
      };
      setCart([...cart, newCartItem]);
      localStorage.setItem("cart", JSON.stringify([...cart, newCartItem]));
    }
  };

  return (
    <div className="card-compact group card h-full w-11/12 border bg-base-100 bg-clip-padding backdrop-blur-sm backdrop-filter transition-all  duration-300 dark:bg-gray-200">
      <Link
        onClick={scrolltop}
        to={`/productDetails/${item._id}/${encodedProductName}`}
      >
        <figure className="relative rounded-t-2xl dark:bg-white">
          <LazyLoadImage
            className="h-64 object-contain p-2 transition-all duration-300  group-hover:scale-110"
            src={item.image}
            alt={item?.cat}
          />

          <div className="absolute top-5 right-0 flex w-14 flex-col items-center gap-3">
            <FiHeart className="rounded-full border bg-base-100 p-2 text-4xl text-error transition-all duration-300 hover:scale-110 hover:border-error" />
            <MdOutlineCompareArrows className="rounded-full border bg-base-100 p-2 text-4xl transition-all duration-300 hover:scale-110 hover:border-success dark:text-neutral" />
            {item?.featured && (
              <div className="badge border-none bg-base-100 text-4xl text-yellow-400">
                <MdStars className="" />
              </div>
            )}
          </div>
        </figure>
      </Link>

      <div className="card-body h-80  items-center lg:items-center">
        <h2
          className={`card-title text-left md:text-left ${
            item?.featured && "justify-between"
          }`}
        >
          <span className="card-title text-lg">
            <Link
              preventScrollReset={false}
              onClick={scrolltop}
              className="transition-all hover:text-primary"
              to={`/productDetails/${item._id}/${encodedProductName}`}
            >
              {item?.name}{" "}
              {item?.bestseller ? (
                <div className="badge top-40 right-3 border-0 bg-green-600 text-base-100">
                  {item?.sells}+
                </div>
              ) : (
                ""
              )}
            </Link>
            {item?.latest && (
              <div className="badge-md rounded-lg border">NEW</div>
            )}
          </span>
        </h2>
        {item?.rating && (
          <span className="flex gap-2 font-semibold text-yellow-300">
            {stars}
          </span>
        )}
        <div className="flex items-center gap-3">
          {item?.special ? (
            <span className="text-2xl font-semibold ">${specialprice}</span>
          ) : (
            ""
          )}
          <span
            className={`text-left text-2xl ${
              item?.special ? "line-through" : ""
            }`}
          >
            ${item?.price}
          </span>
          {item?.special && (
            <span className={`text-lg text-error`}>-{item?.discount}%</span>
          )}
        </div>

        <div className="absolute bottom-4">
          <div className="card-actions flex-col items-center justify-center gap-3">
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <div className="flex items-center px-2">
                <button
                  className="btn-secondary btn h-5 w-12 rounded-full text-xl"
                  onClick={() => setCount(count - 1)}
                  disabled={count === 0}
                >
                  <FaMinus className="text-base-100" />
                </button>
                <input
                  type="number"
                  className="w-[70%] border-none text-center dark:bg-transparent"
                  value={count}
                  onChange={handleChange}
                />
                <button
                  className={`btn-secondary btn h-8 w-12 rounded-full border-none text-xl text-neutral${
                    count === 10 ? " bg-[#e5e7eb] hover:bg-[#e5e7eb] " : ""
                  }`}
                  onClick={() => setCount(count + 1)}
                  disabled={count > 9}
                >
                  <FaPlus className="text-base-100" />
                </button>
              </div>
              <button
                onClick={() => handleCart(item, count)}
                className="btn-secondary btn w-[90%] rounded-full text-base-100 lg:w-full"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
