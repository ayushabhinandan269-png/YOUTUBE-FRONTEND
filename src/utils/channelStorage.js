import { videos } from "../data/videos";

/* Get channel from videos */
export const getChannelById = (channelId) => {
  const channelVideos = videos.filter(v => v.channelId === channelId);
  if (channelVideos.length === 0) return null;

  return {
    channelId,
    channelName: channelVideos[0].channelName,
    avatar: channelVideos[0].channelAvatar,
    banner: `https://picsum.photos/1200/300?random=${channelId}`,
    description: `Welcome to ${channelVideos[0].channelName}`,
  };
};

/* Save edited channel */
export const saveChannel = (updatedChannel) => {
  localStorage.setItem(
    `channel-${updatedChannel.channelId}`,
    JSON.stringify(updatedChannel)
  );
};

/* Load edited channel */
export const loadChannel = (channelId) => {
  const saved = localStorage.getItem(`channel-${channelId}`);
  return saved ? JSON.parse(saved) : null;
};
