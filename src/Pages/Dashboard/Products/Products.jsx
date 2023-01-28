import React from "react";
import { WiMoonFull } from "react-icons/wi";
import { FaBars, FaAngleDown } from "react-icons/fa";
import { BiShow } from "react-icons/bi";
import { FiCopy, FiShare2 } from "react-icons/fi";
import { SlOptionsVertical } from "react-icons/sl";

const Products = () => {
  return (
    <div>
      <div className="flex justify-between p-5">
        <input
          type="text"
          className="m-1 h-12 w-96 rounded-lg p-2"
          placeholder="Order ID, phone or a name..."
        />
        <div className="flex items-center gap-3">
          <FaBars className="bg-[#ccc] p-2 text-4xl" />
          <button className="primary-btn">
            Add new product &nbsp; <FaAngleDown />
          </button>
        </div>
      </div>
      <div className="p-5">
        <div className="overflow-x-auto rounded-xl bg-white px-3  pt-3">
          <div className="mb-3 flex justify-end">
            <div className="flex gap-3">
              <div className="btn border-none bg-[#e1e2e4] text-black">
                Sort
              </div>
              <div className="btn border-none bg-[#e1e2e4] text-black">
                Filter
              </div>
            </div>
          </div>
          <table className="table w-full">
            <thead>
              <tr className="">
                <th className="w-[900px]">Product</th>
                <th className="w-32">Price</th>
                <th className="w-40">Inventory</th>
                <th className="w-60">Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <div className="flex items-center gap-5 p-2">
                  <img
                    src="https://i.ibb.co/hm20gWJ/9ce87c94-2d34-4eec-9416-d5bf6d823fce.jpg"
                    alt="9ce87c94-2d34-4eec-9416-d5bf6d823fce"
                    border="0"
                    className="w-10 border"
                  />
                  <div className="flex flex-col">
                    <p>Demo Product</p>
                    <p>Demo</p>
                  </div>
                </div>
                <td>$99</td>
                <td></td>
                <td className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="toggle-primary toggle"
                    checked
                  />{" "}
                  <span className="text-green-500">In Stock</span>
                </td>
                <td>
                  <div className="flex gap-5 text-xl">
                    <BiShow />
                    <FiCopy />
                    <FiShare2 />
                    <SlOptionsVertical />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
