import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { videos } from "../data/videos";
import api from "../services/api";
import { formatNumber } from "../utils/formatNumber";

function VideoPlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const video = videos.find((v) => v.videoId === id);

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const token = localStorage.getItem("token");
  const myChannelId = localStorage.getItem("channelId");

  let loggedInUser = null;
  try {
    loggedInUser = JSON.parse(localStorage.getItem("user"));
  } catch {
    loggedInUser = null;
  }

  if (!video) return <p className="p-6">Video not found</p>;

  const isOwner = myChannelId === video.channelId;

  /* ================= SAVE WATCH HISTORY ================= */
  useEffect(() => {
    if (!token) return;
    api.post(`/user/history/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }, [id, token]);

  /* ================= FETCH COMMENTS ================= */
  useEffect(() => {
    api.get(`/comments/${id}`)
      .then((res) => setComments(res.data))
      .catch(() => {});
  }, [id]);

  const handleLike = async () => {
    if (!token) return alert("Login required");
    try {
      const res = await api.post(`/user/like/${id}`);
      setLiked(res.data.liked);
    } catch {}
  };

  const handleSubscribe = async () => {
    if (!token) return alert("Login required");
    try {
      await api.post(`/user/subscribe/${video.channelId}`);
      alert("Subscribed 🔔");
    } catch {}
  };

  const addComment = async () => {
    if (!token || !commentText.trim()) return;
    try {
      const res = await api.post(`/comments/${id}`, {
        text: commentText,
        username: loggedInUser?.name || "User",
      });
      setComments([res.data, ...comments]);
      setCommentText("");
    } catch {}
  };

  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch {
      alert("Not authorized");
    }
  };

  const deleteVideo = async () => {
    if (!window.confirm("Delete this video?")) return;
    try {
      await api.delete(`/videos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/channel/${video.channelId}`);
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 py-4">

      {/* ================= MAIN ================= */}
      <div className="flex-1">

        {/* VIDEO */}
        <div className="w-full aspect-video bg-black rounded overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            allowFullScreen
            title={video.title}
          />
        </div>

        <h1 className="text-lg sm:text-xl font-bold mt-4">
          {video.title}
        </h1>

        {/* ACTIONS */}
        <div className="flex flex-wrap justify-between gap-3 mt-2 items-center">
          <p className="text-sm text-gray-600">
            {formatNumber(video.views)} views
          </p>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleLike}
              className={`border px-3 py-1 rounded ${
                liked ? "bg-gray-200" : ""
              }`}
            >
              👍 {liked ? "Liked" : "Like"}
            </button>

            {isOwner && (
              <>
                <Link
                  to={`/edit-video/${video.videoId}`}
                  className="border px-3 py-1 rounded text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={deleteVideo}
                  className="border px-3 py-1 rounded text-sm text-red-600"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>

        {/* CHANNEL INFO */}
        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <div className="flex gap-3 items-center">
            <Link to={`/channel/${video.channelId}`}>
              <img
                src={video.channelAvatar}
                alt={video.channelName}
                className="w-12 h-12 rounded-full"
              />
            </Link>

            <div>
              <Link
                to={`/channel/${video.channelId}`}
                className="font-semibold hover:underline"
              >
                {video.channelName}
              </Link>
              <p className="text-sm text-gray-500">
                {formatNumber(120000)} subscribers
              </p>
            </div>
          </div>

          {!isOwner && (
            <button
              onClick={handleSubscribe}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Subscribe
            </button>
          )}
        </div>

        {/* COMMENTS */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Comments</h3>

          {loggedInUser && (
            <div className="flex gap-2 mb-4">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 border px-3 py-2 rounded"
              />
              <button
                onClick={addComment}
                className="bg-blue-600 text-white px-4 rounded"
              >
                Comment
              </button>
            </div>
          )}

          {comments.map((c) => (
            <div key={c._id} className="border p-3 rounded mb-2">
              <p className="font-semibold">{c.username}</p>
              <p>{c.text}</p>

              {loggedInUser?.name === c.username && (
                <button
                  onClick={() => deleteComment(c._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================= UP NEXT ================= */}
      <aside className="w-full lg:w-80">
        <h3 className="font-semibold mb-4">Up next</h3>

        {videos
          .filter((v) => v.videoId !== id)
          .map((v) => (
            <Link
              key={v.videoId}
              to={`/video/${v.videoId}`}
              className="flex gap-3 mb-4 hover:bg-gray-100 p-2 rounded-lg"
            >
              <div className="w-40 h-24 bg-black rounded-lg overflow-hidden shrink-0">
                <img
                  src={v.thumbnailUrl}
                  alt={v.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <p className="text-sm font-medium line-clamp-2">
                  {v.title}
                </p>
                <p className="text-xs text-gray-500">
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


