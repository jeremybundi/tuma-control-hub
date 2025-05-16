"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaCalendarAlt, FaFilter, FaFileExport } from "react-icons/fa";
import { Search } from "lucide-react";

const statuses = ["Approved", "Rejected", "Pending"];
const users = [
  {
    name: "Alice Smith",
    currentLimit: "5000 GBP/day",
    requestedLimit: "15000 GBP/day",
    reason: "High-volume business transactions",
  },
  {
    name: "John Doe",
    currentLimit: "3000 GBP/day",
    requestedLimit: "10000 GBP/day",
    reason: "Increased client payments",
  },
  {
    name: "Emily Johnson",
    currentLimit: "2000 GBP/day",
    requestedLimit: "8000 GBP/day",
    reason: "Business expansion",
  },
  {
    name: "Michael Brown",
    currentLimit: "7000 GBP/day",
    requestedLimit: "20000 GBP/day",
    reason: "Real estate investments",
  },
  {
    name: "Sophia Lee",
    currentLimit: "10000 GBP/day",
    requestedLimit: "25000 GBP/day",
    reason: "Large supplier payments",
  },
  {
    name: "William Davis",
    currentLimit: "6000 GBP/day",
    requestedLimit: "18000 GBP/day",
    reason: "E-commerce growth",
  },
];

const SpecialLimits = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on search query (matches both name and status)
  const filteredUsers = users.filter((user, index) => {
    const status = statuses[index % statuses.length].toLowerCase();
    return (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      status.includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex h-screen">
      <div className="w-80 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 bg-white overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-black">Special Limits</h2>
          <div className="flex gap-4">
            <div className="relative w-[300px] sm:w-[400px] md:w-[500px]">
              <input
                type="text"
                placeholder="Search by user... "
                className="w-full px-4 py-2 pl-10 border rounded-md shadow-sm focus:ring focus:ring-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-md text-gray-500" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-100">
              <FaCalendarAlt /> Filter by date
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-100">
              <FaFilter /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-100">
              <FaFileExport /> Export
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Current Limit</th>
                <th className="px-6 py-3">Requested Limit</th>
                <th className="px-6 py-3">Reason for Request</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.currentLimit}</td>
                  <td className="px-6 py-4">{user.requestedLimit}</td>
                  <td className="px-6 py-4">{user.reason}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-sm font-semibold rounded-lg ${
                        statuses[index % statuses.length] === "Approved"
                          ? "text-green-700 bg-green-100"
                          : statuses[index % statuses.length] === "Rejected"
                          ? "text-red-700 bg-red-100"
                          : "text-yellow-700 bg-yellow-100"
                      }`}
                    >
                      {statuses[index % statuses.length]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 py-4">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialLimits;
