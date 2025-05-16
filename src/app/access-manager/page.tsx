"use client";

import SideNav from "./components/SideNav";

export default function OTPPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar - 1/5 width (20%) */}
      <div className="w-1/5">
        <SideNav />
      </div>

      {/* Main Content - 4/5 width (80%) */}
      <div className="w-4/5 p-8 overflow-auto">
      
      </div>
    </div>
  );
}