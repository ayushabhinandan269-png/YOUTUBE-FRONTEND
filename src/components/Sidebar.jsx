function Sidebar({ isOpen }) {
  if (!isOpen) return null;

  return (
    <aside className="w-52 p-4 border-r h-screen">
      <ul className="space-y-3">
        <li className="font-medium cursor-pointer">Home</li>
        <li className="cursor-pointer">Explore</li>
        <li className="cursor-pointer">Subscriptions</li>
      </ul>
    </aside>
  );
}

export default Sidebar;
