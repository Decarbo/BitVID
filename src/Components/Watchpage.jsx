import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { VideoInfo } from '../constant/Const';
import RelatedVideo from './RelatedVideo';
import VideoCardSkeleton from './VideoCardSkeleton';

const Watchpage = () => {
	const [videodata, setVideodata] = useState([]);
	const location = useLocation();
	// console.log(location);
	const queryParams = new URLSearchParams(location.search);
	const videoId = queryParams.get('v');
	console.log(videoId);
	const [isopen, setIsopen] = useState(false);
	const Videoinfo = async () => {
		const response = await fetch(VideoInfo.replace('VIDEO_ID', videoId));
		const json = await response.json();
		console.log(json?.items[0]?.snippet);
		setVideodata(json?.items[0]?.snippet);
	};
	useEffect(() => {
		Videoinfo();
	}, []);
	if (!videoId) {
		return <div className="text-red-500 text-xl p-4">❌ Video ID not found in URL!</div>;
	}
	console.log(videodata.tags);
	return (
		<div className="p-4">
			{videodata && <h1 className="text-xl font-bold mb-2 text-white">{videodata.title}</h1>}
			{/* YouTube Embed */}
			<div className="aspect-video max-w-[100%] max-h-[80vh] mx-auto  mb-6">
				<iframe
					className="w-full h-full rounded-xl"
					src={`https://www.youtube.com/embed/${videoId}`}
					title="YouTube video player"
					// FrameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen></iframe>
			</div>

			{videodata ? (
				<div>
					<p className="text-sm text-gray-600">
						Uploaded by{' '}
						<Link
							to={`/channel/${videodata.channelId}`}
							className="text-blue-500 hover:underline">
							<strong>{videodata.channelTitle} </strong>
						</Link>
						on {new Date(videodata.publishedAt).toLocaleDateString()}
					</p>
					{isopen && <p className="mt-2 text-gray-700">{videodata.description}</p>}
					<button
						onClick={() => setIsopen(!isopen)}
						className="mt-2 text-gray-500 bg-gray-800 p-2 rounded-md cursor-pointer">
						{isopen ? 'Close Description' : 'Show Description'}
					</button>

					{/* <p className="mt-2 text-gray-700">{videodata.statistics.tags}</p> */}
				</div>
			) : (
				<p className="text-gray-500">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
						{[...Array(6)].map((_, i) => (
							<VideoCardSkeleton key={i} />
						))}
					</div>
				</p>
			)}
			<div className="my-4">
				<p className="text-[#ff0000]">
					Need more Data go to{' '}
					<strong className="text-blue-500">
						<a
							href={`https://www.youtube.com/channel/${videodata.channelId}`}
							className="text-blue-500 hover:underline"
							target="_blank">
							original
						</a>
					</strong>{' '}
					youtube page{' '}
				</p>
			</div>
			<RelatedVideo
				tags={videodata?.tags || []}
				channelId={videodata?.channelId}
				channelTitle={videodata?.title}
			/>
		</div>
	);
};

export default Watchpage;
