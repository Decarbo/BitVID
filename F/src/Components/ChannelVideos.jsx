import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChannelVideos = ({ channelId }) => {
  const [videos, setVideos] = useState([]);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const fetchChannelVideos = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`
    );
    const data = await res.json();
    setVideos(data.items);
  };

  useEffect(() => {
    fetchChannelVideos();
  }, [channelId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <div key={video.id.videoId} className="bg-gray-800  rounded-lg">
          <Link to={`/watch?v=${video.id.videoId}`}>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full rounded-md"
            />
            <h3 className="mt-2 text-sm font-semibold p-2">{video.snippet.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ChannelVideos;
