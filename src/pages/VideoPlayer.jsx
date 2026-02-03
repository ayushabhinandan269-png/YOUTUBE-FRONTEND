import { useParams } from "react-router-dom";
import { videos } from "../data/videos";

function VideoPlayer() {
  const { id } = useParams();
  const video = videos.find(v => v.videoId === id);

  if (!video) return <p>Video not found</p>;

  return (
    <div className="p-6 flex gap-6">
      <div className="flex-1">
        <img
          src={video.thumbnailUrl}
          className="w-full h-96 object-cover rounded"
        />
        <h2 className="text-xl font-bold mt-3">{video.title}</h2>
        <p className="text-gray-600">{video.channelName}</p>
      </div>

      <div className="w-72">
        <h3 className="font-semibold mb-3">Up next</h3>
        {videos.slice(0, 5).map(v => (
          <p key={v.videoId} className="text-sm mb-2">
            {v.title}
          </p>
        ))}
      </div>
    </div>
  );
}

export default VideoPlayer;
