"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";
import type {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "../../../components/ui/chart";
import { TrendingDown, TrendingUp } from "lucide-react";
import { FaFaceSmile } from "react-icons/fa6";

const chartData = [
  { time: "00:00", retention: 35, churn: 60 },
  { time: "02:00", retention: 50, churn: 45 },
  { time: "04:00", retention: 30, churn: 65 },
  { time: "06:00", retention: 55, churn: 40 },
  { time: "08:00", retention: 70, churn: 50 },
  { time: "10:00", retention: 45, churn: 75 },
  { time: "12:00", retention: 60, churn: 35 },
  { time: "14:00", retention: 25, churn: 55 },
  { time: "16:00", retention: 65, churn: 30 },
  { time: "18:00", retention: 40, churn: 70 },
  { time: "20:00", retention: 75, churn: 50 },
  { time: "22:00", retention: 50, churn: 80 },
];

const chartConfig = {
  retentionrate: {
    label: "Retention",
    color: "#50B800",
  },
  churnrate: {
    label: "Churn",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded shadow p-2">
        <p className="text-sm font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-md" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function CustomerRetention() {
  return (
    <div className="w-full max-w-full overflow-hidden">
      {/* Title and time range button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
        <h1 className="text-black font-semibold text-lg">
          Customer Retention & Churn Rate
        </h1>
        <button className="rounded-lg px-4 py-1 bg-blue-500 text-white text-md w-full sm:w-auto">
          Weekly
        </button>
      </div>

      {/* Metrics Section - Responsive Wrap */}
      <div className="flex flex-wrap justify-between gap-4 mb-4">
        {/* Retention Rate */}
        <div className="flex flex-wrap items-center gap-4 bg-green-50 p-4 rounded-xl flex-grow min-w-[280px]">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 rounded-lg p-2">
              <FaFaceSmile className="text-white text-lg" />
            </div>
            <h1 className="text-black font-semibold text-md">Retention Rate</h1>
          </div>
          <h1 className="text-3xl font-bold text-black">128</h1>
          <span className="flex bg-green-100 text-green-600 text-sm rounded-full px-2 py-0.5 items-center gap-1">
            <TrendingUp className="text-green-600 text-sm" />
            78%
          </span>
          <p className="text-gray-400 text-sm whitespace-nowrap w-full sm:w-auto">
            Compared to Yesterday
          </p>
        </div>

        {/* Churn Rate */}
        <div className="flex flex-wrap items-center gap-4 bg-red-50 p-4 rounded-xl flex-grow min-w-[280px]">
          <div className="flex items-center gap-4">
            <div className="bg-red-500 rounded-lg p-2">
              <FaFaceSmile className="text-white text-lg" />
            </div>
            <h1 className="text-black font-semibold text-md">Churn Rate</h1>
          </div>
          <h1 className="text-3xl font-bold text-black">18</h1>
          <span className="flex bg-red-100 text-pink-600 text-sm rounded-full px-2 py-0.5 items-center gap-1">
            <TrendingDown className="text-red-600 text-sm" />
            17%
          </span>
          <p className="text-gray-400 text-sm whitespace-nowrap w-full sm:w-auto">
            Compared to Yesterday
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <ChartContainer
        config={chartConfig}
        className="w-full max-w-full overflow-x-auto h-[300px]"
      >
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            ticks={[
              "00:00",
              "02:00",
              "04:00",
              "06:00",
              "08:00",
              "10:00",
              "12:00",
              "14:00",
              "16:00",
              "18:00",
              "20:00",
              "22:00",
            ]}
          />
          <YAxis
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip cursor={false} content={<CustomTooltip />} />
          <Line
            dataKey="retention"
            type="monotone"
            stroke="#50B800"
            strokeWidth={3}
            strokeDasharray="7 5"
            dot={false}
          />
          <Line
            dataKey="churn"
            type="monotone"
            stroke="var(--color-churnrate)"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
