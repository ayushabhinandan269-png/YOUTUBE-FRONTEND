import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { formatNumber } from "../utils/formatNumber";
import { getVideos, saveVideos } from "../utils/videoStorage";
import { Bell } from "lucide-react";

function Channel() {
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("videos");
  const [subscribed, setSubscribed] = useState(false);

  /* ================= PDF SAFE OWNER CHECK ================= */
  const isOwner = true; // replace later with auth

  /* ================= LOAD VIDEOS (PERSISTENT) ================= */
  const [allVideos, setAllVideos] = useState(() => getVideos());

  const channelVideos = useMemo(
    () => allVideos.filter((v) => v.channelId === id),
    [allVideos, id]
  );

  /* ================= CHANNEL NOT FOUND ================= */
  if (!id || channelVideos.length === 0) {
    return (
      <p className="p-6 text-red-500 font-medium">
        Channel not found
      </p>
    );
  }

  /* ================= CHANNEL DATA ================= */
  const channel = {
    channelName: channelVideos[0].channelName,
    avatar: channelVideos[0].channelAvatar,
    banner: `https://picsum.photos/1200/360?random=${id}`,
    subscribers: 23800,
    description: `Welcome to ${channelVideos[0].channelName}. Learn tech with high-quality tutorials and projects.`,
    createdAt: "January 2024",
  };

  const totalViews = channelVideos.reduce((sum, v) => sum + v.views, 0);

  /* ================= DELETE VIDEO (PERMANENT) ================= */
  const handleDelete = (videoId) => {
    if (!window.confirm("Delete this video permanently?")) return;

    const updatedVideos = allVideos.filter(
      (v) => v.videoId !== videoId
    );

    setAllVideos(updatedVideos);
    saveVideos(updatedVideos); // persists after refresh
  };

  /* ================= PLAYLISTS ================= */
  const playlists = [
    {
      id: "uploads",
      title: "Uploads",
      videos: channelVideos,
    },
    {
      id: "popular",
      title: "Popular uploads",
      videos: [...channelVideos]
        .sort((a, b) => b.views - a.views)
        .slice(0, 6),
    },
  ];

  return (
    <div className="pb-24">

      {/* ================= BANNER ================= */}
      <div className="w-full h-56 sm:h-72 bg-gray-300">
        <img
          src={channel.banner}
          alt="Channel banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ================= HEADER ================= */}
      <div className="px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row justify-between gap-6">

          {/* LEFT */}
          <div className="flex gap-4 items-center">
            <img
              src={channel.avatar}
              className="w-24 h-24 rounded-full"
              alt={channel.channelName}
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                {channel.channelName}
              </h1>
              <p className="text-sm text-gray-600">
                {formatNumber(channel.subscribers)} subscribers •{" "}
                {channelVideos.length} videos
              </p>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex flex-wrap gap-3 items-center">

            {isOwner && (
              <Link
                to="/create-video"
                className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100"
              >
                ➕ Add Video
              </Link>
            )}

            {isOwner && (
              <Link
                to={`/edit-channel/${id}`}
                className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100"
              >
                ✏️ Edit Channel
              </Link>
            )}

            {!subscribed ? (
              <button
                onClick={() => setSubscribed(true)}
                className="bg-black text-white px-6 py-2 rounded-full text-sm"
              >
                Subscribe
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSubscribed(false)}
                  className="px-6 py-2 rounded-full border text-sm"
                >
                  Subscribed
                </button>
                <Bell className="w-5 h-5 cursor-pointer" />
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="mt-8 border-b">
        <div className="flex gap-6 px-4 sm:px-6 text-sm">
          {["videos", "playlists", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-black font-medium"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-4 sm:px-6 mt-6">

        {/* VIDEOS */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {channelVideos.map((v) => (
              <div key={v.videoId}>
                <Link to={`/video/${v.videoId}`}>
                  <img
                    src={v.thumbnailUrl}
                    className="rounded-lg w-full"
                    alt={v.title}
                  />
                </Link>

                <p className="font-semibold mt-2 line-clamp-2">
                  {v.title}
                </p>
                <p className="text-xs text-gray-500">
                  {formatNumber(v.views)} views
                </p>

                {isOwner && (
                  <div className="flex gap-4 mt-2 text-xs">
                    <Link
                      to={`/edit-video/${v.videoId}`}
                      className="text-blue-600"
                    >
                      ✏️ Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(v.videoId)}
                      className="text-red-500"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PLAYLISTS */}
        {activeTab === "playlists" && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {playlists.map((p) => (
              <div key={p.id}>
                <img
                  src={p.videos[0]?.thumbnailUrl}
                  className="rounded-lg"
                  alt={p.title}
                />
                <p className="font-semibold mt-2">{p.title}</p>
                <p className="text-sm text-gray-500">
                  {p.videos.length} videos
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ABOUT */}
        {activeTab === "about" && (
          <div className="max-w-3xl space-y-3 text-sm">
            <p>{channel.description}</p>
            <p><b>Joined:</b> {channel.createdAt}</p>
            <p><b>Total views:</b> {formatNumber(totalViews)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Channel;


















