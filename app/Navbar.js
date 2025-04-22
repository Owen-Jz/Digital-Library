"use client";

import { useState } from "react";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSession, setIsSession] = useState(true); // Simulates logged-in state; replace with auth check

  const navItems = [
    { name: "Home", href: "/", active: true },
    { name: "Library", href: "/library" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white text-slate-800 p-4 sticky top-0 z-50 shadow-gray-950">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent"
        >
          Digital Library
          {/* Optional: Replace with image logo */}
          {/* <img src="/logo.png" alt="Digital Library Logo" className="h-8" /> */}
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-teal-600 rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
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
              className="w-6 h-6"
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

        {/* Navigation Links and Auth/Dashboard */}
        <div className="flex items-center gap-5">
          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`${
              isOpen ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0 fixed md:static right-0 top-0 h-full w-64 md:w-auto bg-white md:bg-transparent p-4 md:p-0 flex flex-col md:flex-row md:items-center gap-6 transition-transform duration-300 border-l-4 border-teal-600 md:border-0`}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-base ${
                  item.active ? "text-teal-600 font-semibold" : "text-slate-800"
                } hover:text-teal-500 hover:underline focus:ring-2 focus:ring-teal-600 focus:outline-none rounded transition`}
                aria-current={item.active ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Auth/Dashboard */}
            <div className="flex flex-col gap-2 md:hidden">
              {isSession ? (
                <a
                  href="/userdashboard"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-slate-800 rounded-full text-base font-medium hover:bg-gray-200 hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
                >
                  <Image
                    src="/profile-placeholder.jpg" // Replace with actual user profile picture URL
                    alt="User Profile"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  Dashboard
                </a>
              ) : (
                <>
                  <a
                    href="/login"
                    className="px-4 py-2 bg-gray-100 text-slate-800 rounded-full text-base font-medium hover:bg-gray-200 hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-full text-base font-medium hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
                  >
                    Sign Up
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Desktop Auth/Dashboard */}
          <div className="hidden md:flex items-center gap-3">
            {isSession ? (
              <a
                href="/userdashboard"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-slate-800 rounded-full text-base font-medium hover:bg-gray-200 hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
              >
                <Image
                  src="/profile.png" // Replace with actual user profile picture URL
                  alt="User Profile"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                Profile
              </a>
            ) : (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 bg-gray-100 text-slate-800 rounded-full text-base font-medium hover:bg-gray-200 hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-full text-base font-medium hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
