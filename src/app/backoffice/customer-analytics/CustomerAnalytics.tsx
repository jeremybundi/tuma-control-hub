"use client";

import Header from "../dashboard/Header";
import { CountrySegmentationCard } from "./components/CountrySegmentation";
import CustomerLifetimeValueChart from "./components/CustomerLifetimeValueChart";
import { CustomerSegmentationChart } from "./components/CustomerSegmentation";
import StatCardsRow from "./components/StatcardRow";
import TableGraph from "./components/TableGraph";
import TotalCustomers from "./components/TotalCustomers";

export default function Dashboard() {
  return (
    <main className="bg-[#F5F7FA] font-poppins min-h-screen overflow-x-hidden overflow-y-auto">
      <Header />

      {/* Stat Cards Row with negative margin */}
      <div className="px-6 md:px-12 relative z-10 ">
        <StatCardsRow />

        <div className="flex flex-col space-y-8">
          {/* First Grid Section */}
          {/* table */}

          <div className="bg-white p-4 rounded-2xl mt-5">
            <TableGraph />
          </div>

          <div className="grid grid-cols-5 gap-6 items-stretch justify-center mt-5">
            {/* Container 1: Spans 3 columns */}
            <div className="col-span-3 bg-white p-4 rounded-2xl">
              <CustomerSegmentationChart />
            </div>
            {/* Container 2: Spans 2 columns */}
            <div className="col-span-2 bg-white p-4 rounded-2xl text-2xl">
              <CountrySegmentationCard />
            </div>
          </div>

          {/* Customer Value Section line graph */}

          <CustomerLifetimeValueChart />
          <TotalCustomers />
        </div>
      </div>
    </main>
  );
}
