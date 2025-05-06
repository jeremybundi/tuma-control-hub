"use client";

import { useState } from "react";

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
  // Helper function to get user initials
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Generate 30 sample users
  const generateUsers = (): User[] => {
    const departments = ["Tech", "HR", "Finance", "Marketing", "Operations"];
    const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Lisa", "James", "Emma"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"];
    
    return Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      userKey: `userKey${i}`,
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      email: `user${i}@example.com`,
      phoneNumber: `+2547${Math.floor(10000000 + Math.random() * 90000000)}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      status: Math.random() > 0.5,
      createdAt: Date.now() / 1000,
      modifiedAt: Date.now() / 1000,
    }));
  };

  const [users, setUsers] = useState<User[]>(generateUsers());

  const handleApprove = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: true } : user
      )
    );
    console.log(`Approved user with ID: ${userId}`);
  };

  return (
    <div className="overflow-x-auto font-poppins">
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="text-[#808A92] font-[600] text-[12px] uppercase border-y border-y-gray-100 ">
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
              <td className="py-4 px-4 text-[#808A92] font-[400]">{user.email}</td>
              <td className="py-4 px-4 text-[#808A92] font-[400]">{user.phoneNumber}</td>
              <td className="py-4 px-4">{user.department}</td>
              <td className="py-4 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.status
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.status ? "Approved" : "Pending"}
                </span>
              </td>
              <td className="py-4 px-4">
                {!user.status && (
                  <button
                    onClick={() => handleApprove(user.id)}
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
  );
}