import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { videos } from "../data/videos";
import api from "../services/api";

function EditVideo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const video = videos.find((v) => v.videoId === id);

  const token = localStorage.getItem("token");
  const myChannelId = localStorage.getItem("channelId");

  // 🔒 AUTH CHECK
  if (!token) {
    return <p className="p-6 text-red-500">Login required</p>;
  }

  if (!video) {
    return <p className="p-6">Video not found</p>;
  }

  // 🔒 OWNER CHECK
  if (myChannelId !== video.channelId) {
    return (
      <p className="p-6 text-red-500">
        You are not authorized to edit this video
      </p>
    );
  }

  // ================= FORM STATE =================
  const [title, setTitle] = useState(video.title);
  const [thumbnailUrl, setThumbnailUrl] = useState(video.thumbnailUrl);
  const [description, setDescription] = useState(
    video.description || ""
  );
  const [loading, setLoading] = useState(false);

  // ================= UPDATE VIDEO =================
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(
        `/videos/${id}`,
        { title, thumbnailUrl, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Video updated successfully ✅");
      navigate(`/video/${id}`);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        Edit Video
      </h1>

      <form onSubmit={handleUpdate} className="space-y-4">

        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Video Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* THUMBNAIL */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Thumbnail URL
          </label>
          <input
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="border px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditVideo;
