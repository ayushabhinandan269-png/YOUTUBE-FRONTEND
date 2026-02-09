import { useParams, Link } from "react-router-dom";
import { videos } from "../data/videos";
import { formatNumber } from "../utils/formatNumber";
import { useState, useMemo } from "react";

function DummyChannel() {
  const { id } = useParams(); // id === channelSlug
  const [activeTab, setActiveTab] = useState("videos");
  const [subscribed, setSubscribed] = useState(false);

  /* SAFELY filter videos using channelSlug */
  const channelVideos = useMemo(
    () => videos.filter((v) => v.channelSlug === id),
    [id]
  );

  /*  If Home shows the channel, it MUST exist here */
  if (!channelVideos.length) {
    return (
      <div className="p-6 text-gray-500">
        This channel has no videos yet.
      </div>
    );
  }

  /* Build channel info from mock data */
  const channel = {
    channelName: channelVideos[0].channelName,
    avatar: channelVideos[0].channelAvatar,
    banner:
      channelVideos[0].channelBanner ||
      "https://picsum.photos/1200/360",
    subscribers: 23800,
    description:
      "This is a dummy channel generated using mock data. Backend integration will replace this later.",
    joined: "Jan 2024",
  };

  return (
    <div className="pb-24">

      {/* ================= BANNER ================= */}
      <div className="w-full h-56 sm:h-72 bg-gray-300">
        <img
          src={channel.banner}
          className="w-full h-full object-cover"
          alt="Channel banner"
        />
      </div>

      {/* ================= HEADER ================= */}
      <div className="px-6 -mt-14 relative z-10">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row justify-between gap-6">

          {/* LEFT */}
          <div className="flex gap-4 items-center">
            <img
              src={channel.avatar}
              className="w-24 h-24 rounded-full object-cover"
              alt={channel.channelName}
            />
            <div>
              <h1 className="text-2xl font-bold">
                {channel.channelName}
              </h1>
              <p className="text-sm text-gray-600">
                {formatNumber(channel.subscribers)} subscribers •{" "}
                {channelVideos.length} videos
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <button
            onClick={() => setSubscribed(!subscribed)}
            className={`px-6 py-2 rounded-full text-sm transition ${
              subscribed
                ? "border bg-white"
                : "bg-black text-white"
            }`}
          >
            {subscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="mt-10 border-b">
        <div className="flex gap-8 px-6 text-sm font-medium">
          {["videos", "about"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize ${
                activeTab === tab
                  ? "border-b-2 border-black"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-6 mt-6">

        {activeTab === "videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {channelVideos.map((v) => (
              <div key={v.videoId}>
                <Link to={`/video/${v.videoId}`}>
                  <img
                    src={v.thumbnailUrl}
                    className="rounded-lg w-full"
                    alt={v.title}
                  />
                </Link>
                <p className="font-semibold mt-2 line-clamp-2">
                  {v.title}
                </p>
                <p className="text-xs text-gray-500">
                  {formatNumber(v.views)} views
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <div className="max-w-3xl text-sm space-y-3">
            <p>{channel.description}</p>
            <p>
              <b>Joined:</b> {channel.joined}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DummyChannel;



