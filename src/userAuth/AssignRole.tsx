"use client";

import { IoCloseCircleOutline } from "react-icons/io5";

interface AssignRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssignRoleModal({ isOpen, onClose }: AssignRoleModalProps) {
  if (!isOpen) return null;

  // Hardcoded user data
  const user = {
    firstName: "Jeremy",
    lastName: "Mongare",
    email: "jeremybundi4@gmail.com",
    department: "Engineering",
    phoneNumber: "+254712345678",
    status: "active" as const
  };

  const getInitials = (firstName: string, lastName: string) => 
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (

   
    <div 
      className="fixed inset-0 bg-opacity-25 backdrop-blur-xs z-50  flex justify-end"
      onClick={onClose}
    >
      <div 
        className="h-screen w-2/6 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Assign Role</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoCloseCircleOutline size={24} />
            </button>
          </div>
          
          {/* Scrollable Content */}
          <div className="space-y-5 flex-1 overflow-y-auto pb-24">
            {/* User Profile */}
            <div className="flex flex-col bg-white rounded-xl py-10 items-center">
              <div className="p-4 py-5 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <span className="text-blue-600 font-semibold text-4xl">
                  {getInitials(user.firstName, user.lastName)}
                </span>
              </div>
              <div className="text-center space-y-1 text-[#101820]">
                <h3 className="font-[600] text-[23px]">{user.firstName} {user.lastName}</h3>
                <p className="text-[18px] font-[500]">{user.phoneNumber}</p>
                <p className="text-sm text-[14px] font-[400]">{user.email}</p>
              </div>
            </div>
            
            {/* Department */}
            <div className="p-4 flex justify-between items-center mt-4 gap-x-4 bg-white rounded-xl">
              <h4 className="font-[600] text-[16px]">Current Department</h4>
              <p className="text-[#F1B80C] text-[15px] border border-[#F1B80C] rounded-md px-4 p-2">
                {user.department}
              </p>
            </div>
            
            {/* Role Assignment */}
            <div className="p-4 bg-white rounded-xl">
              <h4 className="font-[600] text-[16px]">Assign Role</h4>
              <select className="text-[15px] text-gray-400 w-full border border-gray-500 mt-3 rounded-md px-4 p-3">
                <option >ie. Customer support</option>
                <option>Admin</option>
                <option>Merchant</option>
                <option>Omnisupport</option> 
                <option>Treasury</option>
              </select>
            </div>
          </div>

          {/* Fixed Bottom Buttons */}
          <div className="absolute bottom-0 left-0 right-0 p-7 bg-white ">
            <div className="flex gap-4">
              <button 
                className="w-full text-blue-500 hover:bg-blue-600 hover:text-white border border-blue-500 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}