"use client";

import { CustomerRetention } from "./CustomerRetention";
import CustomerSegmentation from "./CustomerSegmentation";
import Header from "./Header";
import LatestTransactions from "./LatestTransactions";
import StatCardsRow from "./StatCardRow";
import { TransactionStatuses } from "./TransactionStatuses";
import TransactionTotalsSection from "./TransactionTotalsSection.tsx";
import AverageTransactionTime from "./AverageTransactionTime";

export default function Dashboard() {
  return (
    <main className="bg-[#F5F7FA] font-poppins min-h-screen overflow-x-hidden overflow-y-auto">
      <Header />

      <div className="px-4 sm:px-6 md:px-12 relative z-10 space-y-8">
        <StatCardsRow />

        {/* First Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-5">
          <div className="md:col-span-3 bg-white p-4 rounded-2xl">
            <TransactionTotalsSection />
          </div>
          <div className="md:col-span-2 bg-white p-4 rounded-2xl">
            <AverageTransactionTime />
          </div>
        </div>

        {/* Second Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 bg-white p-4 rounded-2xl">
            <TransactionStatuses />
          </div>
          <div className="md:col-span-2 bg-white p-4 rounded-2xl">
            <CustomerSegmentation />
          </div>
        </div>

        {/* Customer Retention Section */}
        <div className="bg-white p-4 rounded-2xl">
          <CustomerRetention />
        </div>

        {/* Latest Transactions Table */}
        <div className="bg-white p-4 rounded-2xl">
          <LatestTransactions />
        </div>
      </div>
    </main>
  );
}
