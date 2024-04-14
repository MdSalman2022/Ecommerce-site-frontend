import React, { useContext, useEffect, useRef, useState } from "react";

import { MdMobileFriendly } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FiCloudLightning } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import { Link } from "react-router-dom";

const HotProduct = () => {
  const { products, scrolltop } = useContext(AuthContext);

  const productId = "63f8bc4830527aba1c293a20";
  const item = products.find((item) => item._id === productId);

  const [countdown, setCountdown] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { days, hours, minutes, seconds } = countdown;

  const startCountdown = () => {
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14); // set the target date to 15 days from now
    targetDate.setHours(23, 59, 59, 999); // set the time to end of the day

    const x = setInterval(function () {
      const now = new Date().getTime();
      const distance = targetDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setCountdown({ days, hours, minutes, seconds });
      if (distance < 0) {
        clearInterval(x);
        targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 15); // reset the target date to 15 days from now
        targetDate.setHours(23, 59, 59, 999); // set the time to end of the day
      }
    }, 1000);
  };

  React.useEffect(() => {
    startCountdown();
  }, []);

  let range;

  if (days === 0) {
    range = "max-w-5xl via-yellow-600 to-red-600";
  } else if (days <= 2) {
    range = "max-w-4xl via-yellow-500 to-red-500";
  } else if (days <= 4) {
    range = "max-w-3xl via-yellow-500 to-red-400";
  } else if (days <= 6) {
    range = "max-w-2xl via-yellow-500 to-red-300";
  } else if (days <= 8) {
    range = "max-w-xl via-yellow-400 to-red-200";
  } else if (days <= 10) {
    range = "max-w-lg via-yellow-300 to-red-200";
  } else if (days <= 12) {
    range = "max-w-md via-yellow-300 to-red-200";
  } else if (days <= 16) {
    range = "max-w-sm via-yellow-300 to-red-200";
  } else {
    range = "max-w-xs via-yellow-300 to-red-200";
  }

  return (
    <div className="py-20">
      <div className="container mx-auto">
        <div className="flex h-full flex-col items-center gap-5 md:grid md:grid-cols-3 lg:grid-cols-5">
          {/* sidebar */}
          <div className="col-span-1 flex flex-col gap-2 dark:opacity-90">
            <div className=" flex h-72 w-full flex-col rounded-xl border bg-base-100 p-5">
              <p>Get the all new</p>
              <p className="text-xl font-bold text-primary">Intel I5 13600K</p>
              <LazyLoadImage
                src="https://i.ibb.co/QMjtYff/i5-13th.webp"
                alt="i5-13th"
                className="w-52"
              />
            </div>
            <div className=" flex h-56 w-full flex-col justify-center gap-5 rounded-xl border  bg-base-100 py-5 text-sm">
              <p className=" flex flex-nowrap items-center gap-5 px-2  ">
                <MdMobileFriendly className="text-2xl" /> Download our App to
                your Phone{" "}
              </p>
              <span className="border-b"></span>
              <p className=" flex flex-nowrap items-center gap-5 px-2  ">
                <MdMobileFriendly className="text-3xl " /> Order now so you dont
                miss the opportunities.
              </p>
              <span className="border-b"></span>
              <p className=" flex flex-nowrap items-center gap-5 px-2  ">
                <MdMobileFriendly className="text-3xl" /> Your order will arrive
                at your door in 2 hour.
              </p>
            </div>
          </div>

          {/* Hot product box  */}
          <div className="md:col-span-2 lg:col-span-4">
            <div className="pb-10 text-center dark:text-accent">
              <p className="text-center text-3xl font-bold">
                <span className="text-red-500">Hot</span> Product This Week
              </p>
              <p>
                Dont miss this opportunity at a special discount just for this
                week.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-10 rounded-lg  border border-primary p-5 md:h-96 md:flex-row md:p-10">
              <div className="group relative">
                <span className=" absolute -left-5 -top-2 z-50  flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-mono font-bold text-base-100 transition-all duration-300 group-hover:animate-pulse md:h-10 md:w-10  md:text-xl md:group-hover:-translate-y-10 lg:h-16 lg:w-16  lg:text-3xl">
                  30%
                </span>
                <LazyLoadImage
                  src={item.image}
                  alt="airpulse"
                  className="w-40 transition-all duration-300 group-hover:scale-125 md:w-96 lg:w-56 "
                />
              </div>
              <div className="z-50 flex w-full max-w-5xl flex-col gap-2">
                <p className="font-bold dark:text-accent md:text-2xl lg:text-3xl ">
                  ${item.price}{" "}
                  <span className="font-semibold text-red-500 line-through">
                    $1280.89
                  </span>
                </p>
                <Link
                  onClick={scrolltop}
                  to={`/productDetails/${item._id}/${encodeURIComponent(
                    item.name
                  ).replace(/%20/g, "-")}`}
                  className="mb-5 text-2xl font-bold transition-all duration-300 hover:text-primary dark:text-accent lg:text-4xl"
                >
                  {item.name}
                </Link>
                <p className="text-green-600">IN STOCK</p>
                <div className="relative">
                  <div className="absolute h-3 w-full rounded-full bg-gray-200 "></div>
                  <input
                    className={`absolute h-3 w-full rounded-full bg-gradient-to-r from-green-800  ${range} `}
                  ></input>
                </div>

                <div className="mt-5 flex auto-cols-max gap-5 text-center">
                  <div className="flex flex-col rounded-box bg-neutral p-2 text-base-100">
                    <span className="countdown font-mono text-2xl">
                      <span style={{ "--value": days }}></span>
                    </span>
                    days
                  </div>
                  <div className="flex flex-col rounded-box bg-neutral p-2 text-base-100">
                    <span className="countdown font-mono text-2xl">
                      <span style={{ "--value": hours }}></span>
                    </span>
                    hours
                  </div>
                  <div className="flex flex-col rounded-box bg-neutral p-2 text-base-100">
                    <span className="countdown font-mono text-2xl">
                      <span style={{ "--value": minutes }}></span>
                    </span>
                    min
                  </div>
                  <div className="flex flex-col rounded-box bg-neutral p-2 text-base-100">
                    <span className="countdown font-mono text-2xl">
                      <span style={{ "--value": seconds }}></span>
                    </span>
                    sec
                  </div>
                  <div className="flex items-center text-left dark:text-accent">
                    <p>
                      Remains until the end of <br /> the offer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="container mx-auto mt-20" />
    </div>
  );
};

export default HotProduct;
