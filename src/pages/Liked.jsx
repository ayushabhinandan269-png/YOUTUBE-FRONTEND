import { useEffect, useState } from "react";
import api from "../services/api";
import { videos } from "../data/videos";
import { Link } from "react-router-dom";

function Liked() {
  const [likedVideos, setLikedVideos] = useState([]);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const res = await api.get("/user/likes");

        // res.data = [{ videoId }]
        const likedIds = res.data.map((v) => v.videoId);

        const matchedVideos = videos.filter((video) =>
          likedIds.includes(video.videoId)
        );

        setLikedVideos(matchedVideos);
      } catch (err) {
        console.warn("Could not fetch liked videos");
      }
    };

    fetchLikedVideos();
  }, []);

  return (
    <div className="flex-1 px-6 pt-4 pb-10">
      <h1 className="text-2xl font-bold mb-6">Liked Videos</h1>

      {likedVideos.length === 0 ? (
        <p className="text-gray-500">No liked videos yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedVideos.map((video) => (
            <Link
              key={video.videoId}
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
                {video.channelName} • {video.views} views
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Liked;

