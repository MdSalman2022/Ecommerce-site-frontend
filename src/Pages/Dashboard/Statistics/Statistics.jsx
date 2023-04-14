import React from "react";
import { FaArrowUp } from "react-icons/fa";
import AreaCharts from "../Dashboard/AreaCharts";
import BarCharts from "./BarCharts";
import PieCharts from "./PieCharts";
import RadarCharts from "./RadarCharts";

const Statistics = () => {
  return (
    <div className="pb-10">
      <h1 className="pb-5 text-3xl font-bold">Statistics</h1>
      <div className="grid grid-cols-2 gap-5">
        <div className="stats col-span-2 shadow">
          <div className="stat">
            <div className="stat-title">Total Revenue</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">$75000</div>
              <div className="stat-desc flex items-center text-success">
                <FaArrowUp /> 5% than last month
              </div>
            </div>

            <AreaCharts />
          </div>
        </div>
        <div className="stats col-span-1 shadow">
          <div className="stat flex">
            <div className="flex flex-col">
              <div className="stat-title">Total Site Traffic</div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold">12798</div>
                <div className="stat-desc flex justify-center text-success">
                  <FaArrowUp /> 10% than last month
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mt-2 flex flex-col justify-center gap-5">
                <span className="flex items-center gap-2">
                  <div className="badge badge-sm border-none bg-blue-500 p-2"></div>
                  Facebook
                </span>
                <span className="flex items-center gap-2">
                  <div className="badge badge-sm border-none bg-sky-400 p-2"></div>
                  Twiiter
                </span>
                <span className="flex items-center gap-2">
                  <div className="badge badge-sm border-none bg-[#FABB05] p-2"></div>
                  Google
                </span>
                <span className="flex items-center gap-2">
                  <div className="badge-error badge badge-sm"></div>Youtube
                </span>
              </div>
              <PieCharts />
            </div>
          </div>
        </div>
        <div className="stats col-span-1 shadow">
          <div className="stat">
            <div className="stat-title">Total Orders</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">850</div>
              <div className="stat-desc flex items-center text-success">
                <FaArrowUp /> 15% than last month
              </div>
            </div>
            <BarCharts />
          </div>
        </div>
        <div className="stats col-span-1 shadow">
          <div className="stat">
            <div className="stat-title">Total Orders</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-primary">850</div>
              <div className="stat-desc flex items-center text-success">
                <FaArrowUp /> 15% than last month
              </div>
            </div>
            {/* <RadarCharts /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
