import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import {
  HomeIcon,
  FireIcon,
  PlayIcon,
  RectangleStackIcon,
  ClockIcon,
  HandThumbUpIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function Sidebar({ isOpen }) {
  const [channels, setChannels] = useState([]);

  // 🔐 SAFE USER PARSING
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer
     ${isActive ? "bg-gray-200 font-medium" : ""}`;

  /* ================= FETCH CHANNELS ================= */
  useEffect(() => {
    if (!isOpen) return;

    const fetchChannels = async () => {
      try {
        const res = await api.get("/channels");
        setChannels(res.data || []);
      } catch {
        // safe ignore
      }
    };

    fetchChannels();
  }, [isOpen]);

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

        {/* MAIN */}
        <NavLink to="/" className={linkStyle}>
          <HomeIcon className="h-5 w-5" />
          {isOpen && <span>Home</span>}
        </NavLink>

        <NavLink to="/explore" className={linkStyle}>
          <FireIcon className="h-5 w-5" />
          {isOpen && <span>Explore</span>}
        </NavLink>

        <NavLink to="/shorts" className={linkStyle}>
          <PlayIcon className="h-5 w-5" />
          {isOpen && <span>Shorts</span>}
        </NavLink>

        <NavLink to="/subscriptions" className={linkStyle}>
          <RectangleStackIcon className="h-5 w-5" />
          {isOpen && <span>Subscriptions</span>}
        </NavLink>

        <hr className="my-3" />

        {/* USER */}
        <NavLink to="/history" className={linkStyle}>
          <ClockIcon className="h-5 w-5" />
          {isOpen && <span>History</span>}
        </NavLink>

        <NavLink to="/liked" className={linkStyle}>
          <HandThumbUpIcon className="h-5 w-5" />
          {isOpen && <span>Liked Videos</span>}
        </NavLink>

        {/* YOUR CHANNEL */}
        {user && (
          <>
            <hr className="my-3" />
            <NavLink
              to={user.channel ? `/channel/${user.channel}` : "/create-channel"}
              className={linkStyle}
            >
              <UserCircleIcon className="h-5 w-5" />
              {isOpen && (
                <span>{user.channel ? "Your Channel" : "Create Channel"}</span>
              )}
            </NavLink>
          </>
        )}

        {/* CHANNEL LIST */}
        {isOpen && (
          <>
            <hr className="my-3" />
            <p className="px-2 text-xs text-gray-400">
              More from YouTube
            </p>

            {channels.length > 0 ? (
              channels.map((channel) => (
                <NavLink
                  key={channel._id}
                  to={`/channel/${channel._id}`}
                  className={linkStyle}
                >
                  <PlayIcon className="h-5 w-5" />
                  <span className="truncate">
                    {channel.channelName}
                  </span>
                </NavLink>
              ))
            ) : (
              <p className="px-2 py-2 text-xs text-gray-400">
                No channels available
              </p>
            )}
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;






