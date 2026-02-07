import { Link, useNavigate } from "react-router-dom";

function Header({ onToggle, search, setSearch, user }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 border-b bg-white">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggle}
          className="text-2xl hover:bg-gray-100 p-1 rounded"
        >
          ☰
        </button>

        <Link
          to="/"
          className="text-xl font-bold text-red-600 tracking-tight"
        >
          YouTube
        </Link>
      </div>

      {/* CENTER SEARCH */}
      <form
        onSubmit={handleSearch}
        className="flex items-center w-130"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="flex-1 px-4 py-2 border rounded-l-full outline-none"
        />

        <button
          type="submit"
          className="px-5 py-2 border border-l-0 rounded-r-full bg-gray-100 hover:bg-gray-200"
        >
          🔍
        </button>
      </form>

      {/* RIGHT */}
      {user ? (
        <div className="flex items-center gap-4">
          <span className="font-medium">Hi, {user}</span>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="px-4 py-1 border rounded-full text-sm hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/auth"
          className="px-5 py-2 border rounded-full font-medium hover:bg-gray-100"
        >
          Sign In
        </Link>
      )}
    </header>
  );
}

export default Header;


