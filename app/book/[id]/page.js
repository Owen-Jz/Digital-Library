"use client";

import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/app/Navbar";
import { Footer } from "@/app/Footer";

// Mock data (you can replace this with real fetch logic later)
const books = [
  {
    id: 1,
    title: "Mystery of the Ages",
    author: "Alice Carter",
    description: "A thrilling mystery that unravels ancient secrets.",
    cover: "/1.jpg",
    department: "Literature",
    semester: "3rd",
    genre: "Fiction",
  },
  {
    id: 2,
    title: "Tech Frontiers",
    author: "Mark Wilson",
    description:
      "Discover the latest advancements in technology and innovation.",
    cover: "/2.jpg",
    department: "Computer Science",
    semester: "4th",
    genre: "Non-Fiction",
  },
  {
    id: 3,
    title: "Scholarly Pursuits",
    author: "Dr. Laura Green",
    description: "In-depth research papers for academic enthusiasts.",
    cover: "/3.jpeg",
    department: "Physics",
    semester: "5th",
    genre: "Textbook",
  },
  {
    id: 4,
    title: "Adventure Stories",
    author: "Tom Baker",
    description: "Exciting tales for young readers and adventurers.",
    cover: "/4.jpeg",
    department: "Literature",
    semester: "2nd",
    genre: "Fiction",
  },
];

export default function BookDetail() {
  const params = useParams();
  const id = Number(params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    notFound();
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-14 sm:pt-16 md:pl-16 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="relative w-full md:w-1/3 h-[300px] sm:h-[400px]">
                <Image
                  src={book.cover || "/books/placeholder.jpg"}
                  alt={book.title}
                  fill
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL="/books/placeholder.jpg"
                  className="rounded-xl"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Department:</span>{" "}
                    {book.department || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Semester:</span>{" "}
                    {book.semester || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Genre:</span>{" "}
                    {book.genre || "N/A"}
                  </p>
                </div>
                <p className="text-base text-gray-700 mb-6">
                  {book.description}
                </p>
                <button
                  className="bg-teal-600 text-white px-6 py-2 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors"
                  onClick={() => console.log(`Borrow book ${book.id} (mock)`)}
                  aria-label={`Borrow ${book.title}`}
                >
                  Borrow Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
