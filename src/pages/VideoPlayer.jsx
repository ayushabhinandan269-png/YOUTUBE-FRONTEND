import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { videos } from "../data/videos";
import api from "../services/api";
import { formatNumber } from "../utils/formatNumber";

/* ================= SAMPLE COMMENTS ================= */
const SAMPLE_COMMENTS = [
  {
    _id: "s1",
    username: "Rohit Sharma",
    text: "Very clear explanation, thanks for this video 🙌",
    likes: 4,
  },
  {
    _id: "s2",
    username: "Ananya Gupta",
    text: "This helped me understand React Hooks much better!",
    likes: 2,
  },
];

function VideoPlayer() {
  const { id } = useParams();
  const video = videos.find((v) => v.videoId === id);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [videoLiked, setVideoLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const token = localStorage.getItem("token");

  let loggedInUser = null;
  try {
    loggedInUser = JSON.parse(localStorage.getItem("user"));
  } catch {
    loggedInUser = null;
  }

  if (!video) return <p className="p-6">Video not found</p>;

  /* ================= FETCH COMMENTS ================= */
  useEffect(() => {
    api
      .get(`/comments/${id}`)
      .then((res) =>
        setComments(res.data?.length ? res.data : SAMPLE_COMMENTS)
      )
      .catch(() => setComments(SAMPLE_COMMENTS));
  }, [id]);

  /* ================= VIDEO LIKE ================= */
  const toggleVideoLike = () => {
    if (!token) return alert("Login required");
    setVideoLiked((prev) => !prev);
  };

  /* ================= SUBSCRIBE ================= */
  const toggleSubscribe = () => {
    if (!token) return alert("Login required");
    setSubscribed((prev) => !prev);
  };

  /* ================= ADD COMMENT ================= */
  const addComment = () => {
    if (!token || !commentText.trim()) return;

    const newComment = {
      _id: Date.now().toString(),
      username: loggedInUser?.name || "You",
      text: commentText,
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  /* ================= LIKE COMMENT ================= */
  const likeComment = (commentId) => {
    setComments((prev) =>
      prev.map((c) =>
        c._id === commentId ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  /* ================= DELETE COMMENT ================= */
  const deleteComment = (commentId) => {
    setComments((prev) => prev.filter((c) => c._id !== commentId));
  };

  return (
    /* PAGE HEIGHT LOCKED — BOTH SIDES SCROLL */
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 py-4 h-[calc(100vh-4rem)]">

      {/* ================= LEFT: VIDEO + COMMENTS ================= */}
      <div className="flex-1 min-w-0 overflow-y-auto pr-2">

        {/* VIDEO */}
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            allowFullScreen
            title={video.title}
          />
        </div>

        {/* TITLE */}
        <h1 className="text-lg sm:text-xl font-bold mt-4">
          {video.title}
        </h1>

        {/* VIEWS + ACTIONS */}
        <div className="flex justify-between items-center mt-2 flex-wrap gap-3">
          <p className="text-sm text-gray-600">
            {formatNumber(video.views)} views
          </p>

          <div className="flex gap-3">
            <button
              onClick={toggleVideoLike}
              className={`border px-4 py-1 rounded ${
                videoLiked ? "bg-gray-200" : ""
              }`}
            >
              👍 {videoLiked ? "Liked" : "Like"}
            </button>

            <button
              onClick={toggleSubscribe}
              className={`px-4 py-1 rounded text-white ${
                subscribed ? "bg-gray-600" : "bg-black"
              }`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>

        {/* ================= COMMENTS ================= */}
        <div className="mt-6">
          <h3 className="font-semibold mb-4">
            Comments ({comments.length})
          </h3>

          {token && (
            <div className="flex gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
                {(loggedInUser?.name || "U")[0]}
              </div>

              <div className="flex-1">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border-b outline-none py-2 text-sm focus:border-black"
                />

                <div className="flex justify-end gap-3 mt-2">
                  <button
                    onClick={() => setCommentText("")}
                    className="text-sm text-gray-600"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={addComment}
                    disabled={!commentText.trim()}
                    className={`px-4 py-1 rounded text-sm text-white ${
                      commentText.trim()
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          )}

          {comments.map((c) => (
            <div key={c._id} className="flex gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
                {c.username[0]}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold">{c.username}</p>
                <p className="text-sm mt-1">{c.text}</p>

                <div className="flex gap-4 text-xs mt-2 text-gray-600 items-center">
                  <button onClick={() => likeComment(c._id)}>
                    👍 {c.likes}
                  </button>

                  {loggedInUser?.name === c.username && (
                    <button
                      onClick={() => deleteComment(c._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= RIGHT: UP NEXT (EVEN SIZE + SCROLL) ================= */}
      <aside className="w-full lg:w-80 shrink-0 overflow-y-auto pl-2">
        <h3 className="font-semibold mb-4">Up next</h3>

        {videos
          .filter((v) => v.videoId !== id)
          .map((v) => (
            <Link
              key={v.videoId}
              to={`/video/${v.videoId}`}
              className="flex gap-3 mb-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
            >
              {/* THUMBNAIL */}
              <div className="w-40 h-24 shrink-0 bg-black rounded-lg overflow-hidden">
                <img
                  src={v.thumbnailUrl}
                  alt={v.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* TEXT (FIXED HEIGHT) */}
              <div className="flex flex-col justify-between h-24 overflow-hidden">
                <p className="text-sm font-medium leading-snug line-clamp-2">
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













