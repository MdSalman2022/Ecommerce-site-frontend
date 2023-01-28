import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";

const Percentage = () => {
  const [coupon, setCoupon] = useState(false);
  const [couponValid, setCouponValid] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());

  return (
    <div>
      <div className="mx-auto flex justify-center p-5">
        <div className="h-10/12 w-[800px] space-y-5">
          <div className="flex flex-col justify-center bg-white p-5">
            <p className="font-semibold">Create coupon</p>
            <div className="grid grid-cols-2 ">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Coupon code </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="input-bordered input w-full max-w-xs"
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">User per customer </span>
                </label>
                <div className="dropdown-end dropdown">
                  <label
                    tabIndex={0}
                    className="btn m-1 border-gray-300 bg-transparent text-gray-600 hover:bg-transparent"
                  >
                    Select uses per customer
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
                  >
                    <li>
                      <a>Only Once</a>
                    </li>
                    <li>
                      <a>Custom</a>
                    </li>
                    <li>
                      <a>Unlimited</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 rounded-lg bg-white p-5">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Discount percentage </span>
              </label>
              <input
                type="text"
                placeholder="Enter percentage"
                className="input-bordered input w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Minimum order value </span>
              </label>
              <input
                type="text"
                placeholder="Enter amount"
                className="input-bordered input w-full max-w-xs"
              />
            </div>
            <div className="form-control mt-5 w-full max-w-xs">
              <label className="label">
                <span className="label-text">Maximum discount</span>
              </label>
              <input
                type="text"
                placeholder="Enter amount"
                className="input-bordered input w-full max-w-xs"
              />
            </div>

            <div className="form-control mt-5 w-full max-w-xs">
              <label className="label">
                <span className="label-text">Apply coupon on</span>
              </label>
              <div className="dropdown-end dropdown">
                <label
                  tabIndex={0}
                  className="btn m-1 flex w-full justify-between border-gray-300 bg-transparent text-gray-600 hover:bg-transparent "
                >
                  All products <FaAngleDown />{" "}
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box w-full bg-base-100 p-2 shadow"
                >
                  <li>
                    <a>Specific Products</a>
                  </li>
                  <li>
                    <a>Specific Categories</a>
                  </li>
                  <li className="text-primary">
                    <a>All Products</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`flex select-none flex-col gap-5 rounded-lg bg-white p-5 transition-all duration-300 ${
              coupon === true ? "h-48" : " h-14"
            }`}
          >
            <div
              onClick={() => setCoupon(!coupon)}
              className="flex items-start justify-between"
            >
              <p className="font-semibold">Coupon functionality</p>
              <FaAngleDown />
            </div>

            <div
              className={`flex flex-col gap-5 ${
                coupon === true ? "" : "hidden"
              }`}
            >
              <div className="flex items-start justify-between">
                <p className="">Show coupon to customer</p>
                <input type="checkbox" className="toggle-primary toggle" />
              </div>
              <div className="flex items-start justify-between">
                <p className="">Valid only for online payments</p>
                <input type="checkbox" className="toggle-primary toggle" />
              </div>
              <div className="flex items-start justify-between">
                <p className="">Valid only for new customers</p>
                <input type="checkbox" className="toggle-primary toggle" />
              </div>
            </div>
          </div>
          <div
            className={`flex select-none flex-col gap-5 rounded-lg bg-white p-5 transition-all duration-300 ${
              couponValid === true ? "h-72" : " h-14"
            }`}
          >
            <div
              onClick={() => setCouponValid(!couponValid)}
              className="flex items-start justify-between"
            >
              <p className="font-semibold">Coupon Validity</p>
              <FaAngleDown />
            </div>
            <div
              className={`grid grid-cols-2 gap-2 ${
                couponValid === true ? "" : "hidden"
              }`}
            >
              <p>From</p>
              <p>Time</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="col-span-1 h-12 w-full rounded-lg border p-2"
              />
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="col-span-1 h-12 w-full rounded-lg border p-2"
              />
              <p className="col-span-2 mt-2 flex items-center gap-3">
                <input type="checkbox" className="checkbox-primary checkbox " />{" "}
                Set an end date{" "}
              </p>
              <p>Till</p>
              <p>Time</p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="col-span-1 h-12 w-full rounded-lg border p-2"
              />
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="col-span-1 h-12 w-full rounded-lg border p-2"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="/dashboard/">
              <div className="btn-primary btn text-white">Create coupon</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Percentage;
