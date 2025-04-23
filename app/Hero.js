"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/library?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Animation for auto-hover effect
  const imageAnimation = {
    y: [0, -10, 0], // Move up and down
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="bg-white py-8 md:py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl sm:text-7xl md:text-7xl font-bold text-[#1E7C84] font-raleway">
            Digital Library
          </h1>
          <p className="text-base sm:text-sm md:text-lg text-slate-600 max-w-md font-raleway">
            Explore thousands of eBooks, journals, and research papers—anytime,
            anywhere. Unlock endless learning opportunities and fuel your
            curiosity with just a click.
          </p>
          <form
            onSubmit={handleSearch}
            className="flex items-center max-w-md bg-gray-100 rounded-full p-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a book..."
              className="flex-1 px-3 py-1 text-slate-700 text-base outline-none rounded-full bg-transparent font-raleway"
              aria-label="Search books"
            />
            <button
              type="submit"
              className="p-2 bg-teal-600 rounded-full hover:bg-teal-700 transition"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
        <div className="flex-1 mt-6 md:mt-0">
          <motion.div animate={imageAnimation}>
            <Image
              src="/bg.png"
              alt="Digital Library Books"
              width={1920}
              height={1080}
              className="w-full h-auto max-h-[500px] object-cover rounded-lg opacity-95 hover:scale-105 hover:opacity-100 transition duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
