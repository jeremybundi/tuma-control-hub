"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Label,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
 // ChartTooltip,
 // ChartTooltipContent,
} from "../../../../components/ui/chart";

// Define JSON data inline
const supportData = [
  {
    category: "issues",
    transactionDelays: 140,
    fraud: 30,
    failedOtps: 25,
    access: 55,
    totalIssues: 189,
  },
];

// Chart config for support issue types
const chartConfig = {
  transactionDelays: {
    label: "Transaction Delays",
    color: "#800080",
  },
  access: {
    label: "Account Access",
    color: "#50E3C2",
  },
  fraud: {
    label: "Fraud Reports",
    color: "#F5D76E",
  },
  failedOtps: {
    label: "Failed OTPs",
    color: "#F76C6C",
  },
} satisfies ChartConfig;

const SupportIssues = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Prepare legend data
  const legendData = [
    {
      label: chartConfig.transactionDelays.label,
      value: supportData[0].transactionDelays,
      color: chartConfig.transactionDelays.color,
    },
    {
      label: chartConfig.access.label,
      value: supportData[0].access,
      color: chartConfig.access.color,
    },
    {
      label: chartConfig.fraud.label,
      value: supportData[0].fraud,
      color: chartConfig.fraud.color,
    },
    {
      label: chartConfig.failedOtps.label,
      value: supportData[0].failedOtps,
      color: chartConfig.failedOtps.color,
    },
  ];

  // Chart dimensions
  const chartWidth = 800;
  const chartHeight = 300;

  const CustomTooltip = ({ active, payload }: TooltipProps<any, string>) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const percentage = ((value / supportData[0].totalIssues) * 100).toFixed(
        0
      );
      return (
        <div className="bg-white p-2 rounded shadow text-xs text-black">
          <p className="font-semibold">{name}</p>
          <p>
            {value} · {percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center gap-12">
        <h1 className="text-black font-semibold text-lg">
          Most Common Support Issues
        </h1>
        <button className="rounded-lg px-4 py-1 bg-blue-500 text-white text-md">
          Weekly
        </button>
      </div>

      <div className="flex flex-col items-center w-full p-0">
        {/* Chart Container */}
        <div style={{ width: chartWidth, height: chartHeight }}>
          <ChartContainer
            config={chartConfig}
            style={{ width: chartWidth, height: chartHeight }}
          >
            <RadialBarChart
              data={supportData}
              endAngle={360}
              innerRadius={100}
              outerRadius={180}
              width={chartWidth}
              height={chartHeight}
            >
              <Tooltip content={<CustomTooltip />} />

              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                            {supportData[0].totalIssues.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 8}
                            className="fill-muted-foreground font-medium"
                          >
                            Support Issues
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>

              <RadialBar
                dataKey="transactionDelays"
                stackId="a"
                cornerRadius={10}
                fill={chartConfig.transactionDelays.color}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="access"
                stackId="a"
                cornerRadius={10}
                fill={chartConfig.access.color}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="fraud"
                stackId="a"
                cornerRadius={10}
                fill={chartConfig.fraud.color}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="failedOtps"
                stackId="a"
                cornerRadius={10}
                fill={chartConfig.failedOtps.color}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          {legendData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">
                {item.label}: {item.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportIssues;
