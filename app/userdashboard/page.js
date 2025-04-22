"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Mock user and book data (replace with API or database fetch)
const user = {
  username: "Jane Doe",
  profilePicture: "/profile-placeholder.jpg",
};

const borrowedBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    cover: "/books/1.jpg",
    dueDate: "2025-05-10",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "/books/2.jpg",
    dueDate: "2025-05-15",
  },
];

const readBooks = [
  {
    id: 5,
    title: "Data Structures",
    author: "Mark Allen Weiss",
    cover: "/books/3.jpg",
  },
  {
    id: 6,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/books/4.jpg",
  },
];

const suggestedBooks = [
  {
    id: 3,
    title: "Physics for Scientists",
    author: "Paul A. Tipler",
    cover: "/books/5.jpg",
    description: "Core physics concepts.",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "/books/6.jpg",
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

export default function MyLibrary() {
  // Refs for scroll animations
  const profileRef = useRef(null);
  const borrowedRef = useRef(null);
  const readRef = useRef(null);
  const suggestedRef = useRef(null);
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

  // State for returning books (placeholder)
  const [borrowed, setBorrowed] = useState(borrowedBooks);

  const handleReturn = (bookId) => {
    setBorrowed(borrowed.filter((book) => book.id !== bookId));
    // In a real app, send a request to the backend to update the borrow status
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link
                href="/settings"
                className="text-indigo-600 hover:underline"
              >
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
                      onClick={() => handleReturn(book.id)}
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
