function VideoCard({ video }) {
  return (
    <div className="w-72 cursor-pointer">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h3 className="mt-2 font-semibold text-sm">
        {video.title}
      </h3>

      <p className="text-gray-600 text-sm">
        {video.channelName}
      </p>

      <p className="text-gray-500 text-xs">
        {video.views} views
      </p>
    </div>
  );
}

export default VideoCard;
