import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { formatNumber } from "../utils/formatNumber";

function Channel() {
  const { channelId } = useParams();
  const [activeTab, setActiveTab] = useState("videos");

  const [channel, setChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CHANNEL + VIDEOS ================= */
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const channelRes = await api.get(`/channels/${channelId}`);
        const videosRes = await api.get(`/channels/${channelId}/videos`);

        setChannel(channelRes.data);
        setChannelVideos(videosRes.data);
      } catch (err) {
        console.error("Channel fetch failed", err);
        setChannel(null);
      } finally {
        setLoading(false);
      }
    };

    fetchChannelData();
  }, [channelId]);

  if (loading) return <p className="p-6">Loading channel...</p>;
  if (!channel) return <p className="p-6 text-red-500">Channel not found</p>;

  const totalViews = channelVideos.reduce(
    (sum, v) => sum + (v.views || 0),
    0
  );

  /* ================= PLAYLISTS ================= */
  const playlists = [
    {
      id: "p1",
      title: "Full Course",
      videos: channelVideos.slice(0, 4),
    },
    {
      id: "p2",
      title: "Popular Uploads",
      videos: [...channelVideos]
        .sort((a, b) => b.views - a.views)
        .slice(0, 4),
    },
  ];

  return (
    <div className="pb-16">

      {/* ================= BANNER ================= */}
      <div className="w-full h-36 sm:h-52 bg-gray-200">
        {channel.banner && (
          <img
            src={channel.banner}
            alt="Channel banner"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* ================= HEADER ================= */}
      <div className="px-4 sm:px-6 -mt-12">
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">

          {/* AVATAR */}
          <div className="w-24 h-24 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-3xl font-bold">
            {channel.avatar ? (
              <img
                src={channel.avatar}
                alt={channel.channelName}
                className="w-full h-full object-cover"
              />
            ) : (
              channel.channelName[0]
            )}
          </div>

          {/* INFO */}
          <div className="text-center sm:text-left">
            <h1 className="text-xl sm:text-2xl font-bold">
              {channel.channelName}
            </h1>
            <p className="text-sm text-gray-600">
              {formatNumber(channel.subscribers)} subscribers
            </p>
          </div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="px-4 sm:px-6 mt-6 border-b overflow-x-auto">
        <div className="flex gap-6 whitespace-nowrap">
          {["videos", "playlists", "about"].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-3 capitalize ${
                activeTab === t
                  ? "border-b-2 border-black font-medium"
                  : "text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-4 sm:px-6 mt-8">

        {/* VIDEOS */}
        {activeTab === "videos" && (
          channelVideos.length === 0 ? (
            <p className="text-gray-500">No videos uploaded yet</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {channelVideos.map((v) => (
                <Link key={v._id} to={`/video/${v.videoId}`}>
                  <img
                    src={v.thumbnailUrl}
                    className="rounded-lg"
                    alt={v.title}
                  />
                  <p className="font-semibold mt-2 line-clamp-2">
                    {v.title}
                  </p>
                </Link>
              ))}
            </div>
          )
        )}

        {/* PLAYLISTS */}
        {activeTab === "playlists" && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {playlists.map((p) => (
              <div key={p.id}>
                {p.videos[0] && (
                  <img
                    src={p.videos[0].thumbnailUrl}
                    className="rounded-lg"
                    alt={p.title}
                  />
                )}
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
          <div className="max-w-2xl space-y-2 text-sm">
            <p><b>Category:</b> {channel.category || "General"}</p>
            <p><b>Created:</b> {new Date(channel.createdAt).toDateString()}</p>
            <p><b>Total videos:</b> {channelVideos.length}</p>
            <p><b>Total views:</b> {formatNumber(totalViews)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Channel;










