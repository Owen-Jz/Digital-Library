"use client";

export function Categories() {
  const categories = [
    {
      title: "Fiction",
      description:
        "Explore novels and literary works to inspire creativity and critical thinking for university students.",
      icon: (
        <svg
          className="w-10 h-10 text-teal-600 hover:text-teal-800 hover:rotate-12 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      title: "Non-Fiction",
      description:
        "Discover biographies, essays, and research-driven texts to support academic inquiry and professional growth.",
      icon: (
        <svg
          className="w-10 h-10 text-teal-600 hover:text-teal-800 hover:rotate-12 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Academic",
      description:
        "Access journals, textbooks, and research papers essential for university coursework and scholarly research.",
      icon: (
        <svg
          className="w-10 h-10 text-teal-600 hover:text-teal-800 hover:rotate-12 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-gray-50 py-12 border-t border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent tracking-tight relative group font-raleway">
          Browse by Category
          <span className="block w-24 h-1 bg-gradient-to-r from-teal-600 to-teal-800 mx-auto mt-3 transform group-hover:scale-x-110 transition-transform duration-300"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/categories/${category.title.toLowerCase()}`}
              className="block p-4 sm:p-6 lg:p-8 bg-white rounded-xl border border-gray-100 hover:bg-gradient-to-br hover:from-teal-50 hover:to-teal-100 hover:border-teal-600 hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_0_10px_rgba(20,184,166,0.3)] focus:ring-4 focus:ring-teal-600/50 focus:outline-none transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={`Explore ${category.title} category`}
              tabIndex="0"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-teal-50 p-3 rounded-full transform hover:scale-110 hover:bg-teal-100 transition">
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-teal-600 font-raleway">
                  {category.title}
                </h3>
              </div>
              <p className="text-base text-slate-600 font-raleway">
                {category.description}
              </p>
            </a>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
