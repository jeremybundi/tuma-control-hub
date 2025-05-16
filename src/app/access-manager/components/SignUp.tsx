"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Popup from "./Popup";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";

export default function ControlHub() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [department, setDepartment] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: ""
  });
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<{
    status: string;
    message: string;
    account_key?: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const departments = [
    { value: "Tech", label: "Tech" },
    { value: "Tech", label: "Tech" },
    { value: "Tech", label: "Tech" },
    { value: "Tech", label: "Tech" },
    { value: "Tech", label: "Tech" },

    { value: "Finance", label: "Finance" },
    { value: "Customer Support", label: "Customer Support" },
    { value: "Compliance", label: "Compliance" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleDepartmentSelect = (value: string) => {
    setDepartment(value);
    setIsDropdownOpen(false);
    if (error) setError(null);
  };

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const requestData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        department: department
      };
  
      console.log("Data being sent to API:", requestData);
  
      const response = await axios.post(
        "https://auth.tuma-app.com/api/account/save-system-user",
        null,
        {
          params: {
            firstName: requestData.firstName,
            lastName: requestData.lastName,
            email: requestData.email,
            phoneNumber: requestData.phoneNumber,
            department: requestData.department
          }
        }
      );
  
      console.log("API Response:", response.data);
      setApiResponse(response.data);
      
      if (response.data.status === "error") {
        setError(response.data.message);
      } else {
        setIsPopupOpen(true);
      }
    } catch (error: unknown) {
      console.error("Error requesting access:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex h-screen font-poppins items-center justify-center bg-gray-100">
      <div className="w-full max-w-full overflow-hidden flex">
        {/* Left Column: Image */}
        <div className="w-1/2 relative">
          <Image
            src="/user-access/images/lady.png"
            alt="Lady"
            width={500}
            height={500}
            className="h-screen w-full object-cover"
          />
        </div>

        {/* Right Column: Form */}
        <div className="w-1/2 mt-16 px-24 pr-36">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 flex items-center gap-4">
            <Image src="/user-access/images/logo.png" alt="Logo" width={40} height={35} />
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
            {/* First Name */}
            <div>
              <label className="block text-xl font-medium text-gray-500">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-xl font-medium text-gray-500">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Email & Phone - Flexed Below Second Name */}
            <div className="flex gap-4">
              {/* Email */}
              <div className="w-1/2">
                <label className="block text-xl font-medium text-gray-500">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              {/* Phone Number */}
              <div className="w-1/2">
                <label className="block text-xl font-medium text-gray-500">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 border text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="relative">
              <label className="block text-xl font-medium text-gray-500">
                Department <span className="text-red-500">*</span>
              </label>
              <div 
                className="mt-1 w-full px-4 py-2 border text-lg border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none flex justify-between items-center cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{department || "Select Department"}</span>
                <IoIosArrowDown className={`text-gray-500 text-xl transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`} />
              </div>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg h-[160px] overflow-y-auto">
                  {departments.map((dept, index) => (
                    <div key={dept.value}>
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleDepartmentSelect(dept.value)}
                      >
                        {dept.label}
                      </div>
                      {index !== departments.length - 1 && <hr className="border-gray-50" />}
                    </div>
                  ))}
                </div>
              )}


            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}

            {/* Request for Access Button */}
            <button
              type="submit"
              disabled={loading || !department}
              className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white font-semibold text-xl py-3 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Request for Access"}
            </button>
          </form>
        </div>
      </div>

      {/* Popup Component */}
      {apiResponse?.status === "created" && (
        <Popup 
          isOpen={isPopupOpen} 
          onClose={() => setIsPopupOpen(false)} 
          response={apiResponse}
        />
      )}
    </div>
  );
}