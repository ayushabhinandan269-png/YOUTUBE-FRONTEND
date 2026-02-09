import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Layout({ user, search, setSearch }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /* ================= DARK MODE STATE ================= */
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  /* ================= APPLY THEME ON LOAD ================= */
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (
      storedTheme === "dark" ||
      (!storedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  /* ================= TOGGLE THEME ================= */
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">

      {/* HEADER */}
      <Header
        onToggle={() => setIsSidebarOpen((prev) => !prev)}
        search={search}
        setSearch={setSearch}
        user={user}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />

      {/* BODY */}
      <div className="pt-16 h-full flex">

        {/* SIDEBAR */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto bg-white dark:bg-black transition-colors duration-300">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;









