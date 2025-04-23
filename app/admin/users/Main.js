"use client";

import { useState } from "react";

const userData = [
  {
    matno: "u2020/3402122",
    username: "Jeremy",
    department: "Computer Science",
  },
  { matno: "u2020/3402123", username: "Alex", department: "Mathematics" },
  { matno: "u2020/3402124", username: "Sarah", department: "Physics" },
  { matno: "u2020/3402125", username: "Michael", department: "Engineering" },
];

export default function DashboardContent() {
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [matnoSearch, setMatnoSearch] = useState("");
  const [usernameSearch, setUsernameSearch] = useState("");

  // Get unique departments for dropdown
  const departments = [
    "All",
    ...new Set(userData.map((user) => user.department)),
  ];

  // Filter users based on department, matno, and username
  const filteredUsers = userData.filter((user) => {
    const matchesDepartment =
      departmentFilter === "All" || user.department === departmentFilter;
    const matchesMatno = user.matno
      .toLowerCase()
      .includes(matnoSearch.toLowerCase());
    const matchesUsername = user.username
      .toLowerCase()
      .includes(usernameSearch.toLowerCase());
    return matchesDepartment && matchesMatno && matchesUsername;
  });

  return (
    <div className="space-y-8 mt-[80px] p-8 pt-14 sm:pt-16 md:pl-16 font-raleway">
      {/* Greeting */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          All Library Users
        </h1>
        <p className="text-2xl sm:text-3xl font-normal text-gray-600">
          View Library Users
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-2xl font-bold text-black mb-4">Filter Users</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label
              htmlFor="department-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department
            </label>
            <select
              id="department-filter"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-700"
              aria-label="Filter by department"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label
              htmlFor="matno-search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Matriculation Number
            </label>
            <input
              id="matno-search"
              type="text"
              value={matnoSearch}
              onChange={(e) => setMatnoSearch(e.target.value)}
              placeholder="Search matno..."
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-700"
              aria-label="Search by matriculation number"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="username-search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username-search"
              type="text"
              value={usernameSearch}
              onChange={(e) => setUsernameSearch(e.target.value)}
              placeholder="Search username..."
              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-700"
              aria-label="Search by username"
            />
          </div>
        </div>
      </div>

      {/* User List Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-4">Library Users</h2>
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-3 px-4 font-medium text-black text-lg">
                  Matno
                </th>
                <th className="py-3 px-4 font-medium text-black text-lg">
                  Username
                </th>
                <th className="py-3 px-4 font-medium text-black text-lg">
                  Department
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-3 px-4 text-center text-gray-600"
                  >
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.matno}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-teal-50 transition-colors`}
                  >
                    <td className="py-3 px-4 text-black text-base font-normal">
                      {user.matno}
                    </td>
                    <td className="py-3 px-4 text-black text-base font-normal">
                      {user.username}
                    </td>
                    <td className="py-3 px-4 text-black text-base font-normal">
                      {user.department}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile Card Layout */}
        <div className="sm:hidden space-y-4">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-600">No users found</p>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.matno}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 hover:bg-teal-50 transition-colors"
              >
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">Matno:</span>{" "}
                    <span className="text-black">{user.matno}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Username:</span>{" "}
                    <span className="text-black">{user.username}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Department:
                    </span>{" "}
                    <span className="text-black">{user.department}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
