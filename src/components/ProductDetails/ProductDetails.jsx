import React, { useContext, useRef } from "react";
import { TbDiscount2 } from "react-icons/tb";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import ProductCard from "../ProductCard/ProductCard";
import ProductReview from "./ProductReview";

function scrollToRef(ref) {
  window.scrollTo({ top: ref.current.offsetTop - 170, behavior: "smooth" });
}

function ProductDetails() {
  const [count, setCount] = useState(0);

  const [stars, setStars] = useState([]);
  const [reviewLength, setReviewLength] = useState(0);

  let { products, cart, setCart } = useContext(AuthContext);

  const handleChange = e => {
    const newCount = Number(e.target.value);
    if (newCount <= 10) {
      setCount(newCount);
    }
  };

  const item = useLoaderData();
  const {
    _id,
    name,
    cat,
    subcat,
    brand,
    image,
    spec,
    price,
    rating,
    featured,
    latest,
    bestseller,
    sells,
    special,
    discount,
  } = item;

  let specialprice;
  if (special) {
    specialprice = price - ((price * discount) / 100).toFixed(1);
  }

  let suggestion = products;

  suggestion = suggestion.filter(item => item.cat === cat && item._id !== _id);

  cart = JSON.parse(localStorage.getItem("cart")) || [];

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

  const handlePurchase = (data, count) => {
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

  const myRef = useRef(null);

  const executeScroll = () => scrollToRef(myRef);
  console.log(myRef);
  return (
    <div className="bg-base-100 pt-10 dark:bg-neutral">
      <div className="">
        <div className="container mx-auto flex flex-wrap px-3 md:flex-row">
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <Link>Home</Link>
              </li>
              <li>
                <Link>Component</Link>
              </li>
              <li>{name}</li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto grid h-full place-items-center  justify-items-center py-10 px-5 text-neutral dark:text-base-100 md:grid-cols-2 ">
          <LazyLoadImage src={image} alt={name} className="md:w-96" />
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-5 text-xl font-semibold capitalize">
              {brand}
              <div onClick={executeScroll} className="flex gap-2">
                <span className="flex items-center">{stars}</span>
                <span className="cursor-pointer text-sm text-primary hover:underline">
                  {reviewLength} Ratings
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold md:text-3xl lg:text-5xl">{name}</p>
            <div className="specs space-y-3">
              <p className="text-lg font-semibold ">Key Feature</p>
              <p>Model: {name} </p>
              {spec.map((item, index) => {
                return <p key={index}>{item}</p>;
              })}
              <p>Warrenty: 3 Years</p>
            </div>
            <p className="font-bold text-primary underline">View More Specs</p>

            <div className="flex items-center gap-2 pb-5">
              {special && (
                <span
                  className={`badge  flex items-center gap-1 border-none bg-green-200 py-3 text-lg font-bold text-green-700`}
                >
                  <TbDiscount2 /> {discount}%
                </span>
              )}
              <span
                className={`${
                  special ? "text-3xl line-through " : "text-5xl "
                }`}
              >
                ${price}
              </span>
              {special ? (
                <span className="text-5xl font-semibold ">${specialprice}</span>
              ) : (
                ""
              )}
            </div>
            <div className="flex w-full flex-col items-center gap-3">
              <div className="flex">
                <button
                  className="btn-primary btn h-5 w-12 rounded-full text-xl"
                  onClick={() => setCount(count - 1)}
                  disabled={count === 0}
                >
                  <FaMinus className="text-base-100" />
                </button>
                <input
                  type="number"
                  className="w-60 border-none text-center"
                  value={count}
                  onChange={handleChange}
                />
                <button
                  className={`btn-primary btn h-8 w-12 rounded-full border-none text-xl text-neutral${
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
                className="btn-primary btn w-full rounded-full text-base-100"
              >
                Add to cart
              </button>
            </div>
            <Link
              to="/checkout"
              onClick={() => handlePurchase(item, count)}
              className="btn-outline btn-primary btn rounded-full border-2 hover:text-base-100"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <hr />
        <div className="container mx-auto mt-10" ref={myRef}>
          <ProductReview
            productId={_id}
            setStars={setStars}
            stars={stars}
            setReviewLength={setReviewLength}
            reviewLength={reviewLength}
          />
        </div>

        <div className="bg-base-100 px-2 py-10 dark:bg-neutral md:px-0">
          <h1 className="pb-5 text-center text-3xl font-bold text-neutral dark:text-base-100">
            Related Products
          </h1>
          <div className="container mx-auto grid gap-5 md:grid-cols-2 lg:grid-cols-4 ">
            {suggestion.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
