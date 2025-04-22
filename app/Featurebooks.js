/* components/FeaturedBooks.js */
"use client";

export function FeaturedBooks() {
  const books = [
    {
      title: "The Great Novel",
      author: "Jane Doe",
      description: "A captivating story of adventure and discovery.",
      image: "1.jpg",
    },
    {
      title: "Science Unveiled",
      author: "John Smith",
      description:
        "Explore the wonders of the universe in this insightful guide.",
      image: "2.jpg",
    },
    {
      title: "Academic Insights",
      author: "Dr. Emily Brown",
      description: "A collection of research papers for scholars.",
      image: "3.jpeg",
    },
    {
      title: "Magical Tales",
      author: "Sarah Lee",
      description: "Enchanting stories for young readers and families.",
      image: "4.jpeg",
    },
  ];


  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-8">
          Featured Books
          <div className="w-16 h-1 bg-teal-600 mx-auto mt-2"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 hover:scale-105 transition duration-300"
            >
              <img
                src={book.image}
                alt={book.title}
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
