"use client";

import Header from "../dashboard/Header";
import ChargebackTrends from "./components/ChargebackTrends";
import FlaggedTransactionsChart from "./components/FlaggedTransactionsChart";
import FraudGraph from "./components/FraudGraph";
import KYCVerificationStats from "./components/KYCVerificationStats";
import PendingVsVerified from "./components/PendingvsVerified";
import RegulatoryTransactionsChart from "./components/RegulatoryTransactionsCharts";

export default function ComplianceRisk() {
  return (
    <main className="bg-[#F5F7FA] font-poppins min-h-screen overflow-x-hidden overflow-y-auto">
      <Header />

      {/* Stat Cards Row with negative margin */}
      <div className="px-6 md:px-12 relative z-2 ">
        <div className="flex flex-col space-y-8">
          {/* First Grid Section */}
          <div className="grid grid-cols-5 gap-6 items-stretch justify-center mt-5">
            {/* Container 1: Spans 3 columns */}
            <div className="col-span-3 bg-white p-4 rounded-2xl">
              <FraudGraph />
            </div>
            {/* Container 2: Spans 2 columns */}
            <div className="col-span-2 bg-white p-4 rounded-2xl">
              <PendingVsVerified />
            </div>
          </div>

          {/* Second Grid Section */}

          <div className="bg-white p-4 rounded-2xl">
            <ChargebackTrends />
          </div>
          {/* table */}
          <div className="bg-white p-4 rounded-2xl">
            <RegulatoryTransactionsChart />
          </div>
        </div>
        <div className="grid grid-cols-5 gap-6 items-stretch justify-center mt-5">
          {/* Container 1: Spans 3 columns */}
          <div className="col-span-3 bg-white p-4 rounded-2xl">
            <FlaggedTransactionsChart />
          </div>
          {/* Container 2: Spans 2 columns */}
          <div className="col-span-2 w-full bg-white p-4 rounded-2xl">
            <KYCVerificationStats />
          </div>
        </div>
      </div>
    </main>
  );
}
