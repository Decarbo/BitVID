import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import VideoCardSkeleton from './VideoCardSkeleton';

const fetchVideos = async ({ pageParam = '' }, query) => {
	const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}more-like-this&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}&pageToken=${pageParam}`);
	const json = await res.json();
	return {
		items: json.items,
		nextPageToken: json.nextPageToken,
	};
};

const RelatedVideo = ({ channelTitle }) => {
	const query = channelTitle || '';

	const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['relatedVideos', query],
		queryFn: ({ pageParam = '' }) => fetchVideos({ pageParam }, query),
		getNextPageParam: (lastPage) => lastPage.nextPageToken,
		enabled: !!query,
		staleTime: 1000 * 60 * 5, // 5 minutes cache
	});

	const observer = useRef();
	const lastVideoRef = useCallback(
		(node) => {
			if (isLoading || isFetchingNextPage) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasNextPage) {
					fetchNextPage();
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, isFetchingNextPage, hasNextPage]
	);

	const allVideos = data?.pages.flatMap((page) => page.items) || [];

	return (
		<div>
			<h2 className="text-lg font-semibold mb-2">Related Videos</h2>

			{isLoading ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
					{[...Array(6)].map((_, i) => (
						<VideoCardSkeleton key={i} />
					))}
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{allVideos.map((video, index) => {
						const videoId = video.id?.videoId || video.id;
						const isLast = index === allVideos.length - 1;

						return (
							<a
								key={video.etag || `${videoId}-${index}`}
								ref={isLast ? lastVideoRef : null}
								href={`/watch?v=${videoId}`}
								className="flex gap-2 p-2 rounded bg-gray-800">
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

					{isFetchingNextPage && (
						<div className="col-span-3">
							{/* Spinner or Skeleton */}
							<p className="text-white text-center">Loading more...</p>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
export default RelatedVideo;
