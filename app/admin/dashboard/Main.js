"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Mock data
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
    bookId: "B123",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
  },
  { bookId: "B124", title: "Pride and Prejudice", author: "Jane Austen" },
  { bookId: "B125", title: "Data Structures", author: "Mark Allen Weiss" },
  { bookId: "B126", title: "Quantum Physics", author: "Richard Feynman" },
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

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function DashboardContent() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("This Week");
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  const handleFilterChange = (value) => {
    setFilter(value);
    setIsDropdownOpen(false);
  };

  const handleAddBook = () => {
    setIsAddBookModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddBookModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-14 sm:pt-16 md:pl-16 p-4 sm:p-6 lg:p-8">
      {/* Greeting and Date */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Hello Williams
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
          <p className="text-xl sm:text-2xl text-gray-600">
            Manage Users and Books
          </p>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors text-base sm:text-lg text-gray-900"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              aria-label="Filter options"
            >
              {filter}
              <svg
                className="w-5 h-5 text-gray-500"
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg z-10">
                {["This Week", "This Month", "This Year"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFilterChange(option)}
                    className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-teal-100 focus:bg-teal-100 focus:outline-none transition-colors"
                    aria-label={`Filter by ${option}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Stats Cards */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
      >
        {[
          { value: 345, label: "Total Users" },
          { value: 32, label: "Borrowed Books" },
          { value: 32, label: "Overdue Books" },
          { value: 30, label: "New Members" },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-4 sm:p-6 bg-white rounded-xl shadow-md flex flex-col gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                {stat.value}
              </p>
              <div className="p-3 bg-gray-100 rounded-xl">
                <svg
                  className="w-6 h-6 text-gray-900"
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
            <p className="text-lg sm:text-xl text-gray-900">{stat.label}</p>
          </div>
        ))}
      </motion.section>

      {/* User and Book Lists */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8"
      >
        {/* User List */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            User List
          </h2>
          {/* Desktop: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table
              className="w-full text-left"
              role="grid"
              aria-label="User list"
            >
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-900 text-base">
                    Matno
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-900 text-base">
                    Username
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-900 text-base">
                    Department
                  </th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr
                    key={user.matno}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-900 text-sm">
                      {user.matno}
                    </td>
                    <td className="py-3 px-4 text-gray-900 text-sm">
                      {user.username}
                    </td>
                    <td className="py-3 px-4 text-gray-900 text-sm">
                      {user.department}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile: Cards */}
          <div className="md:hidden space-y-4">
            {userData.map((user) => (
              <div
                key={user.matno}
                className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                role="group"
                aria-label={`User: ${user.username}`}
              >
                <p className="text-sm font-semibold text-gray-900">
                  Matno: <span className="font-normal">{user.matno}</span>
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  Username: <span className="font-normal">{user.username}</span>
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  Department:{" "}
                  <span className="font-normal">{user.department}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Book List */}
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Book List
            </h2>
            <button
              onClick={handleAddBook}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors text-sm text-gray-900"
              aria-label="Add new book"
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
          {/* Desktop: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table
              className="w-full text-left"
              role="grid"
              aria-label="Book list"
            >
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-900 text-base">
                    Book ID
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-900 text-base">
                    Title
                  </th>
                  <th className="py-3 px-4 font-semibold text-gray-900 text-base">
                    Author
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookData.map((book) => (
                  <tr
                    key={book.bookId}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-gray-900 text-sm">
                      {book.bookId}
                    </td>
                    <td className="py-3 px-4 text-gray-900 text-sm">
                      {book.title}
                    </td>
                    <td className="py-3 px-4 text-gray-900 text-sm">
                      {book.author}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile: Cards */}
          <div className="md:hidden space-y-4">
            {bookData.map((book) => (
              <div
                key={book.bookId}
                className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                role="group"
                aria-label={`Book: ${book.title}`}
              >
                <p className="text-sm font-semibold text-gray-900">
                  Book ID: <span className="font-normal">{book.bookId}</span>
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  Title: <span className="font-normal">{book.title}</span>
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  Author: <span className="font-normal">{book.author}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Overdue Book List */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        className="bg-white rounded-xl shadow-md p-4 sm:p-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
          Overdue Book List
        </h2>
        {/* Desktop: Table */}
        <div className="hidden md:block overflow-x-auto">
          <table
            className="w-full text-left"
            role="grid"
            aria-label="Overdue book list"
          >
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-900 text-base">
                  Student Name
                </th>
                <th className="py-3 px-4 font-semibold text-gray-900 text-base">
                  Book ID
                </th>
                <th className="py-3 px-4 font-semibold text-gray-900 text-base">
                  Issue Date
                </th>
                <th className="py-3 px-4 font-semibold text-gray-900 text-base">
                  Return Date
                </th>
              </tr>
            </thead>
            <tbody>
              {overdueData.map((item) => (
                <tr
                  key={`${item.studentName}-${item.bookId}`}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-900 text-sm">
                    {item.studentName}
                  </td>
                  <td className="py-3 px-4 text-gray-900 text-sm">
                    {item.bookId}
                  </td>
                  <td className="py-3 px-4 text-gray-900 text-sm">
                    {item.issueDate}
                  </td>
                  <td className="py-3 px-4 text-gray-900 text-sm">
                    {item.returnDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Mobile: Cards */}
        <div className="md:hidden space-y-4">
          {overdueData.map((item) => (
            <div
              key={`${item.studentName}-${item.bookId}`}
              className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              role="group"
              aria-label={`Overdue: ${item.studentName}, Book ${item.bookId}`}
            >
              <p className="text-sm font-semibold text-gray-900">
                Student: <span className="font-normal">{item.studentName}</span>
              </p>
              <p className="text-sm font-semibold text-gray-900">
                Book ID: <span className="font-normal">{item.bookId}</span>
              </p>
              <p className="text-sm font-semibold text-gray-900">
                Issue Date:{" "}
                <span className="font-normal">{item.issueDate}</span>
              </p>
              <p className="text-sm font-semibold text-gray-900">
                Return Date:{" "}
                <span className="font-normal">{item.returnDate}</span>
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Add Book Modal */}
      {isAddBookModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4"
            role="dialog"
            aria-labelledby="add-book-title"
            aria-describedby="add-book-description"
          >
            <h2
              id="add-book-title"
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Add New Book
            </h2>
            <div id="add-book-description" className="space-y-4">
              <div>
                <label
                  htmlFor="bookId"
                  className="block text-sm font-medium text-gray-800"
                >
                  Book ID
                </label>
                <input
                  type="text"
                  id="bookId"
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                  placeholder="e.g., B127"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-800"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                  placeholder="e.g., The Great Gatsby"
                />
              </div>
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-800"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                  placeholder="e.g., F. Scott Fitzgerald"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => {
                  console.log("Add book submitted (mock)");
                  handleCloseModal();
                }}
                className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                aria-label="Submit new book"
              >
                Add Book
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                aria-label="Cancel"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
