"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Home",
    href: "/admin/dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Books",
    href: "/admin/books",
    icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 006 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed
        bottom-0
        left-0
        w-full
        bg-white
        flex
        flex-row
        justify-around
        items-center
        py-2
        border-t
        z-10

        sm:top-[70px]
        sm:left-0
        sm:bottom-auto
        sm:flex-col
        sm:items-center
        sm:justify-start
        sm:py-6
        sm:gap-8
        sm:w-20
        md:w-24
        sm:h-screen
        sm:border-t-0
        sm:border-r
      "
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            href={item.href}
            key={item.name}
            aria-current={isActive ? "page" : undefined}
          >
            <motion.div
              className={`p-2 rounded-2xl transition-colors flex items-center justify-center
                ${isActive ? "bg-teal-200 text-teal-600" : "hover:bg-teal-100"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={item.name}
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-teal-600 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={item.icon}
                />
              </svg>
            </motion.div>
          </Link>
        );
      })}
    </aside>
  );
}
