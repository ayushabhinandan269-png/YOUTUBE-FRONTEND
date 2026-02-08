import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateVideo() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    thumbnailUrl: "",
    category: "",
    duration: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔴 TEMP LOGIC (frontend-only as per current setup)
    console.log("New video created:", form);

    alert("Video created successfully (frontend demo)");

    // redirect back to home or channel
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">➕ Create Video</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Video title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="text"
          name="thumbnailUrl"
          placeholder="Thumbnail URL"
          value={form.thumbnailUrl}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />

        <input
          type="text"
          name="duration"
          placeholder="Duration (eg: 12:30)"
          value={form.duration}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        >
          <option value="">Select category</option>
          <option value="React">React</option>
          <option value="Node">Node</option>
          <option value="MongoDB">MongoDB</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Web Dev">Web Dev</option>
          <option value="Gaming">Gaming</option>
        </select>

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded"
        >
          Create Video
        </button>
      </form>
    </div>
  );
}

export default CreateVideo;
