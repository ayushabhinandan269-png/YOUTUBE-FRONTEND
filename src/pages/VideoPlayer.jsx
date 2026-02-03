import { useParams } from "react-router-dom";
import { videos } from "../data/videos";

function VideoPlayer() {
  const { id } = useParams();
  const video = videos.find(v => v.videoId === id);

  if (!video) return <p className="p-6">Video not found</p>;

  return (
    <div className="flex p-6 gap-6">

      {/* LEFT: VIDEO + INFO */}
      <div className="flex-1">

        {/* VIDEO PLAYER */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-105 object-cover rounded"
        />

        {/* TITLE */}
        <h2 className="text-xl font-bold mt-4">
          {video.title}
        </h2>

        {/* VIEWS + ACTIONS */}
        <div className="flex items-center justify-between mt-2">

          <p className="text-gray-600 text-sm">
            {video.views} views • 1 day ago
          </p>

          <div className="flex gap-4 text-sm">
            <button className="border px-3 py-1 rounded">👍 Like</button>
            <button className="border px-3 py-1 rounded">👎 Dislike</button>
            <button className="border px-3 py-1 rounded">🔗 Share</button>
          </div>
        </div>

        {/* CHANNEL INFO */}
        <div className="flex items-center justify-between mt-4 border-t pt-4">
          <div>
            <p className="font-semibold">{video.channelName}</p>
            <p className="text-sm text-gray-500">120K subscribers</p>
          </div>

          <button className="bg-black text-white px-4 py-2 rounded">
            Subscribe
          </button>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4 bg-gray-100 p-4 rounded text-sm">
          <p>
            This video explains <b>{video.title}</b>.  
            Learn concepts step-by-step with practical examples.
          </p>
        </div>
      </div>

      {/* RIGHT: UP NEXT */}
      <div className="w-80">
        <h3 className="font-semibold mb-4">Up next</h3>

        {videos
          .filter(v => v.videoId !== id)
          .slice(0, 6)
          .map(v => (
            <div key={v.videoId} className="flex gap-3 mb-3">
              <img
                src={v.thumbnailUrl}
                alt={v.title}
                className="w-28 h-16 object-cover rounded"
              />
              <div>
                <p className="text-sm font-medium">{v.title}</p>
                <p className="text-xs text-gray-500">{v.channelName}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default VideoPlayer;
