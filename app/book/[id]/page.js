"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/app/Navbar";
import { Footer } from "@/app/Footer";

// Mock data
const books = [
  {
    id: 1,
    title: "Mystery of the Ages",
    author: "Alice Carter",
    description: "A thrilling mystery that unravels ancient secrets.",
    cover: "/1.jpg",
    department: "Literature",
    semester: "3rd",
    genre: "Fiction",
  },
  {
    id: 2,
    title: "Tech Frontiers",
    author: "Mark Wilson",
    description:
      "Discover the latest advancements in technology and innovation.",
    cover: "/2.jpg",
    department: "Computer Science",
    semester: "4th",
    genre: "Non-Fiction",
  },
  {
    id: 3,
    title: "Scholarly Pursuits",
    author: "Dr. Laura Green",
    description: "In-depth research papers for academic enthusiasts.",
    cover: "/3.jpeg",
    department: "Physics",
    semester: "5th",
    genre: "Textbook",
  },
  {
    id: 4,
    title: "Adventure Stories",
    author: "Tom Baker",
    description: "Exciting tales for young readers and adventurers.",
    cover: "/4.jpeg",
    department: "Literature",
    semester: "2nd",
    genre: "Fiction",
  },
];

export default function BookDetail() {
  const params = useParams();
  const id = Number(params.id);
  const book = books.find((b) => b.id === id);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [matno, setMatno] = useState("");

  if (!book) {
    notFound();
  }

  // Calculate dates
  const issueDate = new Date().toISOString().split("T")[0]; // e.g., 2025-04-22
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 14);
  const formattedReturnDate = returnDate.toISOString().split("T")[0]; // e.g., 2025-05-06

  const handleBorrow = () => {
    setIsBorrowModalOpen(true);
  };

  const handleConfirmBorrow = () => {
    console.log("Borrow book submitted (mock):", {
      studentName,
      matno,
      bookTitle: book.title,
      issueDate,
      returnDate: formattedReturnDate,
    });
    setIsBorrowModalOpen(false);
    setStudentName("");
    setMatno("");
  };

  const handleCloseModal = () => {
    setIsBorrowModalOpen(false);
    setStudentName("");
    setMatno("");
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-14 sm:pt-16 md:pl-16 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-1/3 h-[300px] sm:h-[400px]">
                <Image
                  src={book.cover || "/books/placeholder.jpg"}
                  alt={book.title}
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL="/books/placeholder.jpg"
                  className="rounded-xl"
                  onError={(e) => {
                    e.target.src = "/books/placeholder.jpg";
                  }}
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
                <div className="space-y-2 IMMEDIATE mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Department:</span>{" "}
                    {book.department || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Semester:</span>{" "}
                    {book.semester || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Genre:</span>{" "}
                    {book.genre || "N/A"}
                  </p>
                </div>
                <p className="text-base text-gray-700 mb-6">
                  {book.description}
                </p>
                <button
                  className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                  onClick={handleBorrow}
                  aria-label={`Borrow ${book.title}`}
                >
                  Borrow Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      {isBorrowModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4"
            role="dialog"
            aria-labelledby="borrow-book-title"
            aria-describedby="borrow-book-description"
          >
            <h2
              id="borrow-book-title"
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Borrow Book
            </h2>
            <div id="borrow-book-description" className="space-y-4">
              <div>
                <label
                  htmlFor="studentName"
                  className="block text-sm font-medium text-gray-800"
                >
                  Student Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                  placeholder="e.g., John Doe"
                  aria-required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="matno"
                  className="block text-sm font-medium text-gray-800"
                >
                  Matriculation Number
                </label>
                <input
                  type="text"
                  id="matno"
                  value={matno}
                  onChange={(e) => setMatno(e.target.value)}
                  className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                  placeholder="e.g., u2020/3402122"
                  aria-required="true"
                />
              </div>
              <div>
                <label
                  htmlFor="bookTitle"
                  className="block text-sm font-medium text-gray-800"
                >
                  Book Title
                </label>
                <input
                  type="text"
                  id="bookTitle"
                  value={book.title}
                  readOnly
                  className="w-full bg-gray-100 text-gray-900 border border-gray-200 rounded-md px-4 py-2 mt-1 cursor-not-allowed"
                  aria-readonly="true"
                />
              </div>
              <div>
                <label
                  htmlFor="issueDate"
                  className="block text-sm font-medium text-gray-800"
                >
                  Issue Date
                </label>
                <input
                  type="text"
                  id="issueDate"
                  value={issueDate}
                  readOnly
                  className="w-full bg-gray-100 text-gray-900 border border-gray-200 rounded-md px-4 py-2 mt-1 cursor-not-allowed"
                  aria-readonly="true"
                />
              </div>
              <div>
                <label
                  htmlFor="returnDate"
                  className="block text-sm font-medium text-gray-800"
                >
                  Return Date
                </label>
                <input
                  type="text"
                  id="returnDate"
                  value={formattedReturnDate}
                  readOnly
                  className="w-full bg-gray-100 text-gray-900 border border-gray-200 rounded-md px-4 py-2 mt-1 cursor-not-allowed"
                  aria-readonly="true"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleConfirmBorrow}
                className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                aria-label="Confirm borrow"
                disabled={!studentName || !matno}
              >
                Confirm
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
      <Footer />
    </div>
  );
}
