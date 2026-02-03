import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Layout({ children, user, search, setSearch }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col">

      {/* HEADER */}
      <Header
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        search={search}
        setSearch={setSearch}
        user={user}
      />

      {/* BODY */}
      <div className="flex flex-1 pt-16 overflow-hidden">

        {/* SIDEBAR */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto bg-white">
          <div className="px-6 py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
