import { videos } from "../data/videos";
import { Link } from "react-router-dom";

function Home({ search }) {
  const filteredVideos = videos.filter((video) =>
    `${video.title} ${video.channelName} ${video.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 pt-20">
      {filteredVideos.length === 0 ? (
        <p className="text-gray-500">No videos found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Link
              key={video.videoId}
              to={`/video/${video.videoId}`}
              className="cursor-pointer"
            >
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-48 object-cover rounded"
              />

              <h3 className="mt-2 font-medium text-sm line-clamp-2">
                {video.title}
              </h3>

              <p className="text-xs text-gray-500">
                {video.channelName}
              </p>

              <p className="text-xs text-gray-400">
                {video.views} views
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
