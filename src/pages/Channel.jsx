import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Channel() {
  const { channelId } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 SAFE USER PARSING
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const isOwner = user?.channel === channelId;

  useEffect(() => {
    if (!channelId) return;

    const fetchChannel = async () => {
      try {
        const channelRes = await api.get(`/channels/${channelId}`);
        setChannel(channelRes.data || null);

        const videoRes = await api.get(`/channels/${channelId}/videos`);
        setVideos(videoRes.data || []);
      } catch {
        setChannel(null);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [channelId]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading channel...</p>;
  }

  if (!channel) {
    return <p className="p-6 text-red-500">Channel not found</p>;
  }

  return (
    <div className="pb-16 bg-white">

      {/* BANNER */}
      <div className="h-56 w-full bg-linear-to-r from-gray-300 via-gray-200 to-gray-300" />

      {/* HEADER */}
      <div className="px-6 -mt-16">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

          <img
            src={
              channel.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                channel.channelName
              )}&size=160&background=random`
            }
            alt={channel.channelName}
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold">
              {channel.channelName}
            </h1>

            <p className="text-sm text-gray-600 mt-1">
              {channel.subscribers || 0} subscribers
            </p>

            {channel.description && (
              <p className="text-sm text-gray-500 mt-2 max-w-2xl">
                {channel.description}
              </p>
            )}

            {/* OWNER CONTROLS */}
            {isOwner && (
              <div className="flex gap-3 mt-4">
                <Link
                  to="/upload"
                  className="px-5 py-2 bg-black text-white rounded-full"
                >
                  Upload Video
                </Link>
                <Link
                  to={`/channel/${channelId}/edit`}
                  className="px-5 py-2 border rounded-full"
                >
                  Edit Channel
                </Link>
              </div>
            )}
          </div>

          {/* SUBSCRIBE */}
          {!isOwner && (
            <button className="bg-black text-white px-6 py-2 rounded-full">
              Subscribe
            </button>
          )}
        </div>

        {/* TABS */}
        <div className="mt-8 border-b flex gap-8 text-sm font-medium text-gray-600">
          <button className="pb-3 border-b-2 border-black text-black">
            Videos
          </button>
          <button className="pb-3 hover:text-black">
            About
          </button>
        </div>
      </div>

      {/* VIDEOS */}
      <div className="px-6 mt-8">
        {videos.length === 0 ? (
          <p className="text-gray-500">No videos uploaded yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {videos.map((video) => (
              <Link
                key={video._id}
                to={`/video/${video.videoId}`}
                className="group"
              >
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                  {video.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {video.views || 0} views
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Channel;

