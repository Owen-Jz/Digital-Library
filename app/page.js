"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Categories } from "./Categories";
import { RecentAdditions } from "./Recentadditions";
import { Featuredbooks } from "./Featurebooks";
import { Footer } from "./Footer";

// Animation variants for different sections
const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const categoriesVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const featuredBooksVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const recentAdditionsVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const footerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Home() {
  // Create refs for each section to track visibility
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const featuredBooksRef = useRef(null);
  const recentAdditionsRef = useRef(null);
  const footerRef = useRef(null);

  // Track when each section is in view
  const heroInView = useInView(heroRef, { once: true, margin: "-50px" });
  const categoriesInView = useInView(categoriesRef, {
    once: true,
    margin: "-50px",
  });
  const featuredBooksInView = useInView(featuredBooksRef, {
    once: true,
    margin: "-50px",
  });
  const recentAdditionsInView = useInView(recentAdditionsRef, {
    once: true,
    margin: "-50px",
  });
  const footerInView = useInView(footerRef, { once: true, margin: "-0px" });

  return (
    <div>
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={heroVariants}
      >
        <Hero />
      </motion.div>
      <motion.div
        ref={categoriesRef}
        initial="hidden"
        animate={categoriesInView ? "visible" : "hidden"}
        variants={categoriesVariants}
      >
        <Categories />
      </motion.div>
      <motion.div
        ref={featuredBooksRef}
        initial="hidden"
        animate={featuredBooksInView ? "visible" : "hidden"}
        variants={featuredBooksVariants}
      >
        <Featuredbooks />
      </motion.div>
      <motion.div
        ref={recentAdditionsRef}
        initial="hidden"
        animate={recentAdditionsInView ? "visible" : "hidden"}
        variants={recentAdditionsVariants}
      >
        <RecentAdditions />
      </motion.div>
      <motion.div
        ref={footerRef}
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
        variants={footerVariants}
      ></motion.div>
    </div>
  );
}
