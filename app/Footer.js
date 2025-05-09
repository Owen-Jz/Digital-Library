"use client";

import Link from "next/link";

export function Footer() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Books", href: "/books" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg
          className="w-6 h-6 text-teal-600 hover:text-teal-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg
          className="w-6 h-6 text-teal-600 hover:text-teal-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg
          className="w-6 h-6 text-teal-600 hover:text-teal-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-8">
          {/* Logo and Contact */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent"
            >
              Digital Library
              {/* Optional: Replace with image logo */}
              {/* <img src="/logo.png" alt="Digital Library Logo" className="h-8" /> */}
            </Link>
            <p className="text-base text-slate-600">
              Explore thousands of eBooks, journals, and more.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-slate-600">
                Email:{" "}
                <a
                  href="mailto:info@digitallibrary.com"
                  className="hover:text-teal-500 transition"
                >
                  info@digitallibrary.com
                </a>
              </p>
              <p className="text-sm text-slate-600">
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="hover:text-teal-500 transition"
                >
                  +1 (234) 567-890
                </a>
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-base text-slate-600 hover:text-teal-500 hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-105 focus:ring-2 focus:ring-teal-600 focus:outline-none transition"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-100 pt-4 text-center">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Digital Library. All rights reserved.
          </p>
          <div className="w-16 h-1 bg-teal-600 mx-auto mt-2"></div>
        </div>
      </div>
    </footer>
  );
}
