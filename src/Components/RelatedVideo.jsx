import React, { useEffect, useState } from 'react';
import VideoCardSkeleton from './VideoCardSkeleton';

const RelatedVideo = ({ channelTitle = '' }) => {
	const [relatedVideos, setRelatedVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	// console.log(tags)
	console.log(channelTitle);
	// Compose query from tags or fallback to channelTitle
	const query = channelTitle || '';

	useEffect(() => {
		// If no query, no API call needed
		if (!query) {
			setRelatedVideos([]);
			setLoading(false);
			return;
		}

		const fetchRelatedVideos = async () => {
			setLoading(true);
			try {
				const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${query}more-like-this&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`);
				const json = await response.json();
				console.log(json);
				setRelatedVideos(json.items || []);
			} catch (error) {
				console.error('Error fetching related videos:', error);
				setRelatedVideos([]);
			} finally {
				setLoading(false);
			}
		};
		console.log(relatedVideos);
		fetchRelatedVideos();
	}, [query]);

	return (
		<div className="w-full">
			<h2 className="text-lg font-semibold mb-2">Related Videos</h2>

			{loading ? (
				<p className="text-gray-400 italic">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
						{[...Array(6)].map((_, i) => (
							<VideoCardSkeleton key={i} />
						))}
					</div>
				</p>
			) : relatedVideos.length === 0 ? (
				<p className="text-gray-400 italic">No related videos found.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3	 gap-4 w-full">
					{relatedVideos.map((video) => {
						const videoId = video.id?.videoId || video.id;
						return (
							<a
								key={videoId}
								href={`/watch?v=${videoId}`}
								className="flex gap-2 p-2 rounded transition w-full cursor-pointer bg-gray-800">
								<img
									src={video.snippet?.thumbnails?.default?.url}
									alt={video.snippet?.title}
									className="aspect-video rounded object-cover"
								/>
								<div className="text-white overflow-hidden">
									<p className="text-sm font-medium line-clamp-2">{video.snippet?.title}</p>
									<p className="text-xs">{video.snippet?.channelTitle}</p>
								</div>
							</a>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default RelatedVideo;
