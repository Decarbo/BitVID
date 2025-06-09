import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SearchVideo } from '../constant/Const';
import { useInfiniteQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';
import VideoCardSkeleton from './VideoCardSkeleton';

const SearchResult = () => {
	const { querysearch } = useParams();
	const loadMoreRef = useRef();

	const fetchSearchResults = async ({ pageParam = '' }) => {
		// Replace SEARCH_QUERY and add pageToken if exists
		const url = SearchVideo.replace('SEARCH_QUERY', querysearch).concat(pageParam ? `&pageToken=${pageParam}` : '');

		const res = await fetch(url);
		const data = await res.json();

		return data;
	};

	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['search', querysearch],
		queryFn: fetchSearchResults,
		getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
		enabled: !!querysearch,
	});

	// Intersection Observer to trigger loading more
	useEffect(() => {
		if (!hasNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchNextPage();
				}
			},
			{ rootMargin: '100px' }
		);

		if (loadMoreRef.current) observer.observe(loadMoreRef.current);

		return () => {
			if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
		};
	}, [fetchNextPage, hasNextPage]);

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
				{[...Array(12)].map((_, i) => (
					<VideoCardSkeleton key={i} />
				))}
			</div>
		);
	}

	if (isError) return <div className="text-red-500">Error fetching search results.</div>;

	const videos = data?.pages.flatMap((page) => page.items) || [];

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{videos.map((video) => (
					<VideoCard
						key={video.id?.videoId || video.id?.channelId || video.etag}
						info={video}
					/>
				))}
			</div>

			<div
				ref={loadMoreRef}
				className="text-center p-4">
				{isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Scroll down to load more' : 'No more results'}
			</div>
		</>
	);
};

export default SearchResult;
