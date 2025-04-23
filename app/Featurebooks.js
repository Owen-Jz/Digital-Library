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

export function Featuredbooks() {
  const books = [
    {
      id: 1,
      title: "Mystery of the Ages",
      author: "Alice Carter",
      description: "A thrilling mystery that unravels ancient secrets.",
      image: "/books/1.jpg",
    },
    {
      id: 2,
      title: "Tech Frontiers",
      author: "Mark Wilson",
      description:
        "Discover the latest advancements in technology and innovation.",
      image: "/books/2.jpg",
    },
    {
      id: 3,
      title: "Scholarly Pursuits",
      author: "Dr. Laura Green",
      description: "In-depth research papers for academic enthusiasts.",
      image: "/books/3.jpg",
    },
    {
      id: 4,
      title: "Adventure Stories",
      author: "Tom Baker",
      description: "Exciting tales for young readers and adventurers.",
      image: "/books/4.jpg",
    },
  ];

  // Helper to normalize image URL
  const getImageUrl = (image) => {
    if (!image) return "/books/placeholder.jpg";
    return image;
  };

  return (
    <section className="bg-white py-12 pt-14 sm:pt-16 md:pl-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8 font-raleway">
          Featured Books
          <div className="w-16 h-1 bg-teal-600 mx-auto mt-2"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="p-4 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 hover:scale-105 transition duration-300"
            >
              <Link
                href={`/book/${book.id}`}
                className="block"
                aria-label={`View details for ${book.title} by ${book.author}`}
              >
                <div className="relative w-full h-[400px]">
                  <Image
                    src={getImageUrl(book.image)}
                    alt={book.title || "Book cover"}
                    fill
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="/books/placeholder.jpg"
                    className="rounded-md mb-4"
                    onError={(e) => {
                      e.target.src = "/books/placeholder.jpg";
                    }}
                  />
                </div>
                <h3 className="text-lg font-bold text-teal-600 font-raleway">
                  {book.title || "Untitled"}
                </h3>
                <p className="text-sm text-slate-600 mb-2 font-raleway">
                  by {book.author || "Unknown Author"}
                </p>
                <p className="text-base text-slate-600 font-raleway">
                  {book.description || "No description available"}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
