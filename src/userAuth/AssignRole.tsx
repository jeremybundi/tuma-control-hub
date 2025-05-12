"use client";

import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";

interface Role {
  roleKey: string;
  name: string;
}

interface AssignRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssignRoleModal({ isOpen, onClose }: AssignRoleModalProps) {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get("https://auth.tuma-app.com/api/role/roles", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setRoles(response.data);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    if (isOpen) {
      fetchRoles();
    }
  }, [accessToken, isOpen]);

  if (!isOpen) return null;

  const user = {
    firstName: "Jeremy",
    lastName: "Mongare",
    email: "jeremybundi4@gmail.com",
    department: "Engineering",
    phoneNumber: "+254712345678",
    status: "active" as const,
  };

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const getInitialsColor = (initials: string) => {
    const colors = [
      "bg-blue-100 text-blue-600",
      "bg-green-100 text-green-600",
      "bg-yellow-100 text-yellow-600",
      "bg-red-100 text-red-600",
      "bg-purple-100 text-purple-600",
      "bg-pink-100 text-pink-600",
      "bg-indigo-100 text-indigo-600",
      "bg-teal-100 text-teal-600",
    ];
    
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    
    return colors[index];
  };

  const initials = getInitials(user.firstName, user.lastName);
  const initialsColor = getInitialsColor(initials);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-45 bg-black/40 z-50 flex justify-end"
      onClick={onClose}
    >
      <div
        className="h-screen w-2/6 bg-gray-100 shadow-lg transform transition-transform duration-300 ease-in-out relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Assign Role</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <IoCloseCircleOutline size={24} />
            </button>
          </div>

          <div className="space-y-5 flex-1 overflow-y-auto pb-24">
            <div className="flex flex-col bg-white rounded-xl py-10 items-center">
              <div className={`p-4 py-5 rounded-full ${initialsColor} flex items-center justify-center mb-4`}>
                <span className="font-semibold text-4xl">
                  {initials}
                </span>
              </div>
              <div className="text-center space-y-1 text-[#101820]">
                <h3 className="font-[600] text-[23px]">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-[18px] font-[500]">{user.phoneNumber}</p>
                <p className="text-sm text-[14px] font-[400]">{user.email}</p>
              </div>
            </div>

            <div className="p-4 flex justify-between items-center mt-4 gap-x-4 bg-white rounded-xl">
              <h4 className="font-[600] text-[16px]">Current Department</h4>
              <p className="text-[#F1B80C] text-[15px] border border-[#F1B80C] rounded-md px-4 p-2">
                {user.department}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl relative">
              <h4 className="font-[600] text-[16px]">Assign Role</h4>
              <div className="relative mt-3">
                <div 
                  className="text-[15px] w-full border bg-white z-10 text-gray-900 border-gray-500 rounded-md px-4 p-3 flex justify-between items-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{selectedRole ? selectedRole.name : "Select a role"}</span>
                  <IoIosArrowDown className={`text-gray-500 text-xl transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`} />
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {roles.map((role) => (
                      <div
                        key={role.roleKey}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleRoleSelect(role)}
                      >
                        {role.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-7 bg-white">
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