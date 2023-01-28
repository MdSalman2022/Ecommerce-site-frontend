import React from "react";
import { TbDiscount2 } from "react-icons/tb";
import { Link } from "react-router-dom";

const Discounts = () => {
  return (
    <div>
      <div className="flex h-96 flex-col items-center justify-center gap-5">
        <p>Get more sales with coupons</p>
        <label htmlFor="my-modal-3" className="btn-primary btn text-white">
          Create a coupon
        </label>

        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal ">
          <div className="modal-box relative w-[800px]">
            <label
              htmlFor="my-modal-3"
              className="btn-sm btn-circle btn absolute right-2 top-2 border-none bg-white text-xl text-black hover:bg-slate-200"
            >
              ✕
            </label>
            <h3 className="mb-5 px-2 text-xl font-bold">Select coupon type</h3>
            <div className="flex flex-col gap-2 ">
              <Link to="/dashboard/discounts/percentage">
                <div className="flex items-center gap-5 rounded-lg p-2 transition duration-300 hover:bg-slate-200">
                  <TbDiscount2 className="rounded-xl bg-orange-100 p-2 text-6xl text-orange-600" />
                  <div className="flex flex-col text-sm">
                    <p className="font-semibold">Percentage discount</p>
                    <p>Offer a percentage discounts to your customers</p>
                  </div>
                </div>
              </Link>

              <div className="flex items-center gap-5 rounded-lg p-2 transition duration-300 hover:bg-slate-200">
                <TbDiscount2 className="rounded-xl bg-green-100 p-2 text-6xl text-green-600" />
                <div className="flex flex-col text-sm">
                  <p className="font-semibold">Flat discount</p>
                  <p>Offer a fixed discount to your customer</p>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-lg p-2 transition duration-300 hover:bg-slate-200">
                <TbDiscount2 className="rounded-xl bg-purple-100 p-2 text-6xl text-purple-600" />
                <div className="flex flex-col text-sm">
                  <p className="font-semibold">Buy X Get Y Free</p>
                  <p>
                    Offer FREE products on purchase of certain number of items
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5 rounded-lg p-2 transition duration-300 hover:bg-slate-200">
                <TbDiscount2 className="rounded-xl bg-yellow-100 p-2 text-6xl text-yellow-600" />
                <div className="flex flex-col text-sm">
                  <p className="font-semibold">Free shipping</p>
                  <p>Offer free shipping to your customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discounts;
