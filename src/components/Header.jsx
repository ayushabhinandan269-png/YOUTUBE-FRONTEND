import { Link, useNavigate } from "react-router-dom";

/* ================= AVATAR COLOR HELPER ================= */
const avatarColors = [
  "bg-red-100 text-red-600",
  "bg-green-100 text-green-600",
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-pink-100 text-pink-600",
  "bg-yellow-100 text-yellow-700",
  "bg-indigo-100 text-indigo-600",
];

const getAvatarColor = (value = "") => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};

function Header({ onToggle, search, setSearch, user, darkMode, toggleTheme }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
  };

  // ✅ always safe
  const identifier = user?.username || user?.email || "U";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50
                 flex items-center justify-between
                 px-3 md:px-6 py-3
                 border-b border-gray-200 dark:border-gray-800
                 bg-white dark:bg-black
                 text-black dark:text-white"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="text-2xl p-2 rounded-md
                     hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          ☰
        </button>

        <Link
          to="/"
          className="text-lg md:text-xl font-bold text-red-600"
        >
          YouTube
        </Link>
      </div>

      {/* CENTER SEARCH */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center w-125"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="flex-1 px-4 py-2 border rounded-l-full
                     bg-white dark:bg-gray-900
                     border-gray-300 dark:border-gray-700
                     outline-none"
        />
        <button
          type="submit"
          className="px-5 py-2 border border-l-0 rounded-r-full
                     bg-gray-100 dark:bg-gray-800
                     hover:bg-gray-200 dark:hover:bg-gray-700
                     border-gray-300 dark:border-gray-700"
        >
          🔍
        </button>
      </form>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
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
            {/* USER AVATAR */}
            <div
              className={`w-9 h-9 rounded-full
                          flex items-center justify-center
                          font-semibold uppercase text-sm
                          ${getAvatarColor(identifier)}`}
            >
              {identifier.charAt(0).toUpperCase()}
            </div>

            {/* LOGOUT */}
            <button
              onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/auth");
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









