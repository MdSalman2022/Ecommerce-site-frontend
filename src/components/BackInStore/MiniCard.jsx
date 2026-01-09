import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { MdStars } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FiHeart, FiCloudLightning } from "react-icons/fi";
import { MdOutlineCompareArrows } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

function MiniCard({ item }) {
  const [count, setCount] = useState(0);
  const { scrolltop } = useContext(AuthContext);

  const handleChange = (e) => {
    const newCount = Number(e.target.value);
    if (newCount <= 10) {
      setCount(newCount);
    }
  };

  return (
    <div className="card-compact group card relative ml-1 h-[500px] border bg-base-100 shadow-blue-50 dark:shadow-none">
      <figure>
        <LazyLoadImage
          className="object-cover p-2 transition-all duration-300 group-hover:scale-110 "
          src={item?.image}
          alt={item?.cat}
        />
      </figure>
      <div className="card-body dark:rounded-b-2xl dark:bg-gray-200">
        <h2 className="card-title justify-between text-sm">
          <Link
            preventScrollReset={false}
            onClick={scrolltop}
            className="transition-all hover:text-primary"
            to={`/productDetails/${item?._id}/${encodeURIComponent(
              item?.name
            ).replace(/%20/g, "-")}`}
          >
            {item?.name}
          </Link>
          {/* {item?.name} */}
          <div className="badge border-none bg-transparent text-3xl text-yellow-400">
            <MdStars />
          </div>
        </h2>
        <span className="flex gap-2 font-semibold text-yellow-300">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </span>
        <span className="text-xl font-semibold">${item?.price}</span>
        <div className="absolute top-5 right-4 flex w-10 flex-col gap-3">
          <FiHeart className="rounded-full border bg-base-100 p-2 text-4xl text-error transition-all duration-300 hover:scale-110 hover:border-error" />
          <MdOutlineCompareArrows className="rounded-full border bg-base-100 p-2 text-4xl text-success transition-all duration-300 hover:scale-110 hover:border-success" />
        </div>
        <div className="absolute bottom-4">
          <div className="card-actions flex-col gap-3">
            <div className="flex w-full flex-col items-center justify-center gap-3">
              <div className="flex">
                <button
                  className="btn-secondary btn h-5 w-12 rounded-full text-xl"
                  onClick={() => setCount(count - 1)}
                  disabled={count === 0}
                >
                  <FaMinus className="text-base-100" />
                </button>
                <input
                  type="number"
                  className=" border-none text-center dark:bg-transparent"
                  value={count}
                  onChange={handleChange}
                />
                <button
                  className={`btn-secondary btn h-8 w-12 rounded-full border-none text-xl text-neutral${
                    count === 10 ? " bg-[#e5e7eb] hover:bg-[#e5e7eb] " : ""
                  }`}
                  onClick={() => setCount(count + 1)}
                  disabled={count === 10}
                >
                  <FaPlus className="text-base-100" />
                </button>
              </div>
              <button className="btn-secondary btn w-full rounded-full text-base-100 md:w-48 lg:w-72">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniCard;
