import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { videos } from "../data/videos";

function Liked() {
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    api.get("/user/likes", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(res => setLiked(res.data));
  }, []);

  const likedVideos = videos.filter(v =>
    liked.some(l => l.videoId === v.videoId)
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Liked Videos</h1>

      {likedVideos.map(v => (
        <Link key={v.videoId} to={`/video/${v.videoId}`} className="block mb-3">
          {v.title}
        </Link>
      ))}
    </div>
  );
}

export default Liked;

