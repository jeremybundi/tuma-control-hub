"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideNav from "@/userAuth/SideNav";
import { RootState } from "@/store/store";
import { IoIosSearch, IoIosArrowForward } from "react-icons/io";
import AssignRoleModal from "@/userAuth/AssignRole";

type UserStatus = "active" | "suspended" | "pending";

interface User {
  id: number;
  userKey: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  status: UserStatus;
  createdAt: number;
  modifiedAt: number;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  useEffect(() => {
    // Generate mock data
    const departments = ["Engineering", "Marketing", "HR", "Finance", "Operations"];
    const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "James", "Emma", "Daniel", "Olivia"];
    const lastNames = ["Doe", "Smith", "Johnson", "Williams", "Brown", "Miller", "Wilson", "Taylor", "Anderson", "Thomas"];
    const statuses: UserStatus[] = ["active", "suspended", "pending"];

    const mockUsers = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      userKey: `user_${i + 1}`,
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      email: `user${i + 1}@example.com`,
      phoneNumber: `+2547${Math.floor(10000000 + Math.random() * 90000000)}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    }));

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleApprove = async (userId: number, email: string) => {
    if (!accessToken) return;

    try {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, status: "active" } : user
        )
      );
      setFilteredUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, status: "active" } : user
        )
      );
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleRowClick = () => {
    setIsModalOpen(true);
  };

  const getStatusStyle = (status: UserStatus) => {
    switch (status) {
      case "active": return "bg-green-50 text-[#037847]";
      case "suspended": return "bg-red-50 text-[#D92D20]";
      case "pending": return "bg-[#FDF6EC] text-[#F1B80C]";
      default: return "";
    }
  };

  const getStatusText = (status: UserStatus) => {
    switch (status) {
      case "active": return "Active";
      case "suspended": return "Suspended";
      case "pending": return "Pending";
      default: return "";
    }
  };

  return (
    <div className="flex h-screen relative">
      <div className="w-1/5">
        <SideNav />
      </div>

      <div className="w-4/5 p-8 overflow-auto">
        <div className="overflow-x-auto font-poppins">
          <div className="flex justify-between sticky items-center mb-6">
            <h1 className="text-[18px] font-[600]">User roles & Access</h1>
            <div className="relative">
              <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="pl-10 pr-4 py-2 border-2 border-gray-400 rounded-lg text-sm w-64 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <table className="w-full bg-white rounded-lg overflow-auto">
            <thead className="text-[#808A92] font-[600] text-[12px] uppercase border-y border-y-gray-100">
              <tr>
                <th className="py-3 px-3 text-left">#</th>
                <th className="py-3 px-3 text-left">User</th>
                <th className="py-3 px-3 text-left">Email</th>
                <th className="py-3 px-3 text-left">Phone</th>
                <th className="py-3 px-3 text-left">Department</th>
                <th className="py-3 px-3 text-left">Status</th>
                <th className="py-3 px-3 text-left">Action</th>
                <th className="py-3 px-3 text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[13px]">
              {filteredUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  onClick={handleRowClick}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-4 px-3 text-[#808A92]">{index + 1}</td>
                  <td className="py-2 px-3">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-semibold">
                          {getInitials(user.firstName, user.lastName)}
                        </span>
                      </div>
                      <span>{user.firstName} {user.lastName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-[#808A92] font-[400]">
                    {user.email}
                  </td>
                  <td className="py-4 px-3 text-[#808A92] font-[400]">
                    {user.phoneNumber}
                  </td>
                  <td className="py-4 px-3">{user.department}</td>
                  <td className="py-4 px-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(user.status)}`}>
                      {getStatusText(user.status)}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    {user.status === "pending" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(user.id, user.email);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-[14px] font-medium transition-colors"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">No action</span>
                    )}
                  </td>
                  <td className="py-4 px-3">
                    <IoIosArrowForward />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AssignRoleModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}