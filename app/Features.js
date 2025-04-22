"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Mock book data (matches book/[id]/page.js)
const featuredBooks = [
  {
    id: 1,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    cover: "/1.jpg",
    description:
      "A comprehensive guide to algorithms, covering sorting, searching, graph algorithms, and more.",
  },
  {
    id: 2,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    cover: "/2.jpg",
    description:
      "A classic novel exploring love, class, and social expectations in 19th-century England.",
  },
  {
    id: 6,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    cover: "/4.jpeg",
    description:
      "A powerful story of racial injustice and the loss of innocence in a small Southern town.",
  },
];

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export function Featuredbooks() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8">
          Featured Books
          <div className="w-16 h-1 bg-teal-600 mx-auto mt-2"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredBooks.map((book, index) => (
            <motion.div
              key={book.id || `book-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300"
            >
              <Link
                href={book.id ? `/book/${book.id}` : "#"}
                className="block"
                onClick={() => {
                  if (!book.id) {
                    console.warn("Book ID is missing");
                    return;
                  }
                  console.log(`Navigating to /book/${book.id}`);
                }}
              >
                <div className="relative w-full h-[225px]">
                  <Image
                    src={book.cover || "/placeholder.png"}
                    alt={book.title || "Book cover"}
                    fill
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="/placeholder.png"
                    className="rounded-t-md"
                    onError={(e) => {
                      console.error(`Failed to load image: ${book.cover}`);
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {book.title || "Untitled"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {book.author || "Unknown Author"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {book.description || "No description available"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
