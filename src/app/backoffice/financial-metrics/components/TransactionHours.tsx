"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { cn } from "@/lib/utils";
import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

const chartData = [
  { hour: "12–2am", Mpesa: 7, Till: 3, Bank: 9, Card: 5, Paybill: 4 },
  { hour: "2–4am", Mpesa: 6, Till: 6, Bank: 6, Card: 3, Paybill: 5 },
  { hour: "4–6am", Mpesa: 9, Till: 7, Bank: 12, Card: 5, Paybill: 6 },
  { hour: "6–8am", Mpesa: 10, Till: 5, Bank: 10, Card: 4, Paybill: 7 },
  { hour: "8–10am", Mpesa: 12, Till: 6, Bank: 13, Card: 6, Paybill: 8 },
  { hour: "10–12am", Mpesa: 14, Till: 8, Bank: 15, Card: 7, Paybill: 10 },
  { hour: "12–2pm", Mpesa: 16, Till: 9, Bank: 14, Card: 8, Paybill: 11 },
  { hour: "2–4pm", Mpesa: 18, Till: 10, Bank: 17, Card: 9, Paybill: 12 },
  { hour: "4–6pm", Mpesa: 20, Till: 11, Bank: 18, Card: 10, Paybill: 14 },
  { hour: "6–8pm", Mpesa: 21, Till: 12, Bank: 20, Card: 11, Paybill: 15 },
  { hour: "8–10pm", Mpesa: 23, Till: 13, Bank: 22, Card: 12, Paybill: 16 },
  { hour: "10–12pm", Mpesa: 24, Till: 14, Bank: 25, Card: 13, Paybill: 18 },
];

const COLORS: { [key in keyof (typeof chartData)[0]]?: string } = {
  Mpesa: "#1C64F2",
  Till: "#E74694",
  Bank: "#FDBA8C",
  Card: "#22C55E",
  Paybill: "#A855F7",
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md  bg-background p-2 ">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="mt-2 flex flex-col gap-1">
          {payload.map((entry, index) => (
            <div
              key={`item-${index}`}
              className="flex items-center gap-2 text-sm"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="capitalize text-muted-foreground">
                {entry.name}
              </span>
              <span className="ml-auto font-medium text-foreground">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default function TransactionHours() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-black font-semibold text-lg">
          Peak Transaction Hours
        </CardTitle>
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-4 text-xs flex-wrap">
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
      </CardHeader>

      <CardContent className="pb-4 overflow-x-auto">
        <div className="min-w-[700px]">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="hour"
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6B7280" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              {Object.keys(COLORS).map((key) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS[key as keyof typeof COLORS]}
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
