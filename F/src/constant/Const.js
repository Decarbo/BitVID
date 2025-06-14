// export const Youtubeapi = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=10&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;

export const Youtubeapi = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=12&videoCategoryId=CATEGORY_ID&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
export const VideoInfo = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics
&id=VIDEO_ID&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;

export const SearchVideo = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=SEARCH_QUERY&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;

export const RelatedVideos = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
