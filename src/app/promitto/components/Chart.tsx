"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { useEffect, useState } from "react";
import api from "../../../hooks/useApi";


type ApiResponse = {
  topTransactions: {
    transactionReference: string;
    senderAmount: number;
    receiverAmount: number;
    createdAt: string;
  }[];
};

const barColors = [
  "#AEA9FF", // Purple
  "#A2E5DD", // Teal
  "#F1B80C", // Yellow
  "#92BFFF", // Blue
  "#C6D6F7", // Light blue
];

function Chart({
  dateRange,
}: {
  dateRange: { startDate: Date | null; endDate: Date | null };
}) {
  const [chartData, setChartData] = useState<
    Array<{
      transactionID: string;
      amount: number;
      senderAmount: number;
      date: string;
    }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { get } = api();


  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "/transfer/get-partner-analytics";
  
        if (dateRange.startDate && dateRange.endDate) {
          const start = dateRange.startDate.toISOString().split("T")[0];
          const end = dateRange.endDate.toISOString().split("T")[0];
          url += `?startDate=${start}&endDate=${end}`;
        }
  
        const data: ApiResponse = await get<ApiResponse>(url);
  
        const apiTransactions = data.topTransactions.map((transaction) => ({
          transactionID: transaction.transactionReference,
          amount: transaction.receiverAmount,
          senderAmount: transaction.senderAmount,
          date: new Date(transaction.createdAt).toLocaleDateString(),
        }));
  
        setChartData(apiTransactions);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [dateRange]);
   

  return (
    <Card className="bg-white">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-xl font-semibold">
          Top 5 transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="h-[300px] flex items-center justify-center">
            <p>Loading transaction data...</p>
          </div>
        ) : error ? (
          <div className="h-[300px] flex items-center justify-center text-red-500">
            <p>Error: {error}</p>
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barCategoryGap={20}
              >
                <XAxis
                  dataKey="transactionID"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: "#888" }}
                >
                  <Label
                    value="Name & ID"
                    position="insideBottom"
                    offset={-10}
                    style={{ textAnchor: "middle", fontSize: "12px" }}
                  />
                </XAxis>
                <YAxis
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  tick={{ fontSize: 12, fill: "#bbb" }}
                  type="number"
                  axisLine={false}
                  tickLine={false}
                >
                  <Label
                    value="Amount in KES"
                    angle={-90}
                    position="left"
                    style={{ textAnchor: "middle", fontSize: "12px" }}
                    offset={5}
                  />
                </YAxis>
                <Tooltip
                  formatter={(value) => [
                    `KES ${value.toLocaleString()}`,
                    "Amount",
                  ]}
                  contentStyle={{ fontSize: "12px" }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={30}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={barColors[index % barColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Chart;
