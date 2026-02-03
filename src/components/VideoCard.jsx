function VideoCard({ video }) {
  return (
    <div style={{ width: "300px" }}>
      <img src={video.thumbnailUrl} alt={video.title} />
      <h4>{video.title}</h4>
      <p>{video.channelName}</p>
      <p>{video.views} views</p>
    </div>
  );
}

export default VideoCard;
