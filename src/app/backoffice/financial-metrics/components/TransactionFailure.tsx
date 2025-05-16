"use client";

import { useEffect, useState } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define JSON data inline
const customerData = [
  {
    active: 100,
    inactive: 50,
    highNetWorth: 6,
    dormant: 17,
    totalCustomers: 189,
  },
];

// Chart config for customer categories
const chartConfig = {
  active: {
    label: "Insufficient Funds",
    color: "#4F46E5", // Indigo
  },
  inactive: {
    label: "Card Decline",
    color: "#06B6D4", // Cyan
  },
  highNetWorth: {
    label: "Suspected Fraud",
    color: "#EF4444", // Red
  },
  dormant: {
    label: "System Error",
    color: "#9333EA", // Purple
  },
} satisfies ChartConfig;

const TransactionFailure = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = customerData[0].totalCustomers;

  const legendData = [
    {
      label: chartConfig.active.label,
      value: customerData[0].active,
      percentage: Math.round((customerData[0].active / total) * 100),
      color: chartConfig.active.color,
    },
    {
      label: chartConfig.inactive.label,
      value: customerData[0].inactive,
      percentage: Math.round((customerData[0].inactive / total) * 100),
      color: chartConfig.inactive.color,
    },
    {
      label: chartConfig.highNetWorth.label,
      value: customerData[0].highNetWorth,
      percentage: Math.round((customerData[0].highNetWorth / total) * 100),
      color: chartConfig.highNetWorth.color,
    },
    {
      label: chartConfig.dormant.label,
      value: customerData[0].dormant,
      percentage: Math.round((customerData[0].dormant / total) * 100),
      color: chartConfig.dormant.color,
    },
  ];

  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black font-semibold text-lg">
          Reasons for Transaction Failure
        </h1>
        <button className="rounded-md px-4 py-1 bg-blue-500 text-white text-sm">
          Weekly
        </button>
      </div>

      <div className="flex flex-col items-center">
        {/* Chart */}
        <ChartContainer
          config={chartConfig}
          style={{ width: 300, height: 300 }}
        >
          <RadialBarChart
            data={customerData}
            endAngle={360}
            innerRadius={100}
            outerRadius={150}
            width={300}
            height={300}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-extrabold"
                        >
                          {total}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 8}
                          className="fill-muted-foreground font-medium"
                        >
                          Total Cases
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>

            {/* Bars */}
            <RadialBar
              dataKey="active"
              stackId="a"
              cornerRadius={10}
              fill={chartConfig.active.color}
            />
            <RadialBar
              dataKey="inactive"
              stackId="a"
              cornerRadius={10}
              fill={chartConfig.inactive.color}
            />
            <RadialBar
              dataKey="highNetWorth"
              stackId="a"
              cornerRadius={10}
              fill={chartConfig.highNetWorth.color}
            />
            <RadialBar
              dataKey="dormant"
              stackId="a"
              cornerRadius={10}
              fill={chartConfig.dormant.color}
            />
          </RadialBarChart>
        </ChartContainer>

        {/* Bottom Section with lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12 mt-6 w-full px-6">
          {legendData.map((item, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700">{item.label}</span>
                <span className="text-sm text-gray-600">
                  {String(item.value).padStart(2, "0")} Cases ・{" "}
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionFailure;
