"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CardContent } from "../../../../components/ui/card";
import { ChevronDown } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

// Sample data similar to your screenshot
const chartData = [
  { date: "04/04/25", value: 42300, volume: 32700 },
  { date: "05/04/25", value: 39000, volume: 3700 },
  { date: "06/04/25", value: 43500, volume: 23500 },
  { date: "07/04/25", value: 39000, volume: 12500 },
  { date: "08/04/25", value: 20000, volume: 43500 },
  { date: "09/04/25", value: 18000, volume: 32700 },
  { date: "10/04/25", value: 21000, volume: 43500 },
];

export function TransactionVolume() {
  return (
    <div className="w-full bg-white rounded-xl p-4 border-0">
      {/* Header Section */}
      <div className="flex flex-col gap-6 px-4 md:px-8">
        <h1 className="text-xl md:text-2xl font-semibold text-black">
          Total Transaction Volume{" "}
          <span className="font-normal">(GBP & Local Currency)</span>
        </h1>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-700">
          {[
            {
              label: "Total Value",
              value: "£ 2,300,562.39",
              change: "27%",
              up: true,
              note: "VS Last Week",
            },
            {
              label: "Total Volume",
              value: "40,256",
              change: "78%",
              up: true,
              note: "VS Last Week",
            },
            {
              label: "UK to Kenya",
              value: "£ 1,098,307.39",
              change: "48%",
              up: true,
              note: "VS Week",
            },
            {
              label: "UK to Uganda",
              value: "£ 1,202,255.00",
              change: "04%",
              up: false,
              note: "VS Week",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-1">
              <p className="text-gray-500">{item.label}:</p>
              <p className="text-blue-700 font-semibold text-lg">
                {item.value}
              </p>
              <div className="flex items-center gap-1 text-xs">
                <span
                  className={`px-2 py-0.5 rounded-full flex items-center gap-1 font-medium ${
                    item.up
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.up ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {item.change}
                </span>
                <span className="text-gray-400">{item.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart Legend and Filter */}
        <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2 text-blue-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span> Value
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-600"></span> Volume
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg">
            Weekly <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Chart on Mobile */}
      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[640px] md:min-w-full">
          <CardContent className="h-[300px] px-4 md:px-8 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value / 1000}k`}
                  domain={[0, 50000]}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                  formatter={(value: number) => `${value.toLocaleString()}`}
                />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="volume"
                  fill="#22c55e"
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
