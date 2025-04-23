"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Mock book data (replace with API or database fetch)
const books = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    department: "Computer Science",
    semester: "3rd",
    genre: "Textbook",
    cover: "/1.jpg",
    description: "A comprehensive guide to algorithms.",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    department: "Literature",
    semester: "2nd",
    genre: "Fiction",
    cover: "/2.jpg",
    description: "A classic romance novel.",
  },
  {
    id: 3,
    title: "Physics for Scientists",
    author: "Paul A. Tipler",
    department: "Physics",
    semester: "1st",
    genre: "Textbook",
    cover: "/3.jpeg",
    description: "Core physics concepts.",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    department: "Literature",
    semester: "4th",
    genre: "Fiction",
    cover: "/4.jpeg",
    description: "A tale of the Jazz Age.",
  },
  {
    id: 5,
    title: "Data Structures",
    author: "Mark Allen Weiss",
    department: "Computer Science",
    semester: "2nd",
    genre: "Textbook",
    cover: "/6.jpeg",
    description: "In-depth data structures.",
  },
];

// Animation variants
const heroVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const filterVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

const bookCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Generate a random 8-character code ID
const generateCodeId = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

export default function Library() {
  // State for filters, sort, search, and view mode
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("title-asc");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // State for dropdown visibility
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isSemesterOpen, setIsSemesterOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const filterRef = useRef(null);
  const booksRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const filterInView = useInView(filterRef, { once: true, margin: "-100px" });
  const booksInView = useInView(booksRef, { once: true, margin: "-100px" });

  // Filter and sort books
  const filteredBooks = books
    .filter((book) => {
      return (
        (!department || book.department === department) &&
        (!semester || book.semester === semester) &&
        (genres.length === 0 || genres.includes(book.genre)) &&
        (!search || book.title.toLowerCase().includes(search.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  // Options for filters
  const departmentOptions = ["Computer Science", "Literature", "Physics"];
  const semesterOptions = ["1st", "2nd", "3rd", "4th"];
  const genreOptions = ["Textbook", "Fiction", "Non-Fiction"];
  const sortOptions = [
    { value: "title-asc", label: "Title (A-Z)" },
    { value: "title-desc", label: "Title (Z-A)" },
  ];

  // Handle genre selection (toggle)
  const toggleGenre = (genre) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setDepartment("");
    setSemester("");
    setGenres([]);
    setSort("title-asc");
    setSearch("");
  };

  // Handle borrow button click
  const handleBorrow = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // Handle copy code
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  // Generate borrowing details
  const issueDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);
  const formattedDueDate = dueDate.toISOString().split("T")[0]; // YYYY-MM-DD
  const codeId = generateCodeId();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero Section with Search Bar */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={heroVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="relative bg-gradient-to-r from-indigo-50 to-gray-100 rounded-xl shadow-lg p-8">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Digital Library Catalog
            </h2>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a book by title..."
                className="w-full bg-white text-gray-700 border border-gray-200 rounded-full pl-12 pr-6 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Filter Section */}
      <motion.section
        ref={filterRef}
        initial="hidden"
        animate={filterInView ? "visible" : "hidden"}
        variants={filterVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-6 rounded-xl shadow-sm">
          {/* Department Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-1 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                />
              </svg>
              Department
            </label>
            <button
              onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
              className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-md px-4 py-2 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-600 flex items-center justify-between"
            >
              {department || "All Departments"}
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
            {isDepartmentOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                <button
                  onClick={() => {
                    setDepartment("");
                    setIsDepartmentOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                >
                  All Departments
                </button>
                {departmentOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setDepartment(option);
                      setIsDepartmentOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Semester Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-1 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Semester
            </label>
            <button
              onClick={() => setIsSemesterOpen(!isSemesterOpen)}
              className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-md px-4 py-2 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-600 flex items-center justify-between"
            >
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
            {isSemesterOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                <button
                  onClick={() => {
                    setSemester("");
                    setIsSemesterOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                >
                  All Semesters
                </button>
                {semesterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSemester(option);
                      setIsSemesterOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Genre Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-1 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"
                />
              </svg>
              Genre
            </label>
            <button
              onClick={() => setIsGenreOpen(!isGenreOpen)}
              className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-md px-4 py-2 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-600 flex items-center justify-between"
            >
              {genres.length > 0 ? genres.join(", ") : "All Genres"}
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
            {isGenreOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                {genreOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      toggleGenre(option);
                    }}
                    className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50 ${
                      genres.includes(option) ? "bg-indigo-100" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-1 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7h18M3 12h12M3 17h6"
                />
              </svg>
              Sort By
            </label>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-md px-4 py-2 text-left shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-600 flex items-center justify-between"
            >
              {sortOptions.find((opt) => opt.value === sort)?.label ||
                "Title (A-Z)"}
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
            {isSortOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSort(option.value);
                      setIsSortOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-50"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="w-full bg-black text-white rounded-md px-4 py-2 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </motion.section>

      {/* Books Section with View Toggle */}
      <motion.section
        ref={booksRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Books in Library
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md ${
                viewMode === "grid"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors`}
              aria-label="Switch to grid view"
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md ${
                viewMode === "list"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors`}
              aria-label="Switch to list view"
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h14zm-3-8H5a2 2 0 00-2 2v2a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  custom={index}
                  initial="hidden"
                  animate={booksInView ? "visible" : "hidden"}
                  variants={bookCardVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, transparent 90%, rgba(0,0,0,0.05) 100%)",
                    boxShadow:
                      "0 4px 8px rgba(0,0,0,0.1), inset 0 -2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="relative w-full h-[300px]">
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
                    <div className="mt-2 text-sm text-gray-500 space-y-1">
                      <p>Dept: {book.department}</p>
                      <p>Semester: {book.semester}</p>
                      <p>Genre: {book.genre}</p>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Link
                        href={`/book/${book.id}`}
                        className="flex-1 bg-gray-600 text-white py-2 rounded-md text-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleBorrow(book)}
                        className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                      >
                        Borrow
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full text-center">
                No books match your filters.
              </p>
            )}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Semester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, index) => (
                    <motion.tr
                      key={book.id}
                      custom={index}
                      initial="hidden"
                      animate={booksInView ? "visible" : "hidden"}
                      variants={bookCardVariants}
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {book.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {book.semester}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {book.genre}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <Link
                            href={`/book/${book.id}`}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleBorrow(book)}
                            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                          >
                            Borrow
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-gray-600"
                    >
                      No books match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>

      {/* Borrow Modal */}
      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-4"
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <h2
              id="modal-title"
              className="text-2xl font-bold text-gray-900 mb-4"
            >
              Borrow Request
            </h2>
            <div id="modal-description" className="space-y-4">
              <p className="text-lg text-gray-700">
                <strong>Title:</strong> {selectedBook.title}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Author:</strong> {selectedBook.author}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Code ID:</strong> {codeId}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Issue Date:</strong> {issueDate}
              </p>
              <p className="text-lg text-gray-700">
                <strong>Due Date:</strong> {formattedDueDate}
              </p>
              <p className="text-sm text-gray-600">
                Please show this code ID to the librarian to borrow the book.
                Ensure the book is returned by the due date to avoid penalties.
              </p>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                onClick={() => handleCopyCode(codeId)}
                className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
              >
                Copy Code
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
