import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Layout({ children, user, search, setSearch }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Header
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        search={search}
        setSearch={setSearch}
        user={user}
      />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}

export default Layout;
