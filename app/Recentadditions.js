/* components/RecentAdditions.js */
"use client";
import Image from "next/image";

export function RecentAdditions() {
  const books = [
    {
      title: "Mystery of the Ages",
      author: "Alice Carter",
      description: "A thrilling mystery that unravels ancient secrets.",
      image: "/1.jpg",
    },
    {
      title: "Tech Frontiers",
      author: "Mark Wilson",
      description:
        "Discover the latest advancements in technology and innovation.",
      image: "/2.jpg",
    },
    {
      title: "Scholarly Pursuits",
      author: "Dr. Laura Green",
      description: "In-depth research papers for academic enthusiasts.",
      image: "/3.jpeg",
    },
    {
      title: "Adventure Stories",
      author: "Tom Baker",
      description: "Exciting tales for young readers and adventurers.",
      image: "/4.jpeg",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8">
          Recent Additions
          <div className="w-16 h-1 bg-teal-600 mx-auto mt-2"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 hover:scale-105 transition duration-300"
            >
              <Image
                src={book.image}
                alt={book.title}
                width={800}
                height={400}
                className="w-full h-[400px] object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold text-teal-600">{book.title}</h3>
              <p className="text-sm text-slate-600 mb-2">by {book.author}</p>
              <p className="text-base text-slate-600">{book.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
