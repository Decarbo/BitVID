import { useQueries } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const VideoCard = ({ info }) => {
	const { id } = useParams();
	if (!info || !info.snippet) return null;

	console.log(info.id.videoId);
	const { snippet, statistics } = info;
	const { title, channelTitle, publishedAt, thumbnails } = snippet;
	// console.log(snippet);

	return (
		<Link to={`/watch?v=${info.id.videoId || info.id}`}>
			<div className="w-full aspect-video cursor-pointer text-white bg-gray-950">
				<div className="relative w-full  bg-gray-800 rounded-xl overflow-hidden">
					<img
						src={thumbnails?.high?.url}
						alt={title}
						className="w-full h-full object-cover aspect-video"
					/>
					{/* Optional: Add duration badge if available */}
				</div>
				<div className="flex mt-3">
					<div className="w-10 h-10 bg-gray-500 rounded-full mr-3 flex-shrink-0">
						<img
							src={thumbnails?.medium?.url}
							alt={title}
							className="w-full h-full object-cover rounded-full"
						/>
					</div>
					<div>
						<h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
						<p className="text-xs text-gray-400 mt-0.5">{channelTitle || 'Unknown Channel'}</p>
						<p className="text-xs text-gray-400">
							{Number(statistics?.viewCount).toLocaleString()} views • {new Date(publishedAt).toDateString()}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default VideoCard;
