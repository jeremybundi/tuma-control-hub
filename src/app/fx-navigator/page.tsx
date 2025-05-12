'use client';

import { useState } from 'react';
import SideNav from './components/SideNav';
import Section from './components/Section';
//import Market from '@/components/MarketComparison';
import AuditTrail from './components/AuditTrail';
//import BulkUpdate from './components/BulkUpdate'; // Import the modal

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className=" mx-auto">
      <div className="flex bg-gray-100  mx-auto">
        {/* Sidebar */}
        <SideNav />

        {/* Main Content */}
        <div className="flex flex-col w-full px-10 py-6">
          {/* Header Section 
          <div className="flex justify-between items-center mt-2 mb-3">
            <h1 className="text-xl  font-semibold">Rate Manager</h1>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-3 bg-[#101820] font-lufga font-semibold text-sm text-white rounded-xl hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              Bulk Update Rates
            </button>
          </div>
          */}

          {/* Two-Column Layout */}
          <div>
            <div className=" max-h-[100vh] gap-6">
              <Section />
               {/* <Market /> */}
            </div>

            <div className="mt-8 ">
              <AuditTrail />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
