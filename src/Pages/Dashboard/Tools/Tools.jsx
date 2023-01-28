import React from "react";
import { TbFileInvoice } from "react-icons/tb";

const Tools = () => {
  return (
    <div>
      <div className="p-5">
        <div className="grid grid-cols-5">
          <div className="flex h-36 flex-col border bg-white p-5 text-3xl">
            <TbFileInvoice />
            <p className="text-xl">Invoice Generator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
