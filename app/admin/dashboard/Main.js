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

const bookData = [
  {
    matno: "u2020/3402122",
    username: "Jeremy",
    department: "Computer Science",
  },
  { matno: "u2020/3402123", username: "Alex", department: "Mathematics" },
  { matno: "u2020/3402124", username: "Sarah", department: "Physics" },
  { matno: "u2020/3402125", username: "Michael", department: "Engineering" },
];

const overdueData = [
  {
    studentName: "Jeremy",
    bookId: "B123",
    issueDate: "2025-01-01",
    returnDate: "2025-01-15",
  },
  {
    studentName: "Alex",
    bookId: "B124",
    issueDate: "2025-01-02",
    returnDate: "2025-01-16",
  },
];

export default function DashboardContent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("This Week");

  const handleFilterChange = (value) => {
    setFilter(value);
    setIsDropdownOpen(false);
  };

  return (
    <div className="space-y-8 mt-[80px] p-8">
      {/* Greeting and Date */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          Hello Williams
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-2xl sm:text-3xl font-normal text-gray-600">
            Manage Users and Books
          </p>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-6 py-2 bg-white rounded-xl shadow-sm hover:bg-teal-100 transition-colors text-lg text-black font-normal"
            >
              {filter}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10">
                {["This Week", "This Month", "This Year"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    className="block w-full text-left px-4 py-2 text-black font-normal hover:bg-teal-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { value: 345, label: "Total Users" },
          { value: 32, label: "Borrowed Books" },
          { value: 32, label: "Overdue Books" },
          { value: 30, label: "New Members" },
        ].map((stat, index) => (
          <div
            key={index}
            className="flex-1 p-6 bg-white rounded-3xl shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <p className="text-4xl font-bold text-black">{stat.value}</p>
              <div className="p-3 bg-gray-100 rounded-xl">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xl font-normal text-black">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* User and Book Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User List */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-black mb-4">User List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 font-normal text-black text-lg">Matno</th>
                  <th className="py-3 font-normal text-black text-lg">
                    Username
                  </th>
                  <th className="py-3 font-normal text-black text-lg">
                    Department
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 text-black text-base font-normal">
                      {user.matno}
                    </td>
                    <td className="py-3 text-black text-base font-normal">
                      {user.username}
                    </td>
                    <td className="py-3 text-black text-base font-normal">
                      {user.department}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Book List */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">Book List</h2>
            <button
              onClick={() => alert("Add new book functionality coming soon!")}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-xl hover:bg-teal-100 transition-colors text-sm text-black font-normal"
            >
              Add New Book
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 font-normal text-black text-lg">Matno</th>
                  <th className="py-3 font-normal text-black text-lg">
                    Username
                  </th>
                  <th className="py-3 font-normal text-black text-lg">
                    Department
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookData.map((book, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 text-black text-base font-normal">
                      {book.matno}
                    </td>
                    <td className="py-3 text-black text-base font-normal">
                      {book.username}
                    </td>
                    <td className="py-3 text-black text-base font-normal">
                      {book.department}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Overdue Book List */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-4">
          Overdue Book List
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 font-normal text-black text-lg">
                  Student Name
                </th>
                <th className="py-3 font-normal text-black text-lg">Book ID</th>
                <th className="py-3 font-normal text-black text-lg">
                  Book Issue Date
                </th>
                <th className="py-3 font-normal text-black text-lg">
                  Book Return Date
                </th>
              </tr>
            </thead>
            <tbody>
              {overdueData.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 text-black text-base font-normal">
                    {item.studentName}
                  </td>
                  <td className="py-3 text-black text-base font-normal">
                    {item.bookId}
                  </td>
                  <td className="py-3 text-black text-base font-normal">
                    {item.issueDate}
                  </td>
                  <td className="py-3 text-black text-base font-normal">
                    {item.returnDate}
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
