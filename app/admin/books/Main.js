"use client";

import { useState } from "react";

const userData = [
  { matno: "u2020/3402122", username: "Jeremy", department: "Computer Science" },
  { matno: "u2020/3402123", username: "Alex", department: "Mathematics" },
  { matno: "u2020/3402124", username: "Sarah", department: "Physics" },
  { matno: "u2020/3402125", username: "Michael", department: "Engineering" },
];

// Mock list of valid book IDs (since bookData was not suitable)
const validBookIds = ["B123", "B124", "B125", "B126"];

export default function DashboardContent() {
  // Form state
  const [formData, setFormData] = useState({
    bookId: "",
    matno: "",
  });
  const [errors, setErrors] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form and approve borrowing
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate book ID
    if (!formData.bookId.trim()) {
      newErrors.bookId = "Book ID is required";
    } else if (!validBookIds.includes(formData.bookId)) {
      newErrors.bookId = "Invalid book ID";
    }

    // Validate matno
    if (!formData.matno.trim()) {
      newErrors.matno = "Matriculation number is required";
    } else {
      const user = userData.find((u) => u.matno === formData.matno);
      if (!user) {
        newErrors.matno = "Invalid matriculation number";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate borrowing record
    const user = userData.find((u) => u.matno === formData.matno);
    const issueDate = new Date();
    const returnDate = new Date(issueDate);
    returnDate.setDate(issueDate.getDate() + 14); // 14 days from issue

    const borrowingRecord = {
      bookId: formData.bookId,
      studentName: user.username,
      issueDate: issueDate.toISOString().split("T")[0], // YYYY-MM-DD
      returnDate: returnDate.toISOString().split("T")[0], // YYYY-MM-DD
    };

    // Add to borrowed books and reset form
    setBorrowedBooks((prev) => [...prev, borrowingRecord]);
    setFormData({ bookId: "", matno: "" });
    setErrors({});
  };

  return (
    <div className="space-y-8 mt-[80px] p-8 pt-14 sm:pt-16 md:pl-16">
      {/* Greeting */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          Hello Williams
        </h1>
        <p className="text-2xl sm:text-3xl font-normal text-gray-600">
          Approve Book Borrowing
        </p>
      </div>

      {/* Borrowing Form */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-4">Borrow a Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="bookId" className="block text-lg font-normal text-black mb-1">
              Book ID
            </label>
            <input
              type="text"
              id="bookId"
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              className={`w-full bg-gray-50 text-black border ${
                errors.bookId ? "border-red-500" : "border-gray-200"
              } rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors`}
              placeholder="e.g., B123"
            />
            {errors.bookId && (
              <p className="mt-1 text-sm text-red-500">{errors.bookId}</p>
            )}
          </div>
          <div>
            <label htmlFor="matno" className="block text-lg font-normal text-black mb-1">
              Matriculation Number
            </label>
            <input
              type="text"
              id="matno"
              name="matno"
              value={formData.matno}
              onChange={handleChange}
              className={`w-full bg-gray-50 text-black border ${
                errors.matno ? "border-red-500" : "border-gray-200"
              } rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors`}
              placeholder="e.g., u2020/3402122"
            />
            {errors.matno && (
              <p className="mt-1 text-sm text-red-500">{errors.matno}</p>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-xl shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
          >
            Approve Borrowing
          </button>
        </form>
      </div>

      {/* Borrowed Books Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-4">Borrowed Books</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 font-normal text-black text-lg">Book ID</th>
                <th className="py-3 font-normal text-black text-lg">Student Name</th>
                <th className="py-3 font-normal text-black text-lg">Issue Date</th>
                <th className="py-3 font-normal text-black text-lg">Return Date</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-3 text-center text-black text-base font-normal">
                    No books borrowed yet
                  </td>
                </tr>
              ) : (
                borrowedBooks.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 text-black text-base font-normal">{item.bookId}</td>
                    <td className="py-3 text-black text-base font-normal">{item.studentName}</td>
                    <td className="py-3 text-black text-base font-normal">{item.issueDate}</td>
                    <td className="py-3 text-black text-base font-normal">{item.returnDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
