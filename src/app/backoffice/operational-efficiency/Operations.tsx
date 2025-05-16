import Header from "../dashboard/Header";
import { Breakout } from "./components/BreakOut";
import KeyServicesUptime from "./components/KeyServicesUptime";
import { OpenvsResolved } from "./components/OpenvsResolved";
import SupportIssues from "./components/SupportIssues";
import AverageTimeChart from "./components/AverageTimeChart";
import DowntimeIncidentsChart from "./components/DownTime";

export default function Operations() {
  return (
    <main className="bg-[#F5F7FA] font-poppins min-h-screen overflow-x-hidden overflow-y-auto">
      <Header />

      {/* KeyServicesUptime full-width card */}
      <div className="p-4 border-0 shadow-none">
        <KeyServicesUptime />
      </div>

      <div className="grid grid-cols-5 gap-6 px-4">
        <div className="col-span-3 bg-white p-4 rounded-2xl h-full flex flex-col mt-4">
          <OpenvsResolved />
        </div>
        <div className="col-span-2 bg-white p-4 rounded-2xl h-full flex flex-col mt-4">
          <SupportIssues />
        </div>
      </div>
      <div className="p-4 border-0 shadow-none mt-6">
        <Breakout />
      </div>
      <div className="grid grid-cols-5 gap-6 px-4">
        <div className="col-span-3 bg-white p-4 rounded-2xl h-full flex flex-col mt-4">
          <AverageTimeChart />
        </div>
        <div className="col-span-2 bg-white p-4 rounded-2xl h-full flex flex-col mt-4">
          <DowntimeIncidentsChart />
        </div>
      </div>
    </main>
  );
}
