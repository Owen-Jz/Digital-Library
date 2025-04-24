import Link from "next/link";

export default function DashNavbar() {
  return (
    <nav className="hidden md:flex bg-white px-4 py-4 sm:px-8 md:px-16 lg:px-24 justify-between items-center gap-4 sm:gap-8 fixed top-0 left-0 right-0 z-20">
      <Link href="/" className="text-black text-2xl md:text-3xl font-bold">
        Inkspire
      </Link>

      <div className="flex-grow max-w-[600px] w-full relative">
        <input
          type="text"
          placeholder="Search for a user"
          className="w-full bg-gray-200 text-gray-600 text-lg md:text-xl font-normal rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2">
          <svg
            className="w-5 h-5 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-black text-lg md:text-xl font-bold">
            Charles Fits
          </p>
          <p className="text-black text-base md:text-lg font-normal">
            Library admin
          </p>
        </div>
        <div className="w-12 h-12 bg-black rounded-full flex-shrink-0" />
      </div>
    </nav>
  );
}
