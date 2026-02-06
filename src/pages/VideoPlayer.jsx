import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { videos } from "../data/videos";
import api from "../services/api";

function VideoPlayer() {
  const { id } = useParams();
  const video = videos.find((v) => v.videoId === id);

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const token = localStorage.getItem("token");
  const loggedInUser = localStorage.getItem("user");

  if (!video) return <p className="p-6">Video not found</p>;

  /* ================= SAVE WATCH HISTORY ================= */
  useEffect(() => {
    if (!token) return;
    api.post(`/user/history/${id}`);
  }, [id, token]);

  /* ================= FETCH COMMENTS ================= */
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    fetchComments();
  }, [id]);

  /* ================= LIKE / UNLIKE ================= */
  const handleLike = async () => {
    if (!token) return alert("Login required");

    try {
      const res = await api.post(`/user/like/${id}`);
      setLiked(res.data.liked);
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  /* ================= SUBSCRIBE ================= */
  const handleSubscribe = async () => {
    if (!token) return alert("Login required");

    try {
      await api.post(`/user/subscribe/${video.channelName}`);
      alert("Subscribed 🔔");
    } catch (err) {
      console.error("Subscribe failed", err);
    }
  };

  /* ================= ADD COMMENT ================= */
  const addComment = async () => {
    if (!token) return alert("Login required");
    if (!commentText.trim()) return;

    try {
      const res = await api.post(`/comments/${id}`, {
        text: commentText,
        username: loggedInUser,
      });

      setComments([res.data, ...comments]);
      setCommentText("");
    } catch (err) {
      alert("Failed to add comment");
    }
  };

  /* ================= DELETE COMMENT ================= */
  const deleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      alert("Not authorized to delete this comment");
    }
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-64px)] px-6 py-4">

      {/* ================= MAIN VIDEO ================= */}
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
            className={`border px-3 py-1 rounded ${
              liked ? "bg-gray-200" : ""
            }`}
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

        {/* ================= COMMENTS ================= */}
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Comments</h3>

          {loggedInUser && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
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

          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c._id} className="border p-3 rounded">
                <p className="font-semibold">{c.username}</p>
                <p>{c.text}</p>

                {loggedInUser === c.username && (
                  <button
                    onClick={() => deleteComment(c._id)}
                    className="text-red-500 text-sm mt-1"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= UP NEXT ================= */}
      <aside className="w-80 overflow-y-auto">
        <h3 className="font-semibold mb-4">Up next</h3>
        {videos
          .filter((v) => v.videoId !== id)
          .map((v) => (
            <Link
              key={v.videoId}
              to={`/video/${v.videoId}`}
              className="flex gap-3 mb-4"
            >
              <div className="w-40 aspect-video bg-black rounded overflow-hidden">
                <img
                  src={v.thumbnailUrl}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm font-medium">{v.title}</p>
            </Link>
          ))}
      </aside>
    </div>
  );
}

export default VideoPlayer;

