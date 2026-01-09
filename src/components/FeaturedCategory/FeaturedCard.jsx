import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function FeaturedCard({ item }) {
  let { cart, setCart, scrolltop } = useContext(AuthContext);

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  const [count, setCount] = useState(0);

  const handleChange = (e) => {
    const newCount = Number(e.target.value);
    if (newCount <= 10) {
      setCount(newCount);
    }
  };

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
    <div className="card-compact group card relative border bg-white px-5 dark:bg-gray-300 md:h-[550px] md:px-0 lg:w-64">
      <figure className="dark:bg-white">
        <LazyLoadImage
          className="h-60 object-cover p-2 transition-all duration-300 group-hover:scale-110 md:w-52"
          src={item.image}
          alt="featured"
        />
      </figure>
      <div className="card-body h-72 dark:bg-gray-200 md:h-52">
        <h2 className="card-title justify-between text-lg">
          <Link
            onClick={scrolltop}
            className="transition-all hover:text-secondary"
            to={`/productDetails/${item._id}/${encodeURIComponent(
              item.name
            ).replace(/%20/g, "-")}`}
          >
            {item.name}{" "}
            {item?.bestseller ? (
              <div className="badge top-40 right-3 border-0 bg-green-600 text-base-100">
                {item?.sells}+
              </div>
            ) : (
              ""
            )}
          </Link>
        </h2>
        {/* {item?.rating && <span className='font-semibold flex gap-2 text-yellow-300'>{stars}</span>}       */}
        <span className="text-xl font-semibold text-secondary">
          ${item.price}
        </span>
        <div className="absolute top-5 right-4 flex w-10 flex-col items-center gap-3">
          <FiHeart className="rounded-full border bg-base-100 p-2 text-4xl text-error transition-all duration-300 hover:scale-110 hover:border-error" />
          <MdOutlineCompareArrows className="rounded-full border bg-base-100 p-2 text-4xl text-success transition-all duration-300 hover:scale-110 hover:border-success" />
          <div className="rounded-full border-none  bg-base-100 text-3xl text-yellow-400 ">
            <MdStars />
          </div>
        </div>
        <div className="absolute bottom-4 ">
          <div className=" ">
            <div className=" flex flex-col items-center gap-3">
              <div className="flex w-full items-center justify-center">
                <button
                  className="btn-secondary btn rounded-full "
                  onClick={() => setCount(count - 1)}
                  disabled={count === 0}
                >
                  <FaMinus className="text-base-100" />
                </button>
                <input
                  type="number"
                  className="w-36 border-none text-center dark:bg-transparent lg:w-32"
                  value={count}
                  onChange={handleChange}
                />
                <button
                  className={`btn-secondary btn rounded-full border-none text-neutral ${
                    count === 10 ? " bg-[#e5e7eb] hover:bg-[#e5e7eb] " : ""
                  }`}
                  onClick={() => setCount(count + 1)}
                  disabled={count === 10}
                >
                  <FaPlus className="text-base-100" />
                </button>
              </div>
              <button
                onClick={() => handleCart(item, count)}
                className="btn-secondary btn w-full rounded-full text-base-100 md:w-56"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCard;
