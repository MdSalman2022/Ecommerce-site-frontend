import React, { useContext } from "react";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaRegHandPointRight } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function SmallCard({ latestItem, len }) {
  let { cart, setCart, scrolltop } = useContext(AuthContext);

  cart = JSON.parse(localStorage.getItem("cart")) || [];

  const [count, setCount] = useState(0);

  const handleChange = e => {
    const newCount = Number(e.target.value);
    if (newCount <= 10) {
      setCount(newCount);
    }
  };

  const handleCart = (data, count) => {
    const cartItem = cart.find(item => item._id === data._id);

    if (cartItem) {
      const updatedCart = cart.map(item => {
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
    <div className="card-compact card relative h-full w-full items-center bg-base-100 drop-shadow-md lg:card-side">
      <figure className="w-80 object-cover">
        <LazyLoadImage
          src={latestItem?.image}
          alt="Album"
          className="w-60 object-cover"
        />
      </figure>
      <div className="card-body flex w-full flex-col dark:rounded-r-2xl dark:border dark:bg-neutral dark:text-accent">
        <div className="card-title w-[90%] flex-col items-start justify-start">
          <Link
            onClick={scrolltop}
            className="transition-all hover:text-primary"
            to={`/productDetails/${latestItem?._id}/${encodeURIComponent(
              latestItem?.name
            ).replace(/%20/g, "-")}`}
          >
            {latestItem?.name}
          </Link>
          <p className="text-xl font-semibold">${latestItem?.price}</p>
          <span className="flex gap-2 font-semibold text-yellow-300">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </span>
        </div>
        <div className="absolute top-5 right-4 flex w-10 flex-col gap-3">
          <FiHeart className="rounded-full border bg-base-100 p-2 text-4xl text-error transition-all duration-300 hover:scale-110 hover:border-error" />
          <MdOutlineCompareArrows className="rounded-full border bg-base-100 p-2 text-4xl text-success transition-all duration-300 hover:scale-110 hover:border-success" />
        </div>
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
              className=" w-full border-none text-center dark:bg-transparent"
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
            onClick={() => handleCart(latestItem, count)}
            className="btn-secondary btn w-full rounded-full text-base-100"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
