"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock book data (matches Featuredbooks.js and MyLibrary.js)
const allBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    cover: "/1.jpg",
    dueDate: "2025-05-10",
    description:
      "A comprehensive guide to algorithms, covering sorting, searching, graph algorithms, and more.",
    publicationDate: "2009-07-31",
    genre: "Computer Science",
    isbn: "978-0262033848",
    status: "borrowed",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "/2.jpg",
    dueDate: "2025-05-15",
    description:
      "A classic novel exploring love, class, and social expectations in 19th-century England.",
    publicationDate: "1813-01-28",
    genre: "Romance",
    isbn: "978-0141439518",
    status: "borrowed",
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "/6.jpeg",
    dueDate: "2025-05-15",
    description:
      "A classic novel exploring love, class, and social expectations in 19th-century England.",
    publicationDate: "1813-01-28",
    genre: "Romance",
    isbn: "978-0141439518",
    status: "borrowed",
  },
  {
    id: 5,
    title: "Data Structures",
    author: "Mark Allen Weiss",
    cover: "/3.jpeg",
    description:
      "An in-depth exploration of data structures, including arrays, linked lists, trees, and graphs.",
    publicationDate: "2013-10-31",
    genre: "Computer Science",
    isbn: "978-0132576277",
    status: "read",
  },
  {
    id: 6,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/4.jpeg",
    description:
      "A powerful story of racial injustice and the loss of innocence in a small Southern town.",
    publicationDate: "1960-07-11",
    genre: "Fiction",
    isbn: "978-0446310789",
    status: "read",
  },
  {
    id: 4,
    title: "Physics for Scientists",
    author: "Paul A. Tipler",
    cover: "/5.jpeg",
    description:
      "Core physics concepts for scientists and engineers, covering mechanics, electricity, and more.",
    publicationDate: "2007-08-15",
    genre: "Physics",
    isbn: "978-1429201247",
    status: "suggested",
  },
  {
    id: 7,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    cover: "6.jpeg",
    description:
      "A tale of wealth, love, and the American Dream in the Jazz Age.",
    publicationDate: "1925-04-10",
    genre: "Fiction",
    isbn: "978-0743273565",
    status: "suggested",
  },
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
                    alt={book.title || "Book cover"}
                    layout="fill"
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/books/placeholder.jpg"
                    className="rounded-md"
                    onError={() =>
                      console.error(`Failed to load image: ${book.cover}`)
                    }
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {book.title || "Untitled"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {book.author || "Unknown Author"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Due: {book.dueDate || "N/A"}
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

export default function BookDetails() {
  const { id } = useParams();
  const book = allBooks.find((b) => b.id === parseInt(id));
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // State for return modal
  const [modalOpen, setModalOpen] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState(
    allBooks.filter((b) => b.status === "borrowed")
  );

  const handleReturn = () => {
    setModalOpen(true);
  };

  const confirmReturn = (bookId) => {
    setBorrowedBooks(borrowedBooks.filter((b) => b.id !== bookId));
    // In a real app, send a request to Supabase
    console.log(`Returning book with ID: ${bookId}`);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600 text-center">Book not found.</p>
          <Link
            href="/userdashboard"
            className="mt-4 inline-block text-teal-600 hover:underline"
          >
            Back to My Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Return Modal */}
        {book.status === "borrowed" && (
          <ReturnModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            book={book}
            onConfirm={confirmReturn}
          />
        )}

        {/* Book Details Section */}
        <motion.section
          ref={sectionRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="mb-12"
        >
          <div className="bg-white rounded-lg shadow-md p-6 md:flex md:gap-8">
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-[200px] h-[300px]">
                <Image
                  src={book.cover}
                  alt={book.title || "Book cover"}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="/books/placeholder.jpg"
                  className="rounded-md"
                  onError={() =>
                    console.error(`Failed to load image: ${book.cover}`)
                  }
                />
              </div>
            </div>
            <div className="md:w-2/3 mt-6 md:mt-0">
              <h1 className="text-3xl font-semibold text-gray-900">
                {book.title || "Untitled"}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {book.author || "Unknown Author"}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Genre: {book.genre || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Published: {book.publicationDate || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ISBN: {book.isbn || "N/A"}
              </p>
              {book.dueDate && (
                <p className="text-sm text-gray-500 mt-1">
                  Due: {book.dueDate}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Status:{" "}
                {(book.status || "unknown").charAt(0).toUpperCase() +
                  (book.status || "unknown").slice(1)}
              </p>
              <p className="text-gray-700 mt-4">
                {book.description || "No description available"}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/userdashboard"
                  className="px-6 py-2 bg-gray-100 text-slate-800 rounded-full font-medium hover:bg-gray-200 transition-colors text-center"
                >
                  Back to My Library
                </Link>
                {book.status === "borrowed" && (
                  <button
                    onClick={handleReturn}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Return
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
