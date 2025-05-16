"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { CardContent } from "../../../../components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../components/ui/chart";
import { TrendingDown, TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", resolved: 186, open: 80 },
  { month: "February", resolved: 305, open: 200 },
  { month: "March", resolved: 237, open: 120 },
  { month: "April", resolved: 73, open: 190 },
  { month: "May", resolved: 209, open: 130 },
  { month: "June", resolved: 214, open: 140 },
];

const chartConfig = {
  resolved: {
    label: "resolved",
    color: "hsl(var(--chart-1))",
  },
  open: {
    label: "open",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function OpenvsResolved() {
  return (
    <div className="w-full h-[420px]">
      <div className="flex justify-between items-center gap-12 mb-4">
        <h1 className="text-black font-semibold text-lg">
          Open vs Resolved Tickets
        </h1>
        <button className="rounded-lg px-4 py-1 bg-blue-500 text-white text-md">
          Weekly
        </button>
      </div>

      <div className="flex justify-start gap-8 items-center mb-4">
        <div className="flex justify-start gap-4 items-center">
          <div className="flex justify-start gap-4 items-center p-2 rounded-xl">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            <h1 className="text-black font-light text-sm">Resolved Tickets</h1>
          </div>
          <h1 className="text-md font-bold text-black">128</h1>
          <span className="flex bg-blue-100 text-blue-600 text-xs rounded-full px-1 py-0.5 items-center gap-1">
            <TrendingUp className="text-blue-600 text-sm" />
            78%
          </span>
          <p className="text-gray-400 text-sm">Compared to Last Week</p>
        </div>

        <div className="flex justify-start gap-4 items-center">
          <div className="flex justify-start gap-4 items-center p-2 rounded-xl">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <h1 className="text-black font-light text-sm">Open Tickets</h1>
          </div>
          <h1 className="text-md font-bold text-black">18</h1>
          <span className="flex bg-yellow-100 text-yellow-600 text-xs rounded-full px-1 py-0.5 items-center gap-1">
            <TrendingDown className="text-yellow-600 text-sm" />
            17%
          </span>
          <p className="text-gray-400 text-sm">Compared to Last Week</p>
        </div>
      </div>

      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="w-full h-[340px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <YAxis tickLine={false} axisLine={false} tickMargin={10} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />

            <Bar dataKey="resolved" fill="#3b82f6" radius={4} barSize={20} />
            <Bar dataKey="open" fill="#facc15" radius={4} barSize={20} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
