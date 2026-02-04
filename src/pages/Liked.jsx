import { useEffect, useState } from "react";
import api from "../services/api";

function Liked() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    api.get("/user/likes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then(res => setVideos(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Liked Videos</h1>
      {videos.map(id => (
        <p key={id}>{id}</p>
      ))}
    </div>
  );
}

export default Liked;

