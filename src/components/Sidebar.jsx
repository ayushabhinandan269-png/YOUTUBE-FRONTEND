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

function Sidebar({ isOpen, onClose }) {
  const [channels, setChannels] = useState([]);

  /* ================= AUTH ================= */
  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const channelId = user?.channel || null;

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer
     ${isActive ? "bg-gray-200 font-medium" : ""}`;

  /* ================= FETCH CHANNEL LIST ================= */
  useEffect(() => {
    if (!isOpen) return;

    const fetchChannels = async () => {
      try {
        const res = await api.get("/channels");
        setChannels(res.data || []);
      } catch {
        setChannels([]);
      }
    };

    fetchChannels();
  }, [isOpen]);

  return (
    <>
      {/* ================= OVERLAY (MOBILE) ================= */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static
          top-16 left-0
          h-[calc(100vh-64px)]
          bg-white
          border-r
          z-40
          overflow-y-auto
          transition-transform duration-300
          w-56
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <ul className="p-3 space-y-1 text-sm">

          {/* ================= MAIN ================= */}
          <NavLink to="/" className={linkStyle} onClick={onClose}>
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/explore" className={linkStyle} onClick={onClose}>
            <FireIcon className="h-5 w-5" />
            <span>Explore</span>
          </NavLink>

          <NavLink to="/shorts" className={linkStyle} onClick={onClose}>
            <PlayIcon className="h-5 w-5" />
            <span>Shorts</span>
          </NavLink>

          <NavLink to="/subscriptions" className={linkStyle} onClick={onClose}>
            <RectangleStackIcon className="h-5 w-5" />
            <span>Subscriptions</span>
          </NavLink>

          <hr className="my-3" />

          {/* ================= USER ================= */}
          <NavLink to="/history" className={linkStyle} onClick={onClose}>
            <ClockIcon className="h-5 w-5" />
            <span>History</span>
          </NavLink>

          <NavLink to="/liked" className={linkStyle} onClick={onClose}>
            <HandThumbUpIcon className="h-5 w-5" />
            <span>Liked Videos</span>
          </NavLink>

          {/* ================= YOUR CHANNEL ================= */}
          {token && (
            <>
              <hr className="my-3" />
              <NavLink
                to={channelId ? `/channel/${channelId}` : "/create-channel"}
                className={linkStyle}
                onClick={onClose}
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>
                  {channelId ? "Your Channel" : "Create Channel"}
                </span>
              </NavLink>
            </>
          )}

          {/* ================= DISCOVER CHANNELS ================= */}
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
                onClick={onClose}
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
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;








