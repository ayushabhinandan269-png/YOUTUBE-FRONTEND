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

  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {}

  const channelId = user?.channel || null;

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer
     ${isActive ? "bg-gray-200 font-medium" : ""}`;

  /* ✅ CLOSE ONLY ON MOBILE */
  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  /* FETCH CHANNELS ONLY WHEN SIDEBAR IS OPEN */
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
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          bg-white border-r z-40 overflow-y-auto
          transition-all duration-300 ease-in-out

          /* MOBILE */
          fixed top-16 h-[calc(100vh-64px)]
          w-56
          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          /* DESKTOP */
          md:static md:h-full md:translate-x-0
          ${isOpen ? "md:w-56" : "md:w-0"}
        `}
      >
        <ul className={`p-3 space-y-1 text-sm ${!isOpen ? "md:hidden" : ""}`}>

          <NavLink to="/" className={linkStyle} onClick={handleNavClick}>
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </NavLink>

          <NavLink to="/explore" className={linkStyle} onClick={handleNavClick}>
            <FireIcon className="h-5 w-5" />
            <span>Explore</span>
          </NavLink>

          <NavLink to="/shorts" className={linkStyle} onClick={handleNavClick}>
            <PlayIcon className="h-5 w-5" />
            <span>Shorts</span>
          </NavLink>

          <NavLink to="/subscriptions" className={linkStyle} onClick={handleNavClick}>
            <RectangleStackIcon className="h-5 w-5" />
            <span>Subscriptions</span>
          </NavLink>

          <hr className="my-3" />

          <NavLink to="/history" className={linkStyle} onClick={handleNavClick}>
            <ClockIcon className="h-5 w-5" />
            <span>History</span>
          </NavLink>

          <NavLink to="/liked" className={linkStyle} onClick={handleNavClick}>
            <HandThumbUpIcon className="h-5 w-5" />
            <span>Liked Videos</span>
          </NavLink>

          {token && (
            <>
              <hr className="my-3" />
              <NavLink
                to={channelId ? `/channel/${channelId}` : "/create-channel"}
                className={linkStyle}
                onClick={handleNavClick}
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>
                  {channelId ? "Your Channel" : "Create Channel"}
                </span>
              </NavLink>
            </>
          )}

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
                onClick={handleNavClick}
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












