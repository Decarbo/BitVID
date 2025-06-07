import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SearchVideo } from '../constant/Const';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

const SearchReasult = () => {
	const { querysearch } = useParams();
	console.log(querysearch);

	const handleSearch = async (querysearch) => {
		const response = await fetch(SearchVideo.replace('SEARCH_QUERY', querysearch));
		const data = await response.json();
		console.log(data.items);
		return data.items;
	};
	const { data, isLoading, isError } = useQuery({
		queryKey: ['search', querysearch],
		queryFn: () => handleSearch(querysearch),
		enabled: !!querysearch,
	});
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error fetching search results.</div>;
	console.log(data);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{data?.map((video) => (
				<VideoCard
					key={video.id.videoId}
					info={video}

				/>
			))}
		</div>
	);
};

export default SearchReasult;
