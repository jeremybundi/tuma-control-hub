"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Popup from "@/userAuth/Popup"; // Import the popup component

export default function ControlHub() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleRequestAccess = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPopupOpen(true); // Show popup on button click
  };

  return (
    <div className="flex h-screen font-poppins items-center justify-center bg-gray-100">
      <div className="w-full max-w-full overflow-hidden flex">
        {/* Left Column: Image */}
        <div className="w-1/2 relative">
          <Image
            src="/images/lady.png"
            alt="Lady"
            width={500}
            height={500}
            className="h-screen w-full object-cover"
          />
        </div>

        {/* Right Column: Form */}
        <div className="w-1/2 mt-24 px-24 pr-36">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 flex items-center gap-4">
            <Image src="/images/logo.png" alt="Logo" width={40} height={35} />
            Control Hub
          </h2>
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            Request for Access
          </p>
          <p className="text-gray-500 font-medium text-xl mb-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>

          {/* Horizontal Line */}
          <div className="w-full border-t border-gray-200 mb-8"></div>

          {/* Input Fields */}
          <form className="space-y-4" onSubmit={handleRequestAccess}>
            {/* First Name & Second Name */}
            {["First Name", "Second Name"].map((label, index) => (
              <div key={index}>
                <label className="block text-xl font-medium text-gray-500">
                  {label} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="mt-1 w-full px-4 py-2 border text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            ))}

            {/* Email & Phone - Flexed Below Second Name */}
            <div className="flex gap-4">
              {["Email", "Phone Number"].map((label, index) => (
                <div key={index} className="w-1/2">
                  <label className="block text-xl font-medium text-gray-500">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={label === "Email" ? "email" : "tel"}
                    className="mt-1 w-full px-4 py-2 border text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
              ))}
            </div>

            {/* Request for Access Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-xl py-3 rounded-lg transition duration-300"
            >
              Request for Access
            </button>
          </form>
        </div>
      </div>

      {/* Popup Component */}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
