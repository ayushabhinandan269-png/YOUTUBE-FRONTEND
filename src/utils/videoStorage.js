import { videos as initialVideos } from "../data/videos";

const STORAGE_KEY = "youtube_videos";

export function getVideos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialVideos));
  return initialVideos;
}

export function saveVideos(videos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
}
