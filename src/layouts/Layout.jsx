import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Layout({ user, search, setSearch }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    /* Page height locked */
    <div className="h-screen overflow-hidden">

      {/* FIXED HEADER */}
      <Header
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
        search={search}
        setSearch={setSearch}
        user={user}
      />

      {/* BODY BELOW HEADER */}
      <div className="pt-16 h-full flex">

        {/* SIDEBAR (LEFT NAV) */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />

        {/* MAIN AREA */}
        <main className="flex-1 bg-white">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;






