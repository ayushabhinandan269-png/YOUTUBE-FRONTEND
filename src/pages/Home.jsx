import { useState } from "react";
import { videos } from "../data/videos";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "React",
  "JavaScript",
  "Node",
  "MongoDB",
  "CSS",
  "DSA",
  "Web Dev",
  "Tools",
  "Gaming",
  "Funny",
  "Memes",
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
    <div className="flex-1 px-6 pt-4 pb-10">

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
        <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredVideos.map((video) => (
            <Link key={video.videoId} to={`/video/${video.videoId}`} className="group">

              {/* Thumbnail */}
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Video Info */}
              <div className="mt-3 flex gap-3">
                <img
                  src={video.channelAvatar}
                  alt={video.channelName}
                  className="w-9 h-9 rounded-full object-cover shrink-0 bg-gray-200"
                />

                <div>
                  <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                    {video.title}
                  </h3>

                  <p className="text-xs text-gray-600 mt-1">
                    {video.channelName}
                  </p>

                  <p className="text-xs text-gray-500">
                    {video.views} views
                  </p>
                </div>
              </div>

            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
