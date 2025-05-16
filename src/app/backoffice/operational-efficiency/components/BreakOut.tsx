"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const data = [
  {
    name: "Jan",
    Mpesa: 50_000,
    Till: 300_000,
    Paybill: 250_000,
    Bank: 150_000,
    Card: 400_000,
  },
  {
    name: "Feb",
    Mpesa: 200_000,
    Till: 180_000,
    Paybill: 270_000,
    Bank: 220_000,
    Card: 100_000,
  },
  {
    name: "Mar",
    Mpesa: 300_000,
    Till: 350_000,
    Paybill: 200_000,
    Bank: 400_000,
    Card: 250_000,
  },
  {
    name: "Apr",
    Mpesa: 100_000,
    Till: 250_000,
    Paybill: 300_000,
    Bank: 290_000,
    Card: 80_000,
  },
  {
    name: "May",
    Mpesa: 350_000,
    Till: 150_000,
    Paybill: 200_000,
    Bank: 370_000,
    Card: 120_000,
  },
  {
    name: "Jun",
    Mpesa: 180_000,
    Till: 300_000,
    Paybill: 280_000,
    Bank: 220_000,
    Card: 500_000,
  },
  {
    name: "Jul",
    Mpesa: 50_000,
    Till: 300_000,
    Paybill: 250_000,
    Bank: 150_000,
    Card: 400_000,
  },
  {
    name: "Aug",
    Mpesa: 200_000,
    Till: 180_000,
    Paybill: 270_000,
    Bank: 220_000,
    Card: 100_000,
  },
  {
    name: "Sep",
    Mpesa: 300_000,
    Till: 350_000,
    Paybill: 200_000,
    Bank: 400_000,
    Card: 250_000,
  },
  {
    name: "Oct",
    Mpesa: 100_000,
    Till: 250_000,
    Paybill: 300_000,
    Bank: 290_000,
    Card: 80_000,
  },
  {
    name: "Nov",
    Mpesa: 350_000,
    Till: 150_000,
    Paybill: 200_000,
    Bank: 370_000,
    Card: 120_000,
  },
  {
    name: "Dec",
    Mpesa: 180_000,
    Till: 300_000,
    Paybill: 280_000,
    Bank: 220_000,
    Card: 500_000,
  },
];

const COLORS = {
  Mpesa: "#689DFF", // blue
  Till: "#c084fc", // purple-lavender
  Paybill: "#60a5fa", // light blue
  Bank: "#9333ea", // deep purple
  Card: "#E0C6FD", // light purple
};

export function Breakout() {
  return (
    <div className="w-full bg-white rounded-xl p-4 border-0">
      {/* Header Section */}
      <div className="flex flex-col gap-6 px-4 md:px-8">
        <h1 className="text-xl md:text-2xl font-semibold text-black">
          Breakdown by Payout Methods
        </h1>

        {/* Empty space to balance the layout (replacing metrics) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-700 -mb-6">
          {[1, 2, 3, 4].map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="h-8"></div> {/* Empty space */}
            </div>
          ))}
        </div>

        {/* Chart Legend & Filter */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-xs">
            {Object.entries(COLORS).map(([key, color]) => (
              <div key={key} className="flex items-center gap-2 font-medium">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                ></span>
                {key}
              </div>
            ))}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg">
                Yearly <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">Monthly</PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Chart */}
      <CardContent className="mt-4 h-[360px] px-4 md:px-8 ">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
              formatter={(value: number) => value.toLocaleString()}
            />
            <Bar
              dataKey="Mpesa"
              fill={COLORS.Mpesa}
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
            <Bar
              dataKey="Till"
              fill={COLORS.Till}
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
            <Bar
              dataKey="Paybill"
              fill={COLORS.Paybill}
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
            <Bar
              dataKey="Bank"
              fill={COLORS.Bank}
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
            <Bar
              dataKey="Card"
              fill={COLORS.Card}
              radius={[4, 4, 0, 0]}
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </div>
  );
}
