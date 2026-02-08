import { useState } from "react";
import { videos } from "../data/videos";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils/formatNumber";

/* ================= AUTO CATEGORIES ================= */
const categories = [
  "All",
  ...Array.from(new Set(videos.map((v) => v.category))),
];

function Home({ search }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = `${video.title} ${video.channelName} ${video.category}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || video.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    /* ✅ MAKE HOME SCROLLABLE */
    <div className="h-[calc(100vh-4rem)] overflow-y-auto px-3 sm:px-4 md:px-6 pt-4 pb-10">

      {/* ================= FILTER BAR ================= */}
      <div className="flex gap-3 mb-5 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition
              ${
                selectedCategory === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ================= VIDEO GRID ================= */}
      {filteredVideos.length === 0 ? (
        <p className="text-gray-500 mt-10">No videos found</p>
      ) : (
        <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredVideos.map((video) => (
            <div key={video.videoId} className="group">

              {/* Thumbnail */}
              <Link to={`/video/${video.videoId}`}>
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Video Info */}
              <div className="mt-3 flex gap-3">

                {/* Channel Avatar */}
                <Link to={`/channel/${video.channelId}`}>
                  <img
                    src={video.channelAvatar}
                    alt={video.channelName}
                    className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-200"
                  />
                </Link>

                <div className="min-w-0">

                  {/* Title */}
                  <Link to={`/video/${video.videoId}`}>
                    <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                      {video.title}
                    </h3>
                  </Link>

                  {/* Channel Name */}
                  <Link
                    to={`/channel/${video.channelId}`}
                    className="text-xs text-gray-600 mt-1 hover:underline block"
                  >
                    {video.channelName}
                  </Link>

                  {/* Views */}
                  <p className="text-xs text-gray-500">
                    {formatNumber(video.views)} views
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;





