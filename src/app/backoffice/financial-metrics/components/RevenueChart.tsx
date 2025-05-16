"use client";

import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { TrendingUp } from "lucide-react";
import type { TooltipProps } from "recharts";

const chartData = [
  { month: "JAN", revenue: 18000, customers: 1000 },
  { month: "FEB", revenue: 22000, customers: 1100 },
  { month: "MAR", revenue: 16000, customers: 900 },
  { month: "APR", revenue: 24000, customers: 1200 },
  { month: "MAY", revenue: 32000, customers: 1300 },
  { month: "JUN", revenue: 28000, customers: 1250 },
  { month: "JUL", revenue: 35000, customers: 1350 },
  { month: "AUG", revenue: 32348, customers: 1200 },
  { month: "SEP", revenue: 29000, customers: 1100 },
  { month: "OCT", revenue: 27000, customers: 1050 },
  { month: "NOV", revenue: 25000, customers: 950 },
  { month: "DEC", revenue: 39000, customers: 1400 },
];

const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const revenue = payload[0].value;
    const customers = payload[0].payload.customers;
    return (
      <div className="bg-purple-700 text-white px-3 py-2 rounded-xl shadow">
        <p className="text-sm">{customers.toLocaleString()} customers</p>
        <p className="text-base font-semibold">£{revenue?.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-xl border-0">
      {/* Header */}
      <div className="relative mb-4 md:flex md:justify-between md:items-center">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-black">
            Revenue from Exchange Rate Markup
          </h2>
          <p className="text-sm text-gray-600 font-medium mt-0.5">Year 2024</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">Total Markup:</span>
              <span className="text-blue-700 font-semibold">£190,562.39</span>
              <span className="flex items-center gap-1 text-green-600 font-semibold bg-green-100 px-1.5 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" />
                27%
              </span>
              <span className="text-gray-400 text-xs">Vs Last Year</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500">No. of Customers:</span>
              <span className="text-blue-700 font-semibold">10,412</span>
              <span className="flex items-center gap-1 text-green-600 font-semibold bg-green-100 px-1.5 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" />
                27%
              </span>
              <span className="text-gray-400 text-xs">Vs Last Year</span>
            </div>
          </div>
        </div>

        <button className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm mt-5 md:mt-0 absolute md:static top-0 right-0">
          Yearly
        </button>
      </div>

      {/* Scrollable Chart */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7E22CE" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7E22CE" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 14 }}
              />
              <YAxis
                orientation="right"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 14 }}
                tickFormatter={(value) => `${value / 1000}k`}
                domain={[0, 50000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#7E22CE"
                strokeWidth={3}
                fill="url(#colorRevenue)"
                activeDot={{ r: 6, strokeWidth: 2, stroke: "#7E22CE" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
