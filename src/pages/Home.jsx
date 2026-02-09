import { useState } from "react";
import { videos } from "../data/videos.js";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils/formatNumber";

/* ================= AUTO CATEGORIES ================= */
const categories = [
  "All",
  ...Array.from(new Set(videos.map((v) => v.category))),
];

/* ================= HELPER: CHANNEL SLUG ================= */
const getChannelSlug = (name) =>
  name.toLowerCase().replace(/\s+/g, "-");

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
    <div className="min-h-full px-3 sm:px-4 md:px-6 pt-4 pb-10 bg-white dark:bg-black">

      {/* ================= FILTER BAR ================= */}
      <div className="flex gap-3 mb-5 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition
              ${
                selectedCategory === cat
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-[#272727] dark:text-gray-200 dark:hover:bg-[#3a3a3a]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ================= VIDEO GRID ================= */}
      {filteredVideos.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 mt-10">
          No videos found
        </p>
      ) : (
        <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredVideos.map((video) => {
            const channelSlug = getChannelSlug(video.channelName);

            return (
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
                  <Link to={`/channel/${channelSlug}`}>
                    <img
                      src={video.channelAvatar}
                      alt={video.channelName}
                      className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-200"
                    />
                  </Link>

                  <div className="min-w-0">

                    {/* Title */}
                    <Link to={`/video/${video.videoId}`}>
                      <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-black dark:text-white">
                        {video.title}
                      </h3>
                    </Link>

                    {/* Channel Name */}
                    <Link
                      to={`/channel/${channelSlug}`}
                      className="text-xs text-gray-600 dark:text-gray-400 mt-1 hover:underline block"
                    >
                      {video.channelName}
                    </Link>

                    {/* Views */}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatNumber(video.views)} views
                    </p>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;










