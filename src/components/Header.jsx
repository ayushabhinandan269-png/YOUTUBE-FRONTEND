function Header({ onToggle }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b">
      <div className="flex items-center gap-4">
        <button onClick={onToggle} className="text-xl">☰</button>
        <h1 className="text-xl font-bold">YouTube Clone</h1>
      </div>

      <input
        type="text"
        placeholder="Search"
        className="w-1/3 px-4 py-1 border rounded-full outline-none"
      />

      <button className="px-4 py-1 border rounded-full font-medium">
        Sign In
      </button>
    </header>
  );
}

export default Header;

