import { Link } from "react-router-dom";
import { formatNumber } from "../utils/formatNumber";

function VideoCard({ video }) {
  return (
    <div className="w-72">

      {/* VIDEO THUMBNAIL */}
      <Link to={`/video/${video.videoId}`}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-40 object-cover rounded-lg"
        />
      </Link>

      {/* VIDEO INFO */}
      <div className="mt-2">
        <h3 className="font-semibold text-sm line-clamp-2">
          {video.title}
        </h3>

        {/* CHANNEL NAME (CLICKABLE) */}
        <Link
          to={`/channel/${video.channelId}`}
          className="text-gray-600 text-sm hover:underline"
        >
          {video.channelName}
        </Link>

        {/* VIEWS */}
        <p className="text-gray-500 text-xs">
          {formatNumber(video.views)} views
        </p>
      </div>
    </div>
  );
}

export default VideoCard;

