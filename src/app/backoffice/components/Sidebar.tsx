"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FC } from "react";
import User from "../../access-manager/components/User"; // Import the User component


const Sidebar: FC = () => {
  const pathname = usePathname(); 
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/dashboard'); 
  };

  return (
    <div className="fixed h-screen w-80 bg-blue-700 flex flex-col text-white">
      <div className="flex items-center justify-center py-10 cursor-pointer"
              onClick={handleLogoClick}
           >
        <img
          src="/backoffice/tuma.png"
          alt="Tuma-Logo"
          className="w-14 h-14 px-2 py-2 -ml-24"
        />{" "}
        <span className="font-extrabold text-white text-2xl">Back Office</span>
      </div>
      <nav className="flex flex-col gap-4 px-4">
        <Link
          href="/backoffice/dashboard"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/dashboard"
              ? "bg-white text-blue-700"
              : "text-white hover:bg-gray-100 hover:text-blue-700"
          }`}
        >
          <img
            src="/backoffice/dashboard.png"
            alt="Dashboard-Logo"
            className={`w-6 h-6 ${
              pathname === "/dashboard" ? "filter-blue" : "filter-white"
            }`}
          />{" "}
          Dashboard
        </Link>
        <Link
          href="/backoffice/transactions"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/transactions"
              ? "bg-white text-blue-700"
              : "text-white hover:bg-gray-100 hover:text-blue-700"
          }`}
        >
          <img
            src="/backoffice/transactions.png"
            alt="Transactions-Logo"
            className={`w-6 h-6 ${
              pathname === "/transactions" ? "filter-blue" : "filter-white"
            }`}
          />
          Transactions
        </Link>
        <Link
          href="/backoffice/special-limits"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/special-limits"
              ? "bg-white text-blue-700"
              : "text-white hover:bg-gray-100 hover:text-blue-700"
          }`}
        >
          <img
            src="/backoffice/special.png"
            alt="Special-Logo"
            className={`w-6 h-6 ${
              pathname === "/special-limits" ? "filter-blue" : "filter-white"
            }`}
          />
          Special Limits
        </Link>
        <Link
          href="/backoffice/reconciliation"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/reconciliation"
              ? "bg-white text-blue-700"
              : "text-white hover:bg-gray-100 hover:text-blue-700"
          }`}
        >
          <img
            src="/backoffice/recon.png"
            alt="Recon-Logo"
            className={`w-6 h-6 ${
              pathname === "/reconciliation" ? "filter-blue" : "filter-white"
            }`}
          />
          Reconciliation
        </Link>
        <Link
          href="/backoffice/user-accounts"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/user-accounts"
              ? "bg-white text-blue-700"
              : "text-white hover:bg-gray-100 hover:text-blue-700"
          }`}
        >
          <img
            src="/backoffice/users.png"
            alt="Users-Logo"
            className={`w-6 h-6 ${
              pathname === "/user-accounts" ? "filter-blue" : "filter-white"
            }`}
          />
          User & Accounts
        </Link>
        <Link
          href="/backoffice/fees"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/fees"
              ? "bg-white text-blue-700"
              : "text-white hover:bg-gray-100 hover:text-blue-700"
          }`}
        >
          <img
            src="/backoffice/fees.png"
            alt="Fees-Logo"
            className={`w-6 h-6 ${
              pathname === "/fees" ? "filter-blue" : "filter-white"
            }`}
          />
          Fees & Commissions
        </Link>
        <Link
          href="/backoffice/compliance"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/compliance"
              ? "bg-white text-blue-700"
              : "text-white hover:bg-gray-100 hover:text-blue-700"
          }`}
        >
          <img
            src="/backoffice/compliance.png"
            alt="Compliance-Logo"
            className={`w-6 h-6 ${
              pathname === "/compliance" ? "filter-blue" : "filter-white"
            }`}
          />
          Compliance & Security
        </Link>
        <Link
          href="/backoffice/reports"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/reports"
              ? "bg-white text-blue-700"
              : "text-white hover:bg-gray-100 hover:text-blue-700"
          }`}
        >
          <img
            src="/backoffice/reports.png"
            alt="Reports-Logo"
            className={`w-6 h-6 ${
              pathname === "/reports" ? "filter-blue" : "filter-white"
            }`}
          />
          Reports & Analytics
        </Link>
        <Link
          href="/backoffice/support"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/support"
              ? "bg-white text-blue-700"
              : "text-white hover:bg-gray-100 hover:text-blue-700"
          }`}
        >
          <img
            src="/backoffice/support.png"
            alt="Support-Logo"
            className={`w-6 h-6 ${
              pathname === "/support" ? "filter-blue" : "filter-white"
            }`}
          />
          Support & Disputes
        </Link>
        <Link
          href="/backoffice/permissions"
          className={`flex items-center gap-4 px-4 py-2 rounded-lg ${
            pathname === "/permissions"
              ? "bg-white text-blue-700"
              : "text-white hover:bg-gray-100 hover:text-blue-700"
          }`}
        >
          <img
            src="/backoffice/settings.png"
            alt="Settings-Logo"
            className={`w-6 h-6 ${
              pathname === "/permissions" ? "filter-blue" : "filter-white"
            }`}
          />
          Settings & Permissions
        </Link>
      </nav>
      <div className="mt-auto mb-2">
        <User/>
      </div>
    </div>
  );
};

export default Sidebar;
