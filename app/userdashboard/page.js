"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

// Mock user and book data (replace with API or database fetch)
const user = {
  username: "Jane Doe",
  profilePicture: "/profile.png",
  favoriteGenres: ["Fiction", "Science", "Classics"], // Mock data for personalization
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

const recentlyViewedBooks = [
  {
    id: 7,
    title: "1984",
    author: "George Orwell",
    cover: "/7.jpeg",
  },
  {
    id: 8,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    cover: "/8.jpeg",
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
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
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
  const recentlyViewedRef = useRef(null);
  const profileInView = useInView(profileRef, { once: true, margin: "-100px" });
  const borrowedInView = useInView(borrowedRef, {
    once: true,
    margin: "-100px",
  });
  const readInView = useInView(readRef, { once: true, margin: "-100px" });
  const suggestedInView = useInView(suggestedRef, {
    once: true,
    margin: "-100px",
  });
  const recentlyViewedInView = useInView(recentlyViewedRef, {
    once: true,
    margin: "-100px",
  });

  // State for borrowed books, modal, sorting, and favorites
  const [borrowed, setBorrowed] = useState(borrowedBooks);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sortBy, setSortBy] = useState("title"); // Sorting state for read books
  const [favorites, setFavorites] = useState([]); // State for suggested books favorites

  const handleReturn = (book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const confirmReturn = (bookId) => {
    setBorrowed(borrowed.filter((book) => book.id !== bookId));
    console.log(`Returning book with ID: ${bookId}`);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/";
  };

  // Sort read books based on sortBy state
  const sortedReadBooks = [...readBooks].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "author") {
      return a.author.localeCompare(b.author);
    }
    return 0;
  });

  // Toggle favorite for suggested books
  const toggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  // Check if a book is overdue (past April 22, 2025)
  const isOverdue = (dueDate) => {
    const today = new Date("2025-04-22");
    const due = new Date(dueDate);
    return due < today;
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
            <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4">
              <Image
                src={user.profilePicture}
                alt={`${user.username}'s profile picture`}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Welcome back, {user.username}! It's Tuesday, April 22, 2025
                </h2>
                <p className="text-gray-600 mt-1">
                  Your favorite genres: {user.favoriteGenres.join(", ")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Link
                    href="/settings"
                    className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-600 rounded"
                  >
                    Update Preferences
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-600 rounded"
                    aria-label="Log out"
                  >
                    Log Out
                  </button>
                </div>
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
              <Link
                href="/borrowed"
                className="text-indigo-600 hover:underline"
              >
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
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                      {isOverdue(book.dueDate) && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                          Overdue
                        </span>
                      )}
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
              <h2 className="text-2xl font-semibold text-gray-900">
                Read Books
              </h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-100 text-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                  >
                    <option value="title">Sort by Title</option>
                    <option value="author">Sort by Author</option>
                  </select>
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700 pointer-events-none"
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
                </div>
                <Link href="/read" className="text-indigo-600 hover:underline">
                  View All
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-x-auto">
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
                  {sortedReadBooks.length > 0 ? (
                    sortedReadBooks.map((book, index) => (
                      <motion.tr
                        key={book.id}
                        custom={index}
                        initial="hidden"
                        animate={readInView ? "visible" : "hidden"}
                        variants={tableRowVariants}
                        className="hover:bg-gray-50 transition-colors"
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

          {/* Recently Viewed Books */}
          <motion.section
            ref={recentlyViewedRef}
            initial="hidden"
            animate={recentlyViewedInView ? "visible" : "hidden"}
            variants={sectionVariants}
            className="mb-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Recently Viewed
              </h2>
              <Link
                href="/recently-viewed"
                className="text-indigo-600 hover:underline"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentlyViewedBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  custom={index}
                  initial="hidden"
                  animate={recentlyViewedInView ? "visible" : "hidden"}
                  variants={cardVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                  </div>
                </motion.div>
              ))}
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
              <Link
                href="/suggested"
                className="text-indigo-600 hover:underline"
              >
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
                  className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                    <button
                      onClick={() => toggleFavorite(book.id)}
                      className="mt-4 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-teal-600 rounded"
                      aria-label={
                        favorites.includes(book.id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      <svg
                        className={`w-5 h-5 ${
                          favorites.includes(book.id)
                            ? "fill-current text-indigo-600"
                            : "fill-none stroke-current"
                        }`}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                        />
                      </svg>
                      {favorites.includes(book.id)
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
        </div>
      </div>
      <Footer />
    </div>
  );
}
