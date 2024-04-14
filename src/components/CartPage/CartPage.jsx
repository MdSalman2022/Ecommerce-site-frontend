import React, { useContext, useEffect, useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import ProductTable from "./ProductTable/ProductTable";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PK);
import { FaAngleDown, FaAngleRight } from "react-icons/fa";

function CartPage() {
  const { cart, setCart, subTotal, setSubPrice, user, scrolltop } =
    useContext(AuthContext);

  useEffect(() => {
    let price = 0;
    cart.forEach((item) => {
      price += item.totalPrice;
    });
    setSubPrice(price);
  }, [cart]);

  if (cart.length > 0) {
    return (
      <div className="container mx-auto h-full py-5 px-4 md:py-20 md:px-0">
        <div className="grid gap-5 lg:grid-cols-4">
          <div className="col-span-4">
            <h1 className="mb-5 text-3xl font-semibold">Shopping Cart</h1>
            <div className="mb-5 grid grid-cols-4 gap-1 border-b-2 md:gap-5 lg:grid-cols-5">
              <div className="col-span-5 grid  h-12 grid-cols-5 place-items-center  rounded-lg bg-gray-100">
                <p className="">Items</p>
                <p className="">Quantity</p>
                <p className=" ">Unit Price</p>
                <p className="">Total Price</p>
                <p className=""></p>
              </div>
              {cart.map((item, index) => (
                <ProductTable
                  key={index}
                  item={item}
                  setSubPrice={setSubPrice}
                />
              ))}
            </div>
            <div className="grid grid-cols-5">
              <Link
                to="/"
                className="col-span-3 flex cursor-pointer items-center gap-3 text-primary"
              >
                <HiArrowNarrowLeft />{" "}
                <p className="font-bold">Continue Shopping</p>
              </Link>
              <span className="flex items-center gap-5">
                Subtotal: <p className="text-2xl font-bold">${subTotal}</p>
              </span>
              <Link
                onClick={scrolltop}
                to="/checkout"
                className="btn-secondary btn flex flex-nowrap items-center"
              >
                Checkout
                <FaAngleRight className="text-lg md:text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-full flex-col items-center justify-center py-10">
        <p className="col-span-4 flex justify-center py-10 text-3xl font-bold">
          Cart is empty
        </p>
        <Link to="/">
          <button className="btn-primary btn-outline btn ">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }
}

export default CartPage;
