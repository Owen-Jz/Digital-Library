"use client";

import DashNavbar from "../dashboard/DashNavbar";
import Sidebar from "../dashboard/Sidebar";
import DashboardContent from "./Main";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar for medium and larger screens */}
      <DashNavbar />

      {/* Sidebar and Main Content */}
      <div className="flex flex-1">
        {/* Sidebar: Fixed on the left for md and larger, top navbar for smaller screens */}
        <Sidebar />

        {/* Main Content: Adjust margin for sidebar on larger screens, or top navbar on mobile */}
        <main className="flex-1 md:ml-16 lg:ml-20 pt-16 md:pt-24 p-4 sm:p-6 md:p-8 bg-gray-100">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
