"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ReturnModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Extract book details from query parameters
  const book = {
    id: searchParams.get("bookId"),
    title: decodeURIComponent(searchParams.get("title") || ""),
    author: decodeURIComponent(searchParams.get("author") || ""),
    cover: decodeURIComponent(
      searchParams.get("cover") || "/books/placeholder.jpg"
    ),
  };

  useEffect(() => {
    // Simulate backend call to return the book
    const returnBook = async () => {
      // In a real app, update Supabase or API
      // e.g., await supabase.from("borrowed_books").delete().eq("id", book.id);
      console.log(`Returning book: ${book.title}`);
    };
    returnBook();
  }, [book.id, book.title]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          ref={sectionRef}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="flex items-center justify-center min-h-[calc(100vh-8rem)]"
        >
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="relative w-32 h-48 mx-auto">
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
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Book Returned Successfully!
            </h2>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">{book.title}</span> by {book.author}{" "}
              has been returned.
            </p>
            <p className="text-gray-500 mb-6">
              Thank you for using Digital Library!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors"
              >
                Back to My Library
              </Link>
              <Link
                href="/library"
                className="px-6 py-2 bg-gray-100 text-slate-800 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Browse More Books
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
