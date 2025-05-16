"use client";
import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  getInitials,
  getPastelColor,
  statusStyles,
} from "@/app/user-accounts/components/constants";

interface User {
  accountId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string | null;
  accountStatus: string;
  registrationDate: string;
  gender?: string | null;
  dob?: string | null;
  lastTransactionDate?: string | null;
  totalTransactions?: string | number | null;
  totalValue?: string | null;
  lastLogin?: string | null;
}

interface Props {
  user: User;
  onClose: () => void;
  open: boolean;
}

export default function UserDetailsModal({
  user,
  onClose,
  open: isOpen,
}: Props) {
  const fullName = `${user.firstName.trim()} ${user.lastName.trim()}`.trim();

  const getCountryDisplay = (code: string | null) => {
    if (code === "Kenya") {
      return (
        <>
          <img src="/kenya-flag.png" alt="Kenya" className="w-5 h-5 rounded" />{" "}
          Kenya
        </>
      );
    } else if (code === "United Kingdom" || code === "GBR") {
      return (
        <>
          <img src="/uk-flag.png" alt="UK" className="w-5 h-5 rounded" /> United
          Kingdom
        </>
      );
    } else {
      return <span className="text-gray-400">N/A</span>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 w-full sm:w-[400px] md:w-[460px] h-full bg-white z-50 shadow-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-6 h-full overflow-y-auto">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">
                  User Details
                </h2>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="text-gray-500 hover:text-gray-800 w-5 h-5" />
                </button>
              </div>

              {/* User Info */}
              <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4 mb-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg text-gray-800 ${getPastelColor(
                    fullName
                  )}`}
                >
                  {getInitials(fullName)}
                </div>
                <p className="font-semibold text-lg mt-3">{fullName}</p>
                <p className="text-sm text-gray-600">{user.phone}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              {/* Status */}
              <div className="flex gap-4 mb-4">
                <div className="bg-white border px-4 py-2 rounded-xl flex-1">
                  <p className="text-sm font-semibold">KYC status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        statusStyles[user.accountStatus]?.dot || "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        statusStyles[user.accountStatus]?.text ||
                        "text-gray-600"
                      }`}
                    >
                      {user.accountStatus}
                    </span>
                  </div>
                </div>
                <div className="bg-white border px-4 py-2 rounded-xl flex-1">
                  <p className="text-sm font-semibold">Account status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        statusStyles[user.accountStatus]?.dot || "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        statusStyles[user.accountStatus]?.text ||
                        "text-gray-600"
                      }`}
                    >
                      {user.accountStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="bg-gray-50 p-4 rounded-xl mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Gender</span>
                  <span className="font-medium">{user.gender || "—"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date of Birth</span>
                  <span className="font-medium">{user.dob || "—"}</span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-gray-600">Country of Residence</span>
                  <span className="flex items-center gap-1 font-medium">
                    {getCountryDisplay(user.country)}
                  </span>
                </div>
              </div>

              {/* Transactions */}
              <div className="bg-gray-50 p-4 rounded-xl mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last transaction Date</span>
                  <span className="font-medium">
                    {user.lastTransactionDate || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total transactions</span>
                  <span className="font-medium">
                    <a href="#" className="text-blue-600 underline">
                      View
                    </a>{" "}
                    {user.totalTransactions || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Total value of transactions
                  </span>
                  <span className="font-medium">{user.totalValue || "—"}</span>
                </div>
              </div>

              {/* Other Info */}
              <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date of registration</span>
                  <span className="font-medium">
                    {new Date(user.registrationDate).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last login date</span>
                  <span className="font-medium">{user.lastLogin || "—"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
