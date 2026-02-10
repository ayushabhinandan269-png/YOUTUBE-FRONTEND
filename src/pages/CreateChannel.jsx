import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  /* CHANNEL AVATAR */
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  /* PROFILE PICTURE (NEW) */
  const [profileImage, setProfileImage] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!token) navigate("/auth");
  }, [token, navigate]);

  /* ================= CHANNEL IMAGE ================= */
  const handleChannelImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= PROFILE IMAGE (NEW) ================= */
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImage(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  /* ================= CLEANUP ================= */
  useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview);
      profilePreview && URL.revokeObjectURL(profilePreview);
    };
  }, [preview, profilePreview]);

  /* ================= SUBMIT ================= */
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
      if (profileImage) formData.append("profileImage", profileImage); // ✅ NEW

      const res = await api.post("/channels", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("channelId", res.data._id);
      navigate(`/channel/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Channel creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-gray-50 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-[#181818] shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Create Your Channel
        </h1>

        {/* ================= CHANNEL AVATAR ================= */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-[#2a2a2a] overflow-hidden flex items-center justify-center border">
            {preview ? (
              <img src={preview} alt="Channel" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                Channel Photo
              </span>
            )}
          </div>

          <label className="mt-3 cursor-pointer text-sm font-medium text-blue-600 hover:underline">
            Upload Channel Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleChannelImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* ================= PROFILE PICTURE (NEW) ================= */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-[#2a2a2a] overflow-hidden flex items-center justify-center border">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 dark:text-gray-400 text-xs">
                Profile Pic
              </span>
            )}
          </div>

          <label className="mt-2 cursor-pointer text-sm font-medium text-blue-600 hover:underline">
            Upload Profile Picture
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* ================= NAME ================= */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Channel Name
          </label>
          <input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full border px-4 py-2 rounded mt-1
                       bg-white dark:bg-[#121212]
                       text-gray-900 dark:text-gray-100
                       border-gray-300 dark:border-[#333]"
          />
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-4 py-2 rounded mt-1
                       bg-white dark:bg-[#121212]
                       text-gray-900 dark:text-gray-100
                       border-gray-300 dark:border-[#333]"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black dark:bg-white
                     text-white dark:text-black
                     py-2 rounded
                     hover:bg-gray-900 dark:hover:bg-gray-200
                     disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Channel"}
        </button>
      </div>
    </div>
  );
}

export default CreateChannel;








