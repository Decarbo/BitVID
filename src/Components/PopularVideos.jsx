import { Youtubeapi } from '../constant/Const';
import VideoCard from './VideoCard';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';


const fetchPopularVideos = async (categoryId) => {
	console.log('📡 Fetching Popular Videos API...');


	let url = Youtubeapi;
	if (categoryId && categoryId !== '0') {
		url = Youtubeapi.replace('CATEGORY_ID', categoryId);
	} else {
		url = Youtubeapi.replace('&videoCategoryId=CATEGORY_ID', '');
	}

	console.log('Fetch URL:', url);

	const response = await fetch(url);
	const jsone = await response.json();
	console.log(jsone.items);
	return jsone.items;
};

const PopularVideos = () => {
	const { categoryId } = useParams();

	console.log('Selected Category ID:', categoryId);

	const {
		data: videos,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['PopularVideos', categoryId],
		queryFn: () => fetchPopularVideos(categoryId),
		staleTime: 360000,
		refetchOnWindowFocus: false,
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div className="text-red-500">❌ Failed to load videos: {error.message}</div>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
			{videos?.map((video) => (
				<div key={video.id}>
					<VideoCard info={video} />
				</div>
			))}
		</div>
	);
};

export default PopularVideos;
