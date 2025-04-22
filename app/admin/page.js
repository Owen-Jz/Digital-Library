"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Updated import for App Router

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

export default function AdminSignIn() {
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // Hardcoded admin credentials
  const ADMIN_EMAIL = "admin@example.com";
  const ADMIN_PASSWORD = "admin123";

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setAuthError("");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (formData.email !== ADMIN_EMAIL) newErrors.email = "Invalid email";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
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

    setIsLoading(true);
    setAuthError("");

    try {
      // Check hardcoded admin credentials
      if (
        formData.email !== ADMIN_EMAIL ||
        formData.password !== ADMIN_PASSWORD
      ) {
        throw new Error("Invalid email or password");
      }

      // Simulate a successful login delay
      setTimeout(() => {
        // Redirect to admin dashboard using useRouter
        router.push("/admin/dashboard");
      }, 1000);
    } catch (error) {
      setAuthError(error.message || "Invalid email or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="max-w-md w-full px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          className="mb-8 text-center"
        >
          <div className="relative bg-gradient-to-r from-indigo-50 to-gray-100 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Sign In
            </h2>
            <p className="text-gray-600">
              Access the admin dashboard to manage the library.
            </p>
          </div>
        </motion.section>

        {/* Form Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={formVariants}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <motion.div
              custom={0}
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
                  errors.email || authError
                    ? "border-red-500"
                    : "border-gray-200"
                } rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors disabled:cursor-not-allowed`}
                placeholder="admin@example.com"
                disabled={isLoading}
                aria-invalid={!!errors.email || !!authError}
                aria-describedby={
                  errors.email || authError ? "email-error" : undefined
                }
              />
              {(errors.email || authError) && (
                <p id="email-error" className="mt-1 text-sm text-red-500">
                  {errors.email || authError}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              custom={1}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 text-gray-700 border ${
                    errors.password || authError
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors disabled:cursor-not-allowed`}
                  placeholder="••••••"
                  disabled={isLoading}
                  aria-invalid={!!errors.password || !!authError}
                  aria-describedby={
                    errors.password || authError ? "password-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
              {(errors.password || authError) && (
                <p id="password-error" className="mt-1 text-sm text-red-500">
                  {errors.password || authError}
                </p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              custom={2}
              variants={inputVariants}
              initial="hidden"
              animate="visible"
            >
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors disabled:bg-indigo-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </motion.div>
          </form>

          {/* Back to Home Link */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-indigo-600 hover:underline focus:outline-none focus:ring-2 focus:ring-teal-600 rounded"
            >
              Back to Home
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
