"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/library");
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
          <div className="flex items-center max-w-md">
            <button
              onClick={handleGetStarted}
              className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition font-raleway"
              aria-label="Get Started"
            >
              Get Started
            </button>
          </div>
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
