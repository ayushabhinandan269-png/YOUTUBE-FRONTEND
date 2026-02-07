import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= CREATE CHANNEL ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelName.trim()) return alert("Channel name required");

    try {
      const formData = new FormData();
      formData.append("channelName", channelName);
      formData.append("description", description);
      if (avatar) formData.append("avatar", avatar);

      const res = await api.post("/channels", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Save channelId for future use
      localStorage.setItem("channelId", res.data._id);

      navigate(`/channel/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || "Channel creation failed");
    }
  };

  return (
    <div className="flex justify-center pt-16">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Your Channel
        </h1>

        {/* AVATAR UPLOAD */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">No Image</span>
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

        {/* CHANNEL NAME */}
        <input
          type="text"
          placeholder="Channel name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4"
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Channel description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border px-4 py-2 rounded mb-6"
        />

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900"
        >
          Create Channel
        </button>
      </div>
    </div>
  );
}

export default CreateChannel;




