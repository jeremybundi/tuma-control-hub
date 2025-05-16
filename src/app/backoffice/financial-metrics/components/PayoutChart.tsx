"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";

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
];

const COLORS = {
  Mpesa: "#ef4444", // red
  Till: "#c084fc", // purple-lavender
  Paybill: "#60a5fa", // light blue
  Bank: "#9333ea", // deep purple
  Card: "#facc15", // yellow
};

export function PayoutChart() {
  return (
    <div className="w-full bg-white rounded-xl p-4 border-0">
      {/* Header Section */}
      <div className="flex flex-col gap-3 px-4 md:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-semibold text-black">
            Payout Trends
          </h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-lg">
                Yearly <ChevronDown className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40">Monthly</PopoverContent>
          </Popover>
        </div>

        {/* Legend: responsive wrapping */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
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
      </div>

      {/* Scrollable chart container */}
      <div className="mt-4 overflow-x-auto">
        <div className="min-w-[640px] md:min-w-full">
          <CardContent className="h-[420px] px-4 md:px-8 pb-4">
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
                  barSize={6}
                />
                <Bar
                  dataKey="Till"
                  fill={COLORS.Till}
                  radius={[4, 4, 0, 0]}
                  barSize={6}
                />
                <Bar
                  dataKey="Paybill"
                  fill={COLORS.Paybill}
                  radius={[4, 4, 0, 0]}
                  barSize={6}
                />
                <Bar
                  dataKey="Bank"
                  fill={COLORS.Bank}
                  radius={[4, 4, 0, 0]}
                  barSize={6}
                />
                <Bar
                  dataKey="Card"
                  fill={COLORS.Card}
                  radius={[4, 4, 0, 0]}
                  barSize={6}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </div>
      </div>
    </div>
  );
}
