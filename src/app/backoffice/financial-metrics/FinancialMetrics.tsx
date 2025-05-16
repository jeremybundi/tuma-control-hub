"use client";

import Header from "../dashboard/Header";
import { PayoutChart } from "./components/PayoutChart";
import { RevenueChart } from "./components/RevenueChart";
import TransactionFailureChart from "./components/TransactionFailure";
import TransactionHours from "./components/TransactionHours";
import { TransactionStatuses } from "./components/TransactionStatuses";
import { TransactionVolume } from "./components/TransactionVolume";

export default function FinancialMetrics() {
  return (
    <main className="bg-[#F5F7FA] font-poppins min-h-screen overflow-x-hidden overflow-y-auto">
      <Header />

      {/* Stat Cards Row with padding and responsiveness */}
      <div className="px-4 sm:px-6 md:px-12 relative z-2">
        <div className="flex flex-col space-y-8">
          {/* First Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-5">
            {/* Container 1: Spans full on mobile, 3 columns on md+ */}
            <div className="md:col-span-3 bg-white p-4 rounded-2xl h-full flex flex-col">
              <TransactionVolume />
            </div>

            {/* Container 2: Spans full on mobile, 2 columns on md+ */}
            <div className="md:col-span-2 bg-white p-4 rounded-2xl h-full flex flex-col">
              <PayoutChart />
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-3 rounded-2xl">
            <RevenueChart />
          </div>

          {/* Second Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Container 1: Spans full on mobile, 2 columns on md+ */}
            <div className="md:col-span-2 bg-white p-4 rounded-2xl">
              <TransactionFailureChart />
            </div>

            {/* Container 2: Spans full on mobile, 3 columns on md+ */}
            <div className="md:col-span-3 bg-white p-4 rounded-2xl">
              <TransactionStatuses />
            </div>
          </div>

          {/* Transaction Hours */}
          <div className="bg-white p-4 rounded-2xl">
            <TransactionHours />
          </div>
        </div>
      </div>
    </main>
  );
}
