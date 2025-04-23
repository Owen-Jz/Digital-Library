"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export function Featuredbooks({ initialBooks = [] }) {
  // Mock data as fallback
  const mockBooks = [
    {
      id: 1,
      title: "Mystery of the Ages",
      author: "Alice Carter",
      description: "A thrilling mystery that unravels ancient secrets.",
      cover: "/1.jpg",
    },
    {
      id: 2,
      title: "Tech Frontiers",
      author: "Mark Wilson",
      description: "Discover the latest advancements in technology and innovation.",
      cover: "/2.jpg",
    },
    {
      id: 3,
      title: "Scholarly Pursuits",
      author: "Dr. Laura Green",
      description: "In-depth research papers for academic enthusiasts.",
      cover: "/3.jpeg",
    },
    {
      id: 4,
      title: "Adventure Stories",
      author: "Tom Baker",
      description: "Exciting tales for young readers and adventurers.",
      cover: "/4.jpeg",
    },
  ];

  // Use initialBooks if provided, else fallback to mockBooks
  const books = initialBooks.length > 0 ? initialBooks : mockBooks;

  return (
    <section className="bg-white py-12 pt-14 sm:pt-16 md:pl-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-8">
          Featured Books
          <div className="w-16 h-1 bg-teal-600 mx-auto mt-2"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book.id || `book-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300"
            >
              <Link
                href={book.id ? `/book/${book.id}` : "#"}
                className="block"
                aria-label={`View details for ${book.title} by ${book.author}`}
                onClick={() => {
                  if (!book.id) {
                    console.warn("Book ID is missing");
                  } else {
                    console.log(`Navigating to /book/${book.id}`);
                  }
                }}
              >
                <div className="relative w-full h-[200px]">
                  <Image
                    src={book.cover || book.image || "/books/placeholder.jpg"}
                    alt={book.title || "Book cover"}
                    fill
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="/books/placeholder.jpg"
                    className="rounded-t-xl"
                    onError={(e) => {
                      console.error(`Failed to load image: ${book.cover || book.image}`);
                      e.target.src = "/books/placeholder.jpg";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {book.title || "Untitled"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {book.author || "Unknown Author"}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
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
