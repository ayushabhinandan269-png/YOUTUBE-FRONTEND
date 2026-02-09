import { Link, useNavigate } from "react-router-dom";

function Header({ onToggle, search, setSearch, user, darkMode, toggleTheme }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                       px-3 md:px-6 py-3 border-b
                       bg-white dark:bg-black
                       text-black dark:text-white
                       transition-colors duration-300">

      {/* ================= LEFT ================= */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="text-2xl hover:bg-gray-100 dark:hover:bg-gray-800
                     p-2 rounded-md"
        >
          ☰
        </button>

        <Link
          to="/"
          className="text-lg md:text-xl font-bold text-red-600 tracking-tight"
        >
          YouTube
        </Link>
      </div>

      {/* ================= CENTER SEARCH (DESKTOP) ================= */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center w-125"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="flex-1 px-4 py-2 border rounded-l-full outline-none
                     bg-white dark:bg-gray-900
                     text-black dark:text-white
                     border-gray-300 dark:border-gray-700"
        />

        <button
          type="submit"
          className="px-5 py-2 border border-l-0 rounded-r-full
                     bg-gray-100 hover:bg-gray-200
                     dark:bg-gray-800 dark:hover:bg-gray-700
                     dark:border-gray-700"
        >
          🔍
        </button>
      </form>

      {/* ================= RIGHT ================= */}
      <div className="flex items-center gap-3">

        {/* Mobile search */}
        <button
          onClick={() => navigate("/")}
          className="md:hidden p-2 rounded-full
                     hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          🔍
        </button>

        {/* 🌙 DARK MODE TOGGLE */}
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-full border text-sm
                     bg-gray-100 dark:bg-gray-800
                     hover:bg-gray-200 dark:hover:bg-gray-700
                     border-gray-300 dark:border-gray-700"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {user ? (
          <>
            <span className="hidden sm:block text-sm font-medium">
              Hi, {user}
            </span>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              className="px-3 py-1 border rounded-full text-sm
                         hover:bg-gray-100 dark:hover:bg-gray-800
                         border-gray-300 dark:border-gray-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/auth"
            className="px-4 py-1.5 border rounded-full text-sm font-medium
                       hover:bg-gray-100 dark:hover:bg-gray-800
                       border-gray-300 dark:border-gray-700"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;




