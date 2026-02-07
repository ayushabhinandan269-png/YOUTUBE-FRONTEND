import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Layout({ user, search, setSearch }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* HEADER */}
      <Header
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        search={search}
        setSearch={setSearch}
        user={user}
      />

      {/* BODY */}
      <div className="flex flex-1 pt-16 relative">

        {/* MOBILE OVERLAY */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto bg-white relative z-20">
          <div className="px-3 sm:px-4 md:px-6 py-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;

