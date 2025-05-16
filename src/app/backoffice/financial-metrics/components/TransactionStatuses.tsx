"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingDown, TrendingUp, ChevronDown } from "lucide-react";

const channelData = {
  MPESA: [
    { day: "Sun", successful: 186, failed: 80 },
    { day: "Mon", successful: 305, failed: 200 },
    { day: "Tue", successful: 237, failed: 120 },
    { day: "Wed", successful: 73, failed: 190 },
    { day: "Thur", successful: 209, failed: 130 },
    { day: "Fri", successful: 214, failed: 140 },
    { day: "Sat", successful: 210, failed: 180 },
  ],
  Paybill: [
    { day: "Sun", successful: 120, failed: 40 },
    { day: "Mon", successful: 180, failed: 60 },
    { day: "Tue", successful: 150, failed: 50 },
    { day: "Wed", successful: 90, failed: 30 },
    { day: "Thur", successful: 160, failed: 70 },
    { day: "Fri", successful: 140, failed: 45 },
    { day: "Sat", successful: 210, failed: 180 },
  ],
  Till: [
    { day: "Sun", successful: 80, failed: 30 },
    { day: "Mon", successful: 110, failed: 40 },
    { day: "Tue", successful: 95, failed: 35 },
    { day: "Wed", successful: 60, failed: 25 },
    { day: "Thur", successful: 105, failed: 45 },
    { day: "Fri", successful: 90, failed: 30 },
    { day: "Sat", successful: 210, failed: 180 },
  ],
  Bank: [
    { day: "Sun", successful: 50, failed: 20 },
    { day: "Mon", successful: 70, failed: 25 },
    { day: "Tue", successful: 60, failed: 22 },
    { day: "Wed", successful: 40, failed: 15 },
    { day: "Thur", successful: 65, failed: 28 },
    { day: "Fri", successful: 55, failed: 20 },
    { day: "Sat", successful: 210, failed: 180 },
  ],
  Card: [
    { day: "Sun", successful: 40, failed: 15 },
    { day: "Mon", successful: 55, failed: 20 },
    { day: "Tue", successful: 45, failed: 18 },
    { day: "Wed", successful: 30, failed: 12 },
    { day: "Thur", successful: 50, failed: 22 },
    { day: "Fri", successful: 42, failed: 15 },
    { day: "Sat", successful: 210, failed: 180 },
  ],
};

const chartConfig = {
  successful: {
    label: "successful",
    color: "hsl(var(--chart-1))",
  },
  failed: {
    label: "failed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function TransactionStatuses() {
  const [selectedChannel, setSelectedChannel] = useState("MPESA");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const chartData = channelData[selectedChannel as keyof typeof channelData];

  return (
    <div className="w-full max-w-full px-4 py-4 bg-white rounded-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <h1 className="text-black font-semibold text-base sm:text-lg">
          Successful vs. Failed Transactions
        </h1>
        <div className="flex gap-2">
          {/* Channel Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 border bg-white px-3 py-1 rounded-md text-sm hover:bg-gray-50"
            >
              <span>{selectedChannel}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-white border rounded-md shadow-lg z-10">
                {Object.keys(channelData).map((channel) => (
                  <button
                    key={channel}
                    onClick={() => {
                      setSelectedChannel(channel);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      selectedChannel === channel ? "bg-gray-100" : ""
                    }`}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="rounded-md px-3 py-1 bg-blue-500 text-white text-sm">
            Weekly
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-col sm:flex-row justify-start sm:items-center gap-4 sm:gap-8 mb-4">
        {/* Successful */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-600 rounded-full" />
          <div className="text-sm text-black font-medium">2,128</div>
          <span className="flex bg-red-100 text-red-600 text-xs font-medium rounded-full px-2 py-0.5 items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            16%
          </span>
          <span className="text-gray-400 text-xs">Compared to Last Week</span>
        </div>

        {/* Failed */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-600 rounded-full" />
          <div className="text-sm text-black font-medium">19</div>
          <span className="flex bg-green-100 text-green-600 text-xs font-medium rounded-full px-2 py-0.5 items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            56%
          </span>
          <span className="text-gray-400 text-xs">Compared to Last Week</span>
        </div>
      </div>

      {/* Scrollable Chart */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <CardContent className="pb-0">
            <ChartContainer config={chartConfig} className="w-full h-[300px]">
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="successful"
                  fill="#3b82f6"
                  radius={4}
                  barSize={24}
                />
                <Bar dataKey="failed" fill="#ef4444" radius={4} barSize={24} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
