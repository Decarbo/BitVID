import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import VideoCard from './VideoCard';
import VideoCardSkeleton from './VideoCardSkeleton';
import { Youtubeapi } from '../constant/Const';
import React from 'react';

const fetchPopularVideos = async ({ pageParam = '', categoryId }) => {
	let url = Youtubeapi;
	console.log(pageParam);
	if (categoryId && categoryId !== '0') {
		url = Youtubeapi.replace('CATEGORY_ID', categoryId);
	} else {
		url = Youtubeapi.replace('&videoCategoryId=CATEGORY_ID', '');
	}

	if (!url.includes('maxResults=')) {
		const separator = url.includes('?') ? '&' : '?';
		url += `${separator}maxResults=10`;
	}

	if (pageParam) {
		url += `&pageToken=${pageParam}`;
	}

	const response = await fetch(url);
	const jsone = await response.json();

	return {
		videos: jsone.items,
		nextPageToken: jsone.nextPageToken || null,
	};
};

const PopularVideos = () => {
	const { categoryId } = useParams();
	const { ref, inView } = useInView(); // 👈 Intersection Observer

	const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['PopularVideos', categoryId],
		queryFn: ({ pageParam = '' }) => fetchPopularVideos({ pageParam, categoryId }),
		getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
		staleTime: 360000,
		refetchOnWindowFocus: false,
	});

	// Auto-fetch next page when the sentinel is in view
	React.useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	if (isLoading)
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
				{[...Array(12)].map((_, i) => (
					<VideoCardSkeleton key={i} />
				))}
			</div>
		);

	if (isError) return <div className="text-red-500">❌ Failed to load videos: {error.message}</div>;

	return (
		<div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
				{data.pages.map((page) =>
					page.videos.map((video) => (
						<div key={video.id.videoId || video.id}>
							<VideoCard info={video} />
						</div>
					))
				)}
			</div>

			{/* 👇 Sentinel div to observe scroll */}
			<div
				ref={ref}
				className="h-12 mt-4 flex items-center justify-center text-gray-500">
				{isFetchingNextPage ? 'Loading more videos...' : hasNextPage ? '⬇️ Scroll to load more' : 'No more videos'}
			</div>
		</div>
	);
};

export default PopularVideos;
