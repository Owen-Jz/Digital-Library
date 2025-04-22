"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export function RecentAdditions() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data, error } = await supabase
          .from("books")
          .select("id, title, author, cover, description")
          .in("id", [8, 9, 10, 11]) // Fetch recent books by ID
          .order("publication_date", { ascending: false });
        if (error) {
          console.error("Error fetching recent books:", error);
          setError("Failed to load recent books.");
          return;
        }
        console.log("Fetched recent books:", data);
        setBooks(data);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Loading recent books...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8">
          Recent Additions
          <div className="w-16 h-1 bg-teal-600 mx-auto mt-2"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <motion.div
              key={book.id || `book-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="p-4 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 hover:scale-105 transition duration-300"
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
                <div className="relative w-full h-[200px]">
                  <Image
                    src={book.cover || "/books/placeholder.jpg"}
                    alt={book.title || "Book cover"}
                    fill
                    style={{ objectFit: "cover" }}
                    placeholder="blur"
                    blurDataURL="/books/placeholder.jpg"
                    className="rounded-md mb-4"
                    onError={(e) => {
                      console.error(`Failed to load image: ${book.cover}`);
                      e.target.src = "/books/placeholder.jpg";
                    }}
                  />
                </div>
                <h3 className="text-lg font-bold text-teal-600">
                  {book.title || "Untitled"}
                </h3>
                <p className="text-sm text-slate-600 mb-2">
                  by {book.author || "Unknown Author"}
                </p>
                <p className="text-base text-slate-600">
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
