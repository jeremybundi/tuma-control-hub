"use client";

import { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { IoIosSearch, IoIosArrowForward } from "react-icons/io";
import AssignRoleModal from "../components/AssignRole";
import auth from "../../../hooks/Auth";

type UserStatus = "active" | "pending";

interface User {
  id: number;
  userKey: string;
  accountKey: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  status: UserStatus;
  createdAt: number;
  modifiedAt: number;
}

interface ApiUser {
  id: number;
  userKey?: string;
  accountKey?: string | null;
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber?: string;
  department?: string;
  status?: boolean;
  createdAt?: string;
  modifiedAt?: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { get, post } = auth();

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await get<ApiUser[]>("/account/system-users-requests");
        const transformedUsers = data.map((user: ApiUser): User => ({
          id: user.id,
          userKey: user.userKey || `user_${user.id}`,
          accountKey: user.accountKey || null,
          firstName: user.firstName || "Unknown",
          lastName: user.lastName || "User",
          email: user.email,
          phoneNumber: user.phoneNumber || "N/A",
          department: user.department || "N/A",
          status: user.status === true ? "active" : "pending",
          createdAt: user.createdAt ? new Date(user.createdAt).getTime() : Date.now(),
          modifiedAt: user.modifiedAt ? new Date(user.modifiedAt).getTime() : Date.now(),
        }));

        setUsers(transformedUsers);
        setFilteredUsers(transformedUsers);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleApprove = async (userId: number, email: string) => {
    try {
      // Use the new auth hook's post method
      const data = await post<{ status: string; message: string; accountKey: string }>(
        "/account/approve-system-user",
        null,
        { params: { email } }
      );
  
      if (data.status === "approved") {
        setUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, status: "active", accountKey: data.accountKey } : user
          )
        );
        setFilteredUsers((prev) =>
          prev.map((user) =>
            user.id === userId ? { ...user, status: "active", accountKey: data.accountKey } : user
          )
        );
        setMessage(data.message);
        setMessageType("success");
      } else {
        throw new Error(data.message || "Failed to approve user");
      }
    } catch (error: unknown) {
      console.error("Error approving user:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred";
      setMessage(message);
      setMessageType("error");
    }
  };
  

  const handleRowClick = (user: User) => {
    if (user.accountKey) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const getStatusStyle = (status: UserStatus) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-[#037847]";
      case "pending":
        return "bg-[#FDF6EC] text-[#F1B80C]";
      default:
        return "";
    }
  };

  const getStatusText = (status: UserStatus) => {
    switch (status) {
      case "active":
        return "Active";
      case "pending":
        return "Pending";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen relative">
        <div className="w-1/5">
          <SideNav />
        </div>
        <div className="w-4/5 p-8 overflow-auto flex items-center justify-center">
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen relative">
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
    <div className="flex h-screen relative">
      <div className="w-1/5">
        <SideNav />
      </div>

      <div className="w-4/5 p-8 overflow-auto">
        <div className="overflow-x-auto font-poppins">
          <div className="flex justify-between sticky items-center mb-6">
            <h1 className="text-[18px] font-[600]">User roles & access</h1>
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

          {message && (
            <div
              className={`p-3 mb-4 rounded-md text-sm ${
                messageType === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

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
              {filteredUsers.map((user, index) => {
                const initials = getInitials(user.firstName, user.lastName);
                const initialsColor = getInitialsColor(initials);

                return (
                  <tr
                  key={user.id}
                  onClick={() => handleRowClick(user)}
                  className={`hover:bg-gray-50 ${user.accountKey ? 'cursor-pointer' : 'cursor-default'}`}
                >
                    <td className="py-4 px-3 text-[#808A92]">{index + 1}</td>
                    <td className="py-2 px-3">
                      <div className="flex items-center">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                            initialsColor.split(" ")[0]
                          }`}
                        >
                          <span
                            className={`font-semibold ${initialsColor.split(" ")[1]}`}
                          >
                            {initials}
                          </span>
                        </div>
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
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
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(
                          user.status
                        )}`}
                      >
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      {user.accountKey === null ? (
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AssignRoleModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }}
  user={selectedUser}
/>
    </div>
  );
}