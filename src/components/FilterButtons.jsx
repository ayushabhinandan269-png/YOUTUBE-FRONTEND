function FilterButtons({ categories, active, onSelect }) {
  return (
    <div className="flex gap-3 px-6 py-3 overflow-x-auto">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1 rounded-full border text-sm whitespace-nowrap
            ${active === cat ? "bg-black text-white" : "bg-gray-100"}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
