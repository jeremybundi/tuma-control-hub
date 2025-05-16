"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  FaBuilding,
  FaDollarSign,
  FaPhone,
  FaReceipt,
  FaWallet,
} from "react-icons/fa";
import useApi from "../../../hooks/useApi";

interface StatCardData {
  totalMpesaAmount: number;
  totalPayBillAmount: number;
  totalBankAmount: number;
  totalCardAmount: number;
}

interface StatCard {
  label: string;
  amount: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}

export default function StatCardsRow() {
  const [data, setData] = useState<StatCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { get } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get<StatCardData>("/analytics/totals");
        setData(response);
      } catch (err) {
        console.error("Error fetching totals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [get]);

  const formatAmount = (amount: number) =>
    `£ ${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  const cards: StatCard[] = [
    {
      label: "MPESA",
      amount: data ? formatAmount(data.totalMpesaAmount) : "Loading...",
      change: "-24%",
      positive: false,
      icon: (
        <span className="bg-orange-100 rounded-lg p-3 mb-2">
          <FaDollarSign className="text-orange-700 text-xl" />
        </span>
      ),
    },
    {
      label: "PAYBILL",
      amount: data ? formatAmount(data.totalPayBillAmount) : "Loading...",
      change: "+27%",
      positive: true,
      icon: (
        <span className="bg-blue-100 rounded-lg p-3 mb-2">
          <FaReceipt className="text-blue-700 text-xl" />
        </span>
      ),
    },
    {
      label: "BANK",
      amount: data ? formatAmount(data.totalBankAmount) : "Loading...",
      change: "+17%",
      positive: true,
      icon: (
        <span className="bg-green-100 rounded-lg p-3 mb-2">
          <FaBuilding className="text-green-700 text-xl" />
        </span>
      ),
    },
    {
      label: "CARD",
      amount: data ? formatAmount(data.totalCardAmount) : "Loading...",
      change: "+13%",
      positive: true,
      icon: (
        <span className="bg-blue-100 rounded-lg p-3 mb-2 ">
          <FaWallet className="text-blue-700 text-xl" />
        </span>
      ),
    },
    {
      label: "TILL",
      amount: "£ 17,009.00",
      change: "-09%",
      positive: false,
      icon: (
        <span className="bg-purple-100 rounded-lg p-3 mb-2">
          <FaPhone className="text-purple-700 text-xl" />
        </span>
      ),
    },
  ];

  if (loading) {
    return <div className="text-center p-4">Loading statistics...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white p-10 rounded-xl shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              {card.icon}
            </div>
            <div className="text-gray-700 text-lg font-medium text-center">
              {card.label}
            </div>
          </div>
          <div className="text-2xl font-semibold text-gray-800">
            {card.amount}
          </div>
          <div className="mt-2 text-md flex items-center space-x-2">
            <div
              className={`rounded-full p-1 ${
                card.positive ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {card.positive ? (
                <TrendingUp size={14} className="text-green-500" />
              ) : (
                <TrendingDown size={14} className="text-red-500" />
              )}
            </div>
            <span
              className={`${card.positive ? "text-green-500" : "text-red-500"}`}
            >
              {card.change}
            </span>
            <span className="text-gray-400">vs Last Week</span>
          </div>
        </div>
      ))}
    </div>
  );
}