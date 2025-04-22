"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../Navbar";

// Animation variants
const heroVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

const inputVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Contact() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookTitle: "",
    author: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.bookTitle.trim())
      newErrors.bookTitle = "Book title is required";
    if (!formData.author.trim()) newErrors.author = "Author name is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Mock submission (replace with Supabase integration)
    console.log("Submitting book request:", formData);
    // Example Supabase integration:
    /*
    import { supabase } from "../lib/supabase";
    const { error } = await supabase.from("book_requests").insert({
      name: formData.name,
      email: formData.email,
      book_title: formData.bookTitle,
      author: formData.author,
      message: formData.message,
      created_at: new Date().toISOString(),
    });
    if (error) {
      console.error("Error submitting request:", error.message);
      return;
    }
    */

    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      bookTitle: "",
      author: "",
      message: "",
    });
    setTimeout(() => setIsSubmitted(false), 5000); // Reset success message after 5 seconds
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="mb-12"
        >
          <div className="relative bg-gradient-to-r from-indigo-50 to-gray-100 rounded-xl shadow-lg p-8 text-center">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Request a Book
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Can't find the book you're looking for? Let us know, and we'll
                do our best to add it to our library!
              </p>
            </div>
          </div>
        </motion.section>

        {/* Form Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={formVariants}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8"
        >
          {isSubmitted ? (
            <div className="text-center py-6">
              <svg
                className="w-16 h-16 text-indigo-600 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Request Submitted!
              </h3>
              <p className="text-gray-600">
                Thank you for your request. We'll review it and get back to you
                soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <motion.div
                custom={0}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 text-gray-700 border ${
                    errors.name ? "border-red-500" : "border-gray-200"
                  } rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors`}
                  placeholder="Jane Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </motion.div>

              {/* Email */}
              <motion.div
                custom={1}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 text-gray-700 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors`}
                  placeholder="jane.doe@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </motion.div>

              {/* Book Title */}
              <motion.div
                custom={2}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label
                  htmlFor="bookTitle"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Book Title
                </label>
                <input
                  type="text"
                  id="bookTitle"
                  name="bookTitle"
                  value={formData.bookTitle}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 text-gray-700 border ${
                    errors.bookTitle ? "border-red-500" : "border-gray-200"
                  } rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors`}
                  placeholder="e.g., Introduction to Algorithms"
                />
                {errors.bookTitle && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.bookTitle}
                  </p>
                )}
              </motion.div>

              {/* Author */}
              <motion.div
                custom={3}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 text-gray-700 border ${
                    errors.author ? "border-red-500" : "border-gray-200"
                  } rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors`}
                  placeholder="e.g., Thomas H. Cormen"
                />
                {errors.author && (
                  <p className="mt-1 text-sm text-red-500">{errors.author}</p>
                )}
              </motion.div>

              {/* Message */}
              <motion.div
                custom={4}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-800 mb-1"
                >
                  Additional Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                  placeholder="Any additional details about the book or your request..."
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                custom={5}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
              >
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                >
                  Submit Request
                </button>
              </motion.div>
            </form>
          )}
        </motion.section>
      </div>
    </div>
  );
}
