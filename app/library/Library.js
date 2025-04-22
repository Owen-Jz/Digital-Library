"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Mock book data (replace with API or database fetch)
const books = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    department: "Computer Science",
    semester: "3rd",
    genre: "Textbook",
    cover: "/books/algorithms.jpg",
    description: "A comprehensive guide to algorithms.",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    department: "Literature",
    semester: "2nd",
    genre: "Fiction",
    cover: "/books/pride.jpg",
    description: "A classic romance novel.",
  },
  {
    id: 3,
    title: "Physics for Scientists",
    author: "Paul A. Tipler",
    department: "Physics",
    semester: "1st",
    genre: "Textbook",
    cover: "/books/physics.jpg",
    description: "Core physics concepts.",
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    department: "Literature",
    semester: "4th",
    genre: "Fiction",
    cover: "/books/gatsby.jpg",
    description: "A tale of the Jazz Age.",
  },
  {
    id: 5,
    title: "Data Structures",
    author: "Mark Allen Weiss",
    department: "Computer Science",
    semester: "2nd",
    genre: "Textbook",
    cover: "/books/datastructures.jpg",
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

export default function Library() {
  // State for filters, sort, and search
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("title-asc");
  const [search, setSearch] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Hero Section with Search Bar */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={heroVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
      >
        <div className="relative bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 rounded-lg shadow-lg p-8">
          <div className="absolute inset-0 backdrop-blur-sm rounded-lg"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Library
            </h2>
            <div className="max-w-2xl mx-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a book by title..."
                className="w-full bg-white text-gray-700 border border-gray-300 rounded-full px-6 py-3 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
              />
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-lg shadow-sm">
          {/* Department Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Department
            </label>
            <button
              onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
              className="w-full bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {department || "All Departments"}
            </button>
            {isDepartmentOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
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
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Semester
            </label>
            <button
              onClick={() => setIsSemesterOpen(!isSemesterOpen)}
              className="w-full bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {semester || "All Semesters"}
            </button>
            {isSemesterOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
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
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Genre
            </label>
            <button
              onClick={() => setIsGenreOpen(!isGenreOpen)}
              className="w-full bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {genres.length > 0 ? genres.join(", ") : "All Genres"}
            </button>
            {isGenreOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
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
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Sort By
            </label>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {sortOptions.find((opt) => opt.value === sort)?.label ||
                "Title (A-Z)"}
            </button>
            {isSortOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
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
        </div>
      </motion.section>

      {/* Books Grid */}
      <motion.section
        ref={booksRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                custom={index}
                initial="hidden"
                animate={booksInView ? "visible" : "hidden"}
                variants={bookCardVariants}
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
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
                      Borrow
                    </button>
                    <button className="flex-1 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 transition-colors">
                      Download
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
      </motion.section>
    </div>
  );
}
