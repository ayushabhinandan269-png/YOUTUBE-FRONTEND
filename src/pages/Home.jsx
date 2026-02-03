import { useState } from "react";
import { videos } from "../data/videos";
import VideoCard from "../components/VideoCard";
import FilterButtons from "../components/FilterButtons";

function Home({ search }) {
  const categories = ["All", ...new Set(videos.map(v => v.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredVideos = videos.filter(video => {
    const matchCategory =
      activeCategory === "All" || video.category === activeCategory;

    const matchSearch =
      video.title.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="flex-1">
      <FilterButtons
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVideos.map(video => (
          <VideoCard key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Home;
