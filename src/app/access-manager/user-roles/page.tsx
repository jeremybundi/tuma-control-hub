"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SlOptionsVertical } from "react-icons/sl";
import SideNav from "@/userAuth/SideNav";
import type { RootState } from "@/store/store";

interface User {
  id: number;
  roleKey: string | null;
  email: string;
  firstName: string;
  lastName: string;
  accountKey: string;
  phoneNumber?: string;
}

interface Role {
  roleKey: string;
  name: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<{[key: number]: HTMLDivElement | null}>({});

  // Get token from Redux store
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  // Configure Axios instance
  const api = axios.create({
    baseURL: "https://auth.tuma-app.com/api",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Fetch users and roles from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch users and roles concurrently
        const [usersResponse, rolesResponse] = await Promise.all([
          api.get("/account/approved-system-users"),
          api.get("/role/roles"),
        ]);

        setUsers(usersResponse.data);
        setRoles(rolesResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchData();
    } else {
      setError("Authentication required. Please log in.");
      setLoading(false);
    }
  }, [accessToken]);

  // Helper function to get user initials
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get role name from roleKey
  const getRoleName = (roleKey: string | null) => {
    if (!roleKey) return "Not Assigned";
    const role = roles.find((r) => r.roleKey === roleKey);
    return role ? role.name : "Unknown Role";
  };

  const handleAssignRole = (userId: number) => {
    // Update the user's roleKey to simulate assignment
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, roleKey: `assignedRole-${userId}` }
          : user
      )
    );
    console.log(`Role assigned to user with ID: ${userId}`);
    setActiveDropdown(null);
  };

  const handleDelete = (userId: number) => {
    // Implement delete functionality
    console.log(`Delete user with ID: ${userId}`);
    setActiveDropdown(null);
  };

  const toggleDropdown = (userId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === userId ? null : userId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedElement = event.target as HTMLElement;
      
      // Check if clicked element is not a dropdown option or the options button
      if (!clickedElement.closest('.dropdown-options') && 
          !clickedElement.closest('.options-button')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen">
        <div className="w-1/5">
          <SideNav />
        </div>
        <div className="w-4/5 p-8 overflow-auto flex items-center justify-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen">
        <div className="w-1/5">
          <SideNav />
        </div>
        <div className="w-4/5 p-8 overflow-auto flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar - 1/5 width (20%) */}
      <div className="w-1/5">
        <SideNav />
      </div>

      <div className="w-4/5 p-8 overflow-auto">
        <div className="overflow-x-auto font-poppins">
          <h1 className="text-[18px] font-[600] mb-6">User Roles & Access</h1>

          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="text-[#808A92] font-[600] text-[12px] uppercase border-y border-y-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Action</th>
                <th className="py-3 px-4 text-left">Select</th>

              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px]">
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold">
                          {getInitials(user.firstName, user.lastName)}
                        </span>
                      </div>
                      <span>
                        {user.firstName} {user.lastName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#808A92] font-[400]">
                    {user.email}
                  </td>
                  <td
                    className={`py-4 px-4 rounded-full text-center w-32 font-medium 
                      ${user.roleKey ? "text-green-800" : "text-red-700"}
                    `}
                  >
                    {getRoleName(user.roleKey)}
                  </td>
                  <td className="py-4 px-4 relative">
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => toggleDropdown(user.id, e)}
                        className="options-button text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <SlOptionsVertical />
                      </button>
                    </div>
                    {activeDropdown === user.id && (
                      <div 
                        ref={el => dropdownRefs.current[user.id] = el}
                        className="dropdown-options absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        <div className="py-1">
                          {!user.roleKey && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAssignRole(user.id);
                              }}
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Assign Role
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(user.id);
                            }}
                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}