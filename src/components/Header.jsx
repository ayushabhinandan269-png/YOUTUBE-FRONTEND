import { Link } from "react-router-dom";

function Header({ onToggle, search, setSearch, user }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button onClick={onToggle} className="text-xl">☰</button>
        <h1 className="text-xl font-bold text-red-600">YOUTUBE</h1>
      </div>

      {/* CENTER */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="w-1/3 px-4 py-2 border rounded-full outline-none"
      />

      {/* RIGHT */}
      {user ? (
        <span className="font-medium">Hi, {user}</span>
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
