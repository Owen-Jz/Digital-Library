"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Mock user and book data (replace with API or database fetch)
const user = {
  username: "Jane Doe",
  profilePicture: "/profile.png",
};

const borrowedBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    cover: "/1.jpg",
    dueDate: "2025-05-10",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "/2.jpg",
    dueDate: "2025-05-15",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "/6.jpeg",
    dueDate: "2025-05-15",
  },
];

const readBooks = [
  {
    id: 5,
    title: "Data Structures",
    author: "Mark Allen Weiss",
    cover: "/3.jpeg",
  },
  {
    id: 6,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/4.jpeg",
  },
];

const suggestedBooks = [
  {
    id: 3,
    title: "Physics for Scientists",
    author: "Paul A. Tipler",
    cover: "/5.jpeg",
    description: "Core physics concepts.",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/6.jpeg",
    description: "A tale of the Jazz Age.",
  },
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

// Modal component for return confirmation
function ReturnModal({ isOpen, onClose, book, onConfirm }) {
  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Confirm Return
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-600 rounded"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-24 h-36">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/books/placeholder.jpg"
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Due: {book.dueDate}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to return this book?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-100 text-slate-800 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm(book.id);
                    onClose();
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
                >
                  Confirm Return
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function MyLibrary() {
  // Refs for scroll animations
  const profileRef = useRef(null);
  const borrowedRef = useRef(null);
  const readRef = useRef(null);
  const suggestedRef = useRef(null);
  const profileInView = useInView(profileRef, { once: true, margin: "-100px" });
  const borrowedInView = useInView(borrowedRef, { once: true, margin: "-100px" });
  const readInView = useInView(readRef, { once: true, margin: "-100px" });
  const suggestedInView = useInView(suggestedRef, { once: true, margin: "-100px" });

  // State for borrowed books and modal
  const [borrowed, setBorrowed] = useState(borrowedBooks);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleReturn = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const confirmReturn = (bookId) => {
    setBorrowed(borrowed.filter((book) => book.id !== bookId));
    // In a real app, send a request to the backend (e.g., Supabase)
    console.log(`Returning book with ID: ${bookId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Return Modal */}
        <ReturnModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          book={selectedBook}
          onConfirm={confirmReturn}
        />

        {/* Profile Summary */}
        <motion.section
          ref={profileRef}
          initial="hidden"
          animate={profileInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
            <Image
              src={user.profilePicture}
              alt={`${user.username}'s profile picture`}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                My Library, {user.username}!
              </h2>
              <Link href="/settings" className="text-indigo-600 hover:underline">
                Update Preferences
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Borrowed Books */}
        <motion.section
          ref={borrowedRef}
          initial="hidden"
          animate={borrowedInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Borrowed Books
            </h2>
            <Link href="/borrowed" className="text-indigo-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowed.length > 0 ? (
              borrowed.map((book, index) => (
                <motion.div
                  key={book.id}
                  custom={index}
                  initial="hidden"
                  animate={borrowedInView ? "visible" : "hidden"}
                  variants={cardVariants}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative w-full h-[225px]">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL="/books/placeholder.jpg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600">{book.author}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Due: {book.dueDate}
                    </p>
                    <button
                      onClick={() => handleReturn(book)}
                      className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      Return
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full">
                No books currently borrowed.
              </p>
            )}
          </div>
        </motion.section>

        {/* Read Books (Table) */}
        <motion.section
          ref={readRef}
          initial="hidden"
          animate={readInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Read Books</h2>
            <Link href="/read" className="text-indigo-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cover
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {readBooks.length > 0 ? (
                  readBooks.map((book, index) => (
                    <motion.tr
                      key={book.id}
                      custom={index}
                      initial="hidden"
                      animate={readInView ? "visible" : "hidden"}
                      variants={tableRowVariants}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative w-[50px] h-[75px]">
                          <Image
                            src={book.cover}
                            alt={book.title}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL="/books/placeholder.jpg"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {book.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {book.author}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-center text-gray-600"
                    >
                      No books marked as read.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Suggested Books */}
        <motion.section
          ref={suggestedRef}
          initial="hidden"
          animate={suggestedInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Suggested Books
            </h2>
            <Link href="/suggested" className="text-indigo-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedBooks.map((book, index) => (
              <motion.div
                key={book.id}
                custom={index}
                initial="hidden"
                animate={suggestedInView ? "visible" : "hidden"}
                variants={cardVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full h-[225px]">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/books/placeholder.jpg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {book.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}