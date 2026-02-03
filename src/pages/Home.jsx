import { videos } from "../data/videos";
import VideoCard from "../components/VideoCard";

function Home() {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {videos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
}

export default Home;
