import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  FireIcon,
  PlayIcon,
  RectangleStackIcon,
  ClockIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

function Sidebar({ isOpen }) {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer
     ${isActive ? "bg-gray-200 font-medium" : ""}`;

  return (
    <aside
      className={`
        fixed md:static
        top-16 left-0
        h-[calc(100vh-64px)]
        bg-white
        border-r
        transition-all duration-300
        ${isOpen ? "w-56" : "w-16"}
        z-40
        overflow-y-auto
      `}
    >
      <ul className="p-3 space-y-1 text-sm">

        {/* HOME */}
        <NavLink to="/" className={linkStyle}>
          <HomeIcon className="h-5 w-5" />
          {isOpen && <span>Home</span>}
        </NavLink>

        {/* EXPLORE */}
        <NavLink to="/explore" className={linkStyle}>
          <FireIcon className="h-5 w-5" />
          {isOpen && <span>Explore</span>}
        </NavLink>

        {/* SHORTS */}
        <NavLink to="/shorts" className={linkStyle}>
          <PlayIcon className="h-5 w-5" />
          {isOpen && <span>Shorts</span>}
        </NavLink>

        {/* SUBSCRIPTIONS */}
        <NavLink to="/subscriptions" className={linkStyle}>
          <RectangleStackIcon className="h-5 w-5" />
          {isOpen && <span>Subscriptions</span>}
        </NavLink>

        <hr className="my-3" />

        {/* HISTORY */}
        <NavLink to="/history" className={linkStyle}>
          <ClockIcon className="h-5 w-5" />
          {isOpen && <span>History</span>}
        </NavLink>

        {/* LIKED VIDEOS */}
        <NavLink to="/liked" className={linkStyle}>
          <HandThumbUpIcon className="h-5 w-5" />
          {isOpen && <span>Liked Videos</span>}
        </NavLink>

        {/* EXTRA CHANNELS (SCROLL DEMO) */}
        {isOpen && (
          <>
            <hr className="my-3" />
            <p className="px-2 text-xs text-gray-400">More from YouTube</p>

            {Array.from({ length: 8 }).map((_, i) => (
              <NavLink
                key={i}
                to={`/channel/${i + 1}`}
                className={linkStyle}
              >
                <PlayIcon className="h-5 w-5" />
                <span>Channel {i + 1}</span>
              </NavLink>
            ))}
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
