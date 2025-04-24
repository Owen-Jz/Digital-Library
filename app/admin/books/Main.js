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

const validBookIds = ["B123", "B124", "B125", "B126"];

// Mock pending borrowing requests
const initialPendingRequests = [
  { requestId: "req1", bookId: "B123", matno: "u2020/3402122" },
  { requestId: "req2", bookId: "B124", matno: "u2020/3402123" },
  { requestId: "req3", bookId: "B125", matno: "u2020/3402124" },
];

export default function DashboardContent() {
  const [pendingRequests, setPendingRequests] = useState(
    initialPendingRequests
  );
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [errors, setErrors] = useState({});

  const handleApprove = (request) => {
    const newErrors = {};

    // Validate book ID
    if (!validBookIds.includes(request.bookId)) {
      newErrors[request.requestId] = `Invalid book ID: ${request.bookId}`;
    }

    // Validate matno
    const user = userData.find((u) => u.matno === request.matno);
    if (!user) {
      newErrors[
        request.requestId
      ] = `Invalid matriculation number: ${request.matno}`;
    }

    // Check for duplicate borrowing
    const alreadyBorrowed = borrowedBooks.some(
      (book) =>
        book.bookId === request.bookId && book.studentName === user?.username
    );
    if (alreadyBorrowed) {
      newErrors[request.requestId] =
        "This book is already borrowed by this student";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    // Generate borrowing record
    const issueDate = new Date();
    const returnDate = new Date(issueDate);
    returnDate.setDate(issueDate.getDate() + 14);

    const borrowingRecord = {
      bookId: request.bookId,
      studentName: user.username,
      issueDate: issueDate.toISOString().split("T")[0],
      returnDate: returnDate.toISOString().split("T")[0],
    };

    // Add to borrowed books and remove from pending
    setBorrowedBooks((prev) => [...prev, borrowingRecord]);
    setPendingRequests((prev) =>
      prev.filter((req) => req.requestId !== request.requestId)
    );
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[request.requestId];
      return newErrors;
    });
  };

  const handleDisapprove = (requestId) => {
    setPendingRequests((prev) =>
      prev.filter((req) => req.requestId !== requestId)
    );
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[requestId];
      return newErrors;
    });
  };

  return (
    <div className="space-y-8 mt-[80px] p-8 pt-14 sm:pt-16 md:pl-16 font-raleway">
      {/* Greeting */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">
          Manage Book Borrowing
        </h1>
        <p className="text-2xl sm:text-3xl font-normal text-gray-600">
          Review and approve or disapprove borrowing requests
        </p>
      </div>

      {/* Pending Requests */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-4">
          Pending Borrowing Requests
        </h2>
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-3 px-4 font-medium text-black text-lg">
                  Book ID
                </th>
                <th className="py-3 px-4 font-medium text-black text-lg">
                  Student Matric No
                </th>
                <th className="py-3 px-4 font-medium text-black text-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="py-3 px-4 text-center text-gray-600 text-base font-normal"
                  >
                    No pending requests
                  </td>
                </tr>
              ) : (
                pendingRequests.map((request) => (
                  <tr
                    key={request.requestId}
                    className="border-b border-gray-200 hover:bg-teal-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-black text-base font-normal">
                      {request.bookId}
                    </td>
                    <td className="py-3 px-4 text-black text-base font-normal">
                      {request.matno}
                    </td>
                    <td className="py-3 px-4 text-black text-base font-normal">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(request)}
                          className="px-4 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                          aria-label={`Approve request for book ${request.bookId}`}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDisapprove(request.requestId)}
                          className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors"
                          aria-label={`Disapprove request for book ${request.bookId}`}
                        >
                          Disapprove
                        </button>
                      </div>
                      {errors[request.requestId] && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors[request.requestId]}
                        </p>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile Card Layout for Pending Requests */}
        <div className="sm:hidden space-y-4">
          {pendingRequests.length === 0 ? (
            <p className="text-center text-gray-600 text-base font-normal">
              No pending requests
            </p>
          ) : (
            pendingRequests.map((request) => (
              <div
                key={request.requestId}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 hover:bg-teal-50 transition-colors"
              >
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">Book ID:</span>{" "}
                    <span className="text-black">{request.bookId}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Matric No:
                    </span>{" "}
                    <span className="text-black">{request.matno}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(request)}
                      className="px-4 py-1 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                      aria-label={`Approve request for book ${request.bookId}`}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDisapprove(request.requestId)}
                      className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors"
                      aria-label={`Disapprove request for book ${request.bookId}`}
                    >
                      Disapprove
                    </button>
                  </div>
                  {errors[request.requestId] && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors[request.requestId]}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Borrowed Books Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-black mb-4">Borrowed Books</h2>
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="py-3 px-4 font-medium text-black text-lg">
                  Book ID
                </th>
                <th className="py-3 px-4 font-medium text-black text-lg">
                  Student Name
                </th>
                <th className="py-3 px-4 font-medium text-black text-lg">
                  Issue Date
                </th>
                <th className="py-3 px-4 font-medium text-black text-lg">
                  Return Date
                </th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-3 px-4 text-center text-gray-600 text-base font-normal"
                  >
                    No books borrowed yet
                  </td>
                </tr>
              ) : (
                borrowedBooks.map((item, index) => (
                  <tr
                    key={`${item.bookId}-${item.studentName}-${index}`}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-teal-50 transition-colors`}
                  >
                    <td className="py-3 px-4 text-black text-base font-normal">
                      {item.bookId}
                    </td>
                    <td className="py-3 px-4 text-black text-base font-normal">
                      {item.studentName}
                    </td>
                    <td className="py-3 px-4 text-black text-base font-normal">
                      {item.issueDate}
                    </td>
                    <td className="py-3 px-4 text-black text-base font-normal">
                      {item.returnDate}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile Card Layout */}
        <div className="sm:hidden space-y-4">
          {borrowedBooks.length === 0 ? (
            <p className="text-center text-gray-600 text-base font-normal">
              No books borrowed yet
            </p>
          ) : (
            borrowedBooks.map((item, index) => (
              <div
                key={`${item.bookId}-${item.studentName}-${index}`}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 hover:bg-teal-50 transition-colors"
              >
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">Book ID:</span>{" "}
                    <span className="text-black">{item.bookId}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Student Name:
                    </span>{" "}
                    <span className="text-black">{item.studentName}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Issue Date:
                    </span>{" "}
                    <span className="text-black">{item.issueDate}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Return Date:
                    </span>{" "}
                    <span className="text-black">{item.returnDate}</span>
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
