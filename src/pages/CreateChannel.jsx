import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!token) {
      navigate("/auth");
    }
  }, [token, navigate]);

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  /* ================= CLEANUP PREVIEW ================= */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* ================= CREATE CHANNEL ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelName.trim()) {
      return alert("Channel name is required");
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("channelName", channelName);
      formData.append("description", description);
      if (avatar) formData.append("avatar", avatar);

      const res = await api.post("/channels", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Save channelId globally
      localStorage.setItem("channelId", res.data._id);

      navigate(`/channel/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Channel creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Channel
        </h1>

        {/* ================= AVATAR UPLOAD ================= */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">
                Channel Photo
              </span>
            )}
          </div>

          <label className="mt-3 cursor-pointer text-sm font-medium text-blue-600 hover:underline">
            Upload Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* ================= CHANNEL NAME ================= */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Channel Name
          </label>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Enter channel name"
            className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell viewers about your channel"
            className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* ================= SUBMIT ================= */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Channel"}
        </button>
      </div>
    </div>
  );
}

export default CreateChannel;





