"use client";

import { useEffect, useState } from "react";
import { Separator } from "../../../components/ui/separator";
import { FaWallet } from "react-icons/fa6";
import { BsCalendar2DateFill, BsFillBarChartLineFill } from "react-icons/bs";
import { TrendingUp } from "lucide-react";
import { CountryTransactions } from "./CountryTransactions";
import useApi from "../../../hooks/useApi";

interface TransactionData {
  totalAmountTransacted: number;
  transactionsCount: number;
}

function TransactionTotalsSection() {
  const [data, setData] = useState<TransactionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { get } = useApi();

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await get<TransactionData>("/analytics/totals");
        setData(response);
      } catch (err) {
        console.error("Error fetching totals:", err);
        setError("Failed to load transaction data");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [get]);

  const formatAmount = (amount: number) =>
    `£ ${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between px-4 gap-8 lg:gap-16 w-full">
      {/* Left Section */}
      <div className="space-y-6 w-full lg:w-auto">
        {/* Title and Icon */}
        <div className="flex items-center gap-4">
          <span className="bg-blue-100 rounded-lg p-3">
            <FaWallet className="text-blue-700 text-xl" />
          </span>
          <h1 className="text-black font-semibold text-lg lg:text-xl">
            Total Transactions
          </h1>
        </div>

        {/* Amount and Growth */}
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-black whitespace-nowrap">
            {data ? formatAmount(data.totalAmountTransacted) : "N/A"}
          </h1>
          <span className="flex bg-green-100 text-green-600 text-sm rounded-full px-2 py-1 items-center gap-1">
            <TrendingUp className="text-green-600 text-sm" />
            13%
          </span>
        </div>

        {/* Period and No. of Transactions */}
        <div className="flex flex-col gap-6 mt-10">
          {/* Period */}
          <div className="flex items-center gap-3">
            <span className="bg-yellow-100 rounded-lg p-2">
              <BsCalendar2DateFill className="text-yellow-500 text-lg" />
            </span>
            <div className="flex flex-col">
              <p className="text-gray-400 font-normal text-xs">For the period</p>
              <p className="text-gray-800 font-medium text-xs">
                Jan 25th 2023 - Apr 8th 2025
              </p>
            </div>
          </div>

          {/* Number of Transactions */}
          <div className="flex items-center gap-3">
            <span className="bg-purple-100 rounded-lg p-2">
              <BsFillBarChartLineFill className="text-purple-800 text-lg" />
            </span>
            <div className="flex flex-col">
              <p className="text-gray-400 font-normal text-xs">
                No. of Transactions
              </p>
              <p className="text-gray-800 font-medium text-xs">
                {data?.transactionsCount.toLocaleString() ?? "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Separator (Desktop only) */}
      <Separator
        orientation="vertical"
        className="hidden lg:block h-64 w-[2px] bg-gray-300"
      />

      {/* Right Section - Chart */}
      <div className="flex justify-center lg:justify-start w-full lg:w-auto">
        <CountryTransactions />
      </div>
    </div>
  );
}

export default TransactionTotalsSection;