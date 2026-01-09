import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext, useEffect } from "react";
import { AiFillCreditCard } from "react-icons/ai";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import CheckoutForm from "../CheckoutPage/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIP_PK);
import { useState } from "react";
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";

function OrderConfirm() {
  const {
    cart,
    subTotal,
    setSubPrice,
    paymentDetails,
    setCart,
    setPaymentDetails,
    user,
    allUsers,
  } = useContext(AuthContext);

  useEffect(() => {
    let price = 0;
    cart.forEach((item) => {
      price += item.totalPrice;
    });
    setSubPrice(price + 10);
  }, [cart]);

  const [orderPlaced, setOrderPlaced] = useState(false);

  let userInfo = allUsers.find((u) => u.email === user?.email);

  console.log(userInfo);
  const handleOrder = () => {
    const orderData = {
      name: userInfo.name,
      address: userInfo.address,
      contact: userInfo.contact,
      city: userInfo.city,
      email: user.email,
      transactionId: paymentDetails.id ? paymentDetails.id : "Cash on Delivery",
      amount: paymentDetails.amount ? paymentDetails.amount : subTotal * 100,
      items: cart,
      date: new Date().toDateString(),
      orderStatus: true,
      shipment: "picked",
    };

    fetch(`${import.meta.env.VITE_SERVER_URL}/orderhistory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to post order");
        }
        setOrderPlaced(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error as appropriate (e.g. show an error message to the user)
      });
  };

  useEffect(() => {
    if (orderPlaced) {
      setCart([]);
      setPaymentDetails({});
    }
  }, [orderPlaced]);

  const [active, setActive] = useState("");

  console.log(active);

  return (
    <div className="px-4 md:px-0">
      {orderPlaced ? (
        <div className="flex h-96 flex-col items-center justify-center ">
          <AiFillCreditCard className="mb-5 text-5xl text-primary" />
          <h1 className="mb-5 text-2xl font-semibold">Order Placed</h1>
          <p className="mb-5 text-center text-lg text-gray-500">
            Thank you for shopping with us. Your order will be delivered in 3-5
            business days.
          </p>
          <Link to="/" className="btn-secondary btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="container mx-auto h-screen py-10">
          <div className="grid gap-10 py-5 md:grid-cols-4">
            <div className="col-span-1 space-y-10 rounded-xl border p-5">
              <h2 className="text-4xl font-bold">Payment Method</h2>
              <div className="grid grid-cols-2 gap-5">
                <div
                  onClick={() => setActive("card")}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`flex w-full items-center justify-center gap-3  rounded-lg border-2 bg-white hover:border-primary ${
                      active === "card" ? "border-primary" : "border-neutral"
                    } relative`}
                  >
                    {active === "card" && (
                      <TiTick className="absolute top-1 right-1 rounded-full bg-primary text-2xl text-white" />
                    )}
                    <img
                      className=""
                      src="https://i.ibb.co/PxH0KQw/creditcard.webp"
                      width={100}
                      height={100}
                      alt=""
                    />
                  </div>
                  <p className="text-sm font-semibold">Pay with Credit Card</p>
                </div>
                <div
                  onClick={() => setActive("delivery")}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`flex w-full items-center justify-center gap-3 rounded-lg border-2 bg-white hover:border-primary ${
                      active === "delivery"
                        ? "border-primary"
                        : "border-neutral"
                    } relative`}
                  >
                    {active === "delivery" && (
                      <TiTick className="absolute top-1 right-1 rounded-full bg-primary text-2xl text-white" />
                    )}
                    <img
                      className=""
                      src="https://i.ibb.co/PxH0KQw/creditcard.webp"
                      width={100}
                      height={100}
                      alt=""
                    />
                  </div>
                  <p className="text-sm font-semibold">Cash On Delivery</p>
                </div>
              </div>
              {active === "card" && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm subTotal={subTotal} />
                </Elements>
              )}

              {paymentDetails.id && (
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-semibold text-success ">Paid</p>
                  <p className="text-lg font-semibold">Payment Details</p>
                  <p className="text-sm font-bold text-secondary">
                    Transaction id:{" "}
                    <span className="font-normal text-neutral">
                      {paymentDetails.id}
                    </span>
                  </p>
                  <p className="text-sm font-bold text-secondary">
                    Amount:{" "}
                    <span className="font-normal text-neutral">
                      ${paymentDetails.amount / 100}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="col-span-3 space-y-10 rounded-xl border bg-base-100 p-5">
              <h2 className="text-4xl font-bold">Order Summary</h2>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>${item.totalPrice}</td>
                      </tr>
                    ))}
                    <tr>
                      <th></th>
                      <td></td>
                      <td>Sub Total:</td>
                      <td className="font-bold text-secondary">
                        ${subTotal - 10}
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <td></td>
                      <td>Home Delivery:</td>
                      <td className="font-bold text-secondary">$10</td>
                    </tr>
                    <tr>
                      <th></th>
                      <td></td>
                      <td>Total</td>
                      <td className="font-bold text-secondary">${subTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <hr />
            <div className="flex justify-end">
              <button
                onClick={handleOrder}
                className="btn-secondary btn"
                disabled={
                  active === "card"
                    ? paymentDetails.id
                      ? false
                      : true
                    : active === "delivery"
                    ? false
                    : true
                }
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderConfirm;
