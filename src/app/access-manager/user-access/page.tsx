"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SideNav from "@/userAuth/SideNav";
import { RootState } from "@/store/store";

interface User {
  id: number;
  userKey: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  status: boolean;
  createdAt: number;
  modifiedAt: number;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(
          "https://auth.tuma-app.com/api/account/system-users-requests",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [accessToken]);

  const handleApprove = async (userId: number, email: string) => {
    if (!accessToken) return;

    try {
      await axios.post(
        `https://auth.tuma-app.com/api/account/approve-system-user?email=${encodeURIComponent(email)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: true } : user
        )
      );

      console.log(`Approved user with ID: ${userId}`);
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/5">
        <SideNav />
      </div>

      <div className="w-4/5 p-8 overflow-auto">
        <div className="overflow-x-auto font-poppins">
          <h1 className="text-[18px] font-[600] mb-6">User roles & Access</h1>

          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="text-[#808A92] font-[600] text-[12px] uppercase border-y border-y-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Department</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px]">
              {users.map((user) => (
                <tr key={user.id}>
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
                  <td className="py-4 px-4 text-[#808A92] font-[400]">
                    {user.phoneNumber.trim()}
                  </td>
                  <td className="py-4 px-4">{user.department}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status ? "Active" : "Pending"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {user.status ? (
                      <span className="text-green-700 text-sm font-medium">
                         Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApprove(user.id, user.email)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        Approve
                      </button>
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
