import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { WiMoonFull } from "react-icons/wi";

const Orders = () => {

  
  const [select, setSelect] = useState("all");


  return (
    <div>
      <div className="flex justify-between p-5">
        <input
          type="text"
          className="m-1 h-12 w-96 rounded-lg p-2"
          placeholder="Order ID, phone or a name..."
        />
        <div className="flex gap-3">
          <div className="btn-sm flex items-center bg-white text-black hover:text-primary">
            Change order status
          </div>
          <div className="btn-sm flex items-center bg-white text-black hover:text-primary">
            Columns
          </div>
          <div className="btn-sm flex items-center bg-white text-black hover:text-primary">
            Sort
          </div>
          <div className="btn-sm flex items-center bg-white text-black hover:text-primary">
            Filter
          </div>
          <div className="btn-sm flex items-center bg-white text-black hover:text-primary">
            Lifetime
          </div>
        </div>
      </div>
      <div className="flex justify-between p-5">
        <div className="flex gap-5">
          <div onClick={()=>setSelect('all')} className={`${select === 'all' ? 'badge-primary' : 'bg-gray-300 text-gray-800'} badge rounded-full border-none p-4 font-semibold cursor-pointer hover:bg-primary`}>
            All(1)
          </div>
          <div onClick={()=>setSelect('pending')} className={`${select === 'pending' ? 'badge-primary' : 'bg-gray-300 text-gray-800'} badge rounded-full border-none p-4 font-semibold cursor-pointer hover:bg-primary`}>
            Pending(1)
          </div>
          <div onClick={()=>setSelect('accepted')} className={`${select === 'accepted' ? 'badge-primary' : 'bg-gray-300 text-gray-800'} badge rounded-full border-none p-4 font-semibold cursor-pointer hover:bg-primary`}>
            Accepted
          </div>
          <div onClick={()=>setSelect('shipped')} className={`${select === 'shipped' ? 'badge-primary' : 'bg-gray-300 text-gray-800'} badge rounded-full border-none p-4 font-semibold cursor-pointer hover:bg-primary`}>
            Shipped
          </div>
          <div onClick={()=>setSelect('delivered')} className={`${select === 'delivered' ? 'badge-primary' : 'bg-gray-300 text-gray-800'} badge rounded-full border-none p-4 font-semibold cursor-pointer hover:bg-primary`}>
            Delivered
          </div>
          <div onClick={()=>setSelect('others')} className={`${select === 'others' ? 'badge-primary' : 'bg-gray-300 text-gray-800'} badge rounded-full border-none p-4 font-semibold cursor-pointer hover:bg-primary`}>
            Others
          </div>
        </div>
        <div className="flex gap-3">
          <div className="btn flex items-center border-none bg-white text-black hover:text-primary">
            <FaBars />
          </div>
          <div className="btn flex items-center border-none bg-white text-black hover:text-primary">
            <BsDownload />
          </div>
          <div className="primary-btn">Create order</div>
        </div>
      </div>
      <div className="p-5">
        <div className="overflow-x-auto rounded-xl bg-white  p-3">
          <table className="table w-full">
            <thead>
              <tr className="">
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>#6271471</th>
                <td>Yesterday, 11:55 PM</td>
                <td>demo</td>
                <td>1</td>
                <td>
                  <p className="flex w-10 justify-center rounded-md bg-[rgba(238,116,31,.15)] px-2  text-center font-semibold text-[#e50b20]">
                    COD
                  </p>
                </td>
                <td className="flex items-center">
                  <WiMoonFull className="text-[#fab73b]" /> Pending
                </td>
                <td>$99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
