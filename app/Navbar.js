"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants for mobile menu
const mobileMenuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// Animation variants for overlay
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSession, setIsSession] = useState(true); // Replace this with real auth check

  const navItems = [
    { name: "Home", href: "/", active: true },
    { name: "Library", href: "/library" },
    { name: "Request", href: "/contact" },
  ];

  return (
    <nav className="bg-white text-slate-800 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent"
          >
            Inkspire
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base ${
                item.active ? "text-teal-600 font-semibold" : "text-slate-800"
              } hover:text-teal-500 hover:underline focus:ring-2 focus:ring-teal-600 focus:outline-none rounded transition`}
              aria-current={item.active ? "page" : undefined}
            >
              {item.name}
            </Link>
          ))}
          {isSession ? (
            <Link
              href="/userdashboard"
              className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-slate-800 rounded-full text-sm font-medium hover:bg-gray-200 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
            >
              <Image
                src="/profile.png"
                alt="User Profile"
                width={24}
                height={24}
                className="rounded-full"
              />
              Welcome to Your Digital Library
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="px-5 py-2 bg-gray-100 text-slate-800 rounded-full text-sm font-medium hover:bg-gray-200 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-5 py-2 bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-full text-sm font-medium hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-teal-600 rounded p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Overlay & Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white/95 backdrop-blur-md p-6 flex flex-col gap-4 shadow-xl z-50 md:hidden"
            >
              <button
                className="self-end text-2xl focus:outline-none focus:ring-2 focus:ring-teal-600 rounded p-2"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-lg ${
                      item.active
                        ? "text-teal-600 font-semibold"
                        : "text-slate-800"
                    } hover:text-teal-500 hover:underline focus:ring-2 focus:ring-teal-600 focus:outline-none rounded transition`}
                    aria-current={item.active ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-3 mt-4">
                {isSession ? (
                  <Link
                    href="/userdashboard"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-slate-800 rounded-full text-base font-medium hover:bg-gray-200 hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src="/profile.png"
                      alt="User Profile"
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    My Library
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-6 py-3 bg-gray-100 text-slate-800 rounded-full text-base font-medium hover:bg-gray-200 hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-full text-base font-medium hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
