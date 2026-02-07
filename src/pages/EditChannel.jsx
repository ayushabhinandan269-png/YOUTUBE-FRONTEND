import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditChannel() {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);

  const token = localStorage.getItem("token");

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("channelName", channelName);
    formData.append("description", description);
    if (avatar) formData.append("avatar", avatar);
    if (banner) formData.append("banner", banner);

    await api.put(`/channels/${channelId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate(`/channel/${channelId}`);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Edit Channel</h2>

      <input
        placeholder="Channel name"
        onChange={(e) => setChannelName(e.target.value)}
        className="border w-full p-2 mb-3"
      />

      <textarea
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="border w-full p-2 mb-3"
      />

      <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
      <input type="file" onChange={(e) => setBanner(e.target.files[0])} />

      <button
        onClick={submitHandler}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}

export default EditChannel;
