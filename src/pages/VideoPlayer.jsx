import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { videos } from "../data/videos";
import api from "../services/api";

function VideoPlayer() {
  const { id } = useParams();
  const video = videos.find(v => v.videoId === id);

  const [liked, setLiked] = useState(false);
  const token = localStorage.getItem("token");

  if (!video) return <p className="p-6">Video not found</p>;

  /* SAVE HISTORY */
  useEffect(() => {
    if (!token) return;
    api.post(`/user/history/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }, [id, token]);

  /* LIKE / UNLIKE */
  const handleLike = async () => {
    if (!token) return alert("Login required");

    const res = await api.post(
      `/user/like/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setLiked(res.data.liked);
  };

  /* SUBSCRIBE */
  const handleSubscribe = async () => {
    if (!token) return alert("Login required");

    await api.post(
      `/user/subscribe/${video.channelName}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Subscribed 🔔");
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-64px)] px-6 py-4">

      <div className="flex-1 overflow-y-auto pr-4">

        <div className="w-full aspect-video bg-black rounded overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            allowFullScreen
          />
        </div>

        <h1 className="text-xl font-bold mt-4">{video.title}</h1>

        <div className="flex justify-between mt-2">
          <p className="text-sm text-gray-600">{video.views} views</p>

          <button
            onClick={handleLike}
            className={`border px-3 py-1 rounded ${liked && "bg-gray-200"}`}
          >
            👍 {liked ? "Liked" : "Like"}
          </button>
        </div>

        <div className="flex justify-between mt-4 border-t pt-4">
          <div>
            <p className="font-semibold">{video.channelName}</p>
            <p className="text-sm text-gray-500">120K subscribers</p>
          </div>

          <button
            onClick={handleSubscribe}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Subscribe
          </button>
        </div>
      </div>

      <aside className="w-80 overflow-y-auto">
        <h3 className="font-semibold mb-4">Up next</h3>
        {videos.filter(v => v.videoId !== id).map(v => (
          <Link key={v.videoId} to={`/video/${v.videoId}`} className="flex gap-3 mb-4">
            <div className="w-40 aspect-video bg-black rounded overflow-hidden">
              <img src={v.thumbnailUrl} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm font-medium">{v.title}</p>
          </Link>
        ))}
      </aside>

    </div>
  );
}

export default VideoPlayer;
