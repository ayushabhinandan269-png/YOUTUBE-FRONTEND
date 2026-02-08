import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { formatNumber } from "../utils/formatNumber";
import { Bell } from "lucide-react";

function Channel() {
  const { id } = useParams();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState("videos");
  const [subscribed, setSubscribed] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CHANNEL + VIDEOS ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [channelRes, videosRes] = await Promise.all([
          api.get(`/channels/${id}`),
          api.get(`/channels/${id}/videos`),
        ]);

        setChannel(channelRes.data);
        setVideos(videosRes.data || []);
      } catch (err) {
        console.error("Channel load failed:", err);
        setChannel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ================= RESET BELL ================= */
  useEffect(() => {
    if (!subscribed) setNotificationsOn(false);
  }, [subscribed]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading channel...</p>;
  }

  if (!channel) {
    return <p className="p-6 text-red-500 font-medium">Channel not found</p>;
  }

  return (
    <div className="pb-24">

      {/* ================= BANNER ================= */}
      <div className="relative w-full h-56 sm:h-72 bg-gray-300">
        <img
          src={
            channel.banner
              ? `http://localhost:5000${channel.banner}`
              : "https://picsum.photos/1200/360"
          }
          alt="Channel banner"
          className="w-full h-full object-cover"
        />

        <button className="absolute bottom-4 right-4 bg-white px-4 py-1.5 rounded shadow text-sm">
          Change Banner
        </button>
      </div>

      {/* ================= HEADER CARD ================= */}
      <div className="px-4 sm:px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row justify-between gap-6">

          {/* LEFT */}
          <div className="flex gap-4 items-center">
            <img
              src={
                channel.avatar
                  ? `http://localhost:5000${channel.avatar}`
                  : `https://ui-avatars.com/api/?name=${channel.channelName}`
              }
              className="w-24 h-24 rounded-full object-cover"
              alt={channel.channelName}
            />

            <div>
              <h1 className="text-2xl font-bold">
                {channel.channelName}
              </h1>
              <p className="text-sm text-gray-600">
                {formatNumber(channel.subscribers)} subscribers •{" "}
                {videos.length} videos
              </p>
            </div>
          </div>

          {/* RIGHT ACTIONS — ALL TOGETHER */}
          <div className="flex items-center gap-3 flex-wrap">

            <Link
              to="/create-video"
              className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100"
            >
              ➕ Add Video
            </Link>

            <Link
              to={`/edit-channel/${id}`}
              className="px-4 py-2 rounded-full border text-sm hover:bg-gray-100"
            >
              ✏️ Edit Channel
            </Link>

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

                <Bell
                  onClick={() =>
                    setNotificationsOn((prev) => !prev)
                  }
                  className={`w-5 h-5 cursor-pointer transition-colors ${
                    notificationsOn
                      ? "text-yellow-400"
                      : "text-gray-600"
                  }`}
                  fill={notificationsOn ? "currentColor" : "none"}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="mt-6 border-b">
        <div className="flex gap-8 px-6 text-sm font-medium">
          {["videos", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-6 mt-4">

        {activeTab === "videos" && (
          videos.length === 0 ? (
            <div className="mt-6 text-center text-gray-500">
              <p>No videos yet</p>
              <Link
                to="/create-video"
                className="inline-block mt-3 text-blue-600 hover:underline text-sm"
              >
                Upload your first video
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {videos.map((v) => (
                <div key={v._id}>
                  <Link to={`/video/${v._id}`}>
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

                  <div className="flex gap-4 mt-2 text-xs">
                    <Link
                      to={`/edit-video/${v._id}`}
                      className="text-blue-600"
                    >
                      ✏️ Edit
                    </Link>
                    <button className="text-red-500">
                      🗑 Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {activeTab === "about" && (
          <div className="max-w-3xl text-sm space-y-3 mt-4">
            <p>{channel.description || "No description added."}</p>
            <p>
              <b>Joined:</b>{" "}
              {new Date(channel.createdAt).toDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Channel;





























