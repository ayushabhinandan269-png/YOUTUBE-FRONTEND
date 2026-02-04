import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { videos } from "../data/videos";
import api from "../services/api";

function VideoPlayer() {
  const { id } = useParams();
  const video = videos.find(v => v.videoId === id);

  const [liked, setLiked] = useState(false);

  if (!video) {
    return <p className="p-6">Video not found</p>;
  }

  const token = localStorage.getItem("token");

  /* ---------------- SAVE WATCH HISTORY ---------------- */
  useEffect(() => {
    if (!token) return;

    api.post(
      `/user/history/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).catch(() => {});
  }, [id, token]);

  /* ---------------- LIKE / UNLIKE ---------------- */
  const handleLike = async () => {
    if (!token) {
      alert("Please login to like videos");
      return;
    }

    try {
      const res = await api.post(
        `/user/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLiked(res.data.liked);
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-64px)] px-6 py-4">

      {/* LEFT: VIDEO + DETAILS */}
      <div className="flex-1 overflow-y-auto pr-4">

        {/* VIDEO PLAYER */}
        <div className="w-full aspect-video rounded overflow-hidden bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* TITLE */}
        <h1 className="text-xl font-bold mt-4">
          {video.title}
        </h1>

        {/* META */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-600">
            {video.views} views • 1 day ago
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleLike}
              className={`border px-3 py-1 rounded hover:bg-gray-100 ${
                liked ? "bg-gray-200" : ""
              }`}
            >
              👍 {liked ? "Liked" : "Like"}
            </button>

            <button className="border px-3 py-1 rounded hover:bg-gray-100">
              👎 Dislike
            </button>

            <button className="border px-3 py-1 rounded hover:bg-gray-100">
              🔗 Share
            </button>
          </div>
        </div>

        {/* CHANNEL */}
        <div className="flex items-center justify-between mt-4 border-t pt-4">
          <div>
            <p className="font-semibold">{video.channelName}</p>
            <p className="text-sm text-gray-500">120K subscribers</p>
          </div>

          <button className="bg-black text-white px-4 py-2 rounded">
            Subscribe
          </button>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 bg-gray-100 p-4 rounded text-sm">
          This video explains <b>{video.title}</b>. Learn concepts step-by-step
          with practical examples and real-world use cases.
        </div>

        {/* COMMENTS */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Comments</h3>
          <p className="text-sm text-gray-500">
            Comments feature coming soon.
          </p>
        </div>
      </div>

      {/* RIGHT: UP NEXT */}
      <aside className="w-80 overflow-y-auto">
        <h3 className="font-semibold mb-4">Up next</h3>

        {videos
          .filter(v => v.videoId !== id)
          .map(v => (
            <Link
              key={v.videoId}
              to={`/video/${v.videoId}`}
              className="flex gap-3 mb-4 hover:bg-gray-100 p-2 rounded"
            >
              {/* FIXED SIZE THUMBNAIL */}
              <div className="w-40 aspect-video bg-black rounded overflow-hidden shrink-0">
                <img
                  src={v.thumbnailUrl}
                  alt={v.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TEXT */}
              <div className="flex flex-col">
                <p className="text-sm font-medium line-clamp-2">
                  {v.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {v.channelName}
                </p>
              </div>
            </Link>
          ))}
      </aside>

    </div>
  );
}

export default VideoPlayer;
