import { FaBars, FaSearch, FaMicrophone, FaBell, FaPlus } from 'react-icons/fa';
import { MdNotifications } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Header = () => {
	const [querysearch, setQuerySearch] = useState([]);
	const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
	const [searchSuggestion, setSearchSuggestion] = useState([]);

	const dispatch = useDispatch();
	const toggleMenuHandler = () => {
		dispatch(toggleMenu());
	};

	const fetchSearchSuggestion = async () => {
		if (!querysearch) return;

		const response = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(querysearch)}`);

		const data = await response.json();
		console.log(data[1]); // Suggestions are in index 1
		setSearchSuggestion(data[1]);
	};

	useEffect(() => {
		console.log(querysearch);
		const timer = setTimeout(() => {
			fetchSearchSuggestion();
		}, 200);

		const clearTimer = () => {
			clearTimeout(timer);
		};

		return () => clearTimer();
	}, [querysearch]);

	const navigate = useNavigate();

	const handleSearch = () => {
		const trimmed = querysearch.trim();
		if (trimmed) {
			navigate(`/search/${encodeURIComponent(trimmed)}`);
			setShowSearchSuggestion(false);
			// ✅ DO NOT clear input here
		}
	};

	return (
		<div className="flex items-center justify-between px-4 py-3  bg-gray-950 text-white">
			{/* Left: Logo and Menu */}
			<div className="flex items-center space-x-4">
				<FaBars
					className="text-xl cursor-pointer"
					onClick={() => toggleMenuHandler()}
				/>
				<div className="">
					<Link to="/">
						<h1 className="text-2xl font-bold text-[#ff0000] select-none">BitVID</h1>
					</Link>
				</div>
			</div>

			{/* Center: Search */}
			{/* Center: Search */}
			<div className="relative flex items-center w-1/2 max-w-2xl">
				<input
					type="text"
					placeholder="Search"
					className="relative w-full px-4 py-1.5 bg-zinc-900 border border-zinc-700 rounded-l-full outline-none text-sm placeholder-zinc-400"
					value={querysearch}
					onChange={(e) => setQuerySearch(e.target.value)}
					onFocus={() => setShowSearchSuggestion(true)}
					onBlur={() => setTimeout(() => setShowSearchSuggestion(false), 150)}
					onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
				/>
				{showSearchSuggestion && searchSuggestion.length > 0 && (
					<ul className="absolute top-full left-0 w-full bg-gray-950 text-white border border-gray-900 rounded-md shadow-md max-h-64 overflow-y-auto z-50 py-1 ">
						{searchSuggestion.map((sug) => (
							<div className="flex items-center gap-2 px-4  cursor-pointer hover:bg-gray-900">
								<FaSearch />
								<li
									key={sug}
									className="px-4 py-2 cursor-pointer hover:bg-gray-900"
									onMouseDown={() => {
										setQuerySearch(sug);
										setShowSearchSuggestion(false);
										navigate(`/search/${encodeURIComponent(sug)}`);
									}}>
									{sug}
								</li>
							</div>
						))}
					</ul>
				)}
				<button
					className="bg-zinc-800 px-4 py-2 rounded-r-full border border-l-0 border-zinc-700 cursor-pointer"
					onClick={handleSearch}>
					<FaSearch />
				</button>
				<button className="ml-3 bg-zinc-800 p-2 rounded-full">
					<FaMicrophone />
				</button>
			</div>

			{/* Right: Icons */}
			<div className="flex items-center space-x-4">
				<button className="flex items-center gap-2 bg-zinc-800 px-3 py-1 rounded-full text-sm">
					<FaPlus /> Create
				</button>
				<MdNotifications className="text-xl" />
				{/* <img
					src=""
					alt="User Avatar"
					className="h-8 w-8 rounded-full"
				/> */}
			</div>
		</div>
	);
};

export default Header;
