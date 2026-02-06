import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { videos } from "../data/videos";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/user/history");
        setHistory(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          console.warn("Unauthorized - please login again");
        }
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex-1 px-6 pt-4 pb-10">
      <h1 className="text-2xl font-bold mb-6">Watch History</h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No watch history yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {history.map((item) => {
            const video = videos.find(v => v.videoId === item.videoId);
            if (!video) return null;

            return (
              <Link
                key={item.videoId}
                to={`/video/${video.videoId}`}
                className="group"
              >
                <div className="aspect-video rounded-xl overflow-hidden bg-black">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                <h3 className="mt-2 text-sm font-semibold line-clamp-2">
                  {video.title}
                </h3>

                <p className="text-xs text-gray-500">
                  {video.channelName}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;


