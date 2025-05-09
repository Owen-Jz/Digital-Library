"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Navbar } from "../Navbar";
import Library from "./Library";
import { Footer } from "../Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Library />
      <Footer />
    </div>
  );
}
