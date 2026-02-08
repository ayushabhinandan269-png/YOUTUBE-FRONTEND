import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getChannelById, saveChannel, loadChannel } from "../utils/channelStorage";

function EditChannel() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ================= PDF SAFE OWNER CHECK ================= */
  const isOwner = true; // replace later with auth

  if (!isOwner) {
    return (
      <p className="p-6 text-red-500 font-medium">
        You are not authorized to edit this channel
      </p>
    );
  }

  /* ================= LOAD CHANNEL ================= */
  const baseChannel = getChannelById(id);
  const savedChannel = loadChannel(id);
  const channel = savedChannel || baseChannel;

  if (!channel) {
    return (
      <p className="p-6 text-red-500 font-medium">
        Channel not found
      </p>
    );
  }

  /* ================= FORM STATE ================= */
  const [channelName, setChannelName] = useState(channel.channelName);
  const [avatar, setAvatar] = useState(channel.avatar);
  const [banner, setBanner] = useState(channel.banner);
  const [description, setDescription] = useState(channel.description);
  const [loading, setLoading] = useState(false);

  /* ================= SAVE CHANNEL ================= */
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedChannel = {
      channelId: id,
      channelName,
      avatar,
      banner,
      description,
    };

    saveChannel(updatedChannel);

    setTimeout(() => {
      alert("Channel updated successfully ✅");
      navigate(`/channel/${id}`);
    }, 300);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-6">

      <h1 className="text-2xl font-bold mb-6">
        Edit Channel
      </h1>

      <form onSubmit={handleSave} className="space-y-4">

        {/* CHANNEL NAME */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Channel Name
          </label>
          <input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* AVATAR */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Avatar URL
          </label>
          <input
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* BANNER */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Banner URL
          </label>
          <input
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default EditChannel;

