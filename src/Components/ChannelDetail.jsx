import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChannelVideos from './ChannelVideos';
// import ChannelVideos from './ChannelVideos';

const ChannelDetail = () => {
  const { channelId } = useParams();
  const [channelInfo, setChannelInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('Videos');
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const fetchChannelDetails = async () => {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`
    );
    const data = await res.json();
    setChannelInfo(data.items[0]);
  };

  useEffect(() => {
    fetchChannelDetails();
  }, [channelId]);

  if (!channelInfo) return <div className="p-4 text-white">Loading...</div>;

  const { snippet, statistics, brandingSettings } = channelInfo;

  return (
    <div className="text-white">
      {/* Banner */}
      {brandingSettings?.image?.bannerExternalUrl && (
        <div className="h-60 overflow-hidden mb-6">
          <img
            src={brandingSettings.image.bannerExternalUrl}
            alt="banner"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Channel Info */}
      <div className="flex items-center gap-4 p-4">
        <img
          src={snippet.thumbnails.default.url}
          className="w-20 h-20 rounded-full border border-gray-600"
          alt="avatar"
        />
        <div>
          <h1 className="text-2xl font-bold">{snippet.title}</h1>
          <p className="text-gray-400 text-sm">{statistics.subscriberCount} subscribers</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-700 px-4 mb-4">
        {[ 'Videos',  'About'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${activeTab === tab ? 'border-b-2 border-white' : 'text-gray-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {activeTab === 'Videos' && <ChannelVideos channelId={channelId} />}
        {activeTab === 'About' && (
          <div>
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-sm text-gray-300">{snippet.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelDetail;
