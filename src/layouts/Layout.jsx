import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Layout({ user, search, setSearch }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen overflow-hidden">

      {/* HEADER */}
      <Header
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
        search={search}
        setSearch={setSearch}
        user={user}
      />

      {/* BODY */}
      <div className="pt-16 h-full flex">

        {/* SIDEBAR */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* MAIN CONTENT (flex handles resize naturally) */}
        <main className="flex-1 bg-white overflow-hidden">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;








