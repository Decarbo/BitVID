import { useLocation, Link } from 'react-router-dom';
import { FaFire, FaShoppingBag, FaMusic, FaFilm, FaBroadcastTower, FaGamepad, FaNewspaper, FaTrophy, FaGraduationCap, FaTshirt, FaPodcast, FaCog } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const exploreLinks = [
	{ icon: <FaFire />, label: 'Trending', categoryId: '0' },
	{ icon: <FaShoppingBag />, label: 'Shopping', categoryId: '1' },
	{ icon: <FaMusic />, label: 'Music', categoryId: '10' },
	// { icon: <FaFilm />, label: 'Movies', categoryId: '30' },
	// { icon: <FaBroadcastTower />, label: 'Live', categoryId: '34' },
	{ icon: <FaGamepad />, label: 'Gaming', categoryId: '20' },
	{ icon: <FaNewspaper />, label: 'News', categoryId: '25' },
	{ icon: <FaTrophy />, label: 'Sports', categoryId: '17' },
	// { icon: <FaGraduationCap />, label: 'Courses', categoryId: '27' },
	{ icon: <FaTshirt />, label: 'Fashion & Beauty', categoryId: '26' },
	{ icon: <FaPodcast />, label: 'Podcasts', categoryId: '22' },
];

const Navbar = () => {
	const location = useLocation();
	const currentCategoryId = location.pathname.startsWith('/category/') ? location.pathname.split('/category/')[1] : '0';

	const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
	return !isMenuOpen ? null : (
		<div className="w-64 bg-gray-950 text-gray-400  px-4 text-sm space-y-1 overflow-y-scroll h-screen">
			<h2 className="text-gray-400 font-semibold mb-2">Explore</h2>
			<ul className="space-y-2">
				{exploreLinks.map((item) => {
					const isActive = currentCategoryId === item.categoryId;

					return (
						<Link
							key={item.categoryId}
							to={`/category/${item.categoryId}`}>
							<li
								className={`flex items-center gap-4 px-2 py-2  my-1 rounded cursor-pointer
									${isActive ? 'bg-gray-900 text-indigo-500' : 'hover:bg-zinc-800'}
								`}>
								<span className={isActive ? 'text-indigo-500' : 'text-gray-400'}>{item.icon}</span>
								<span>{item.label}</span>
							</li>
						</Link>
					);
				})}
			</ul>

			<div className="border-t border-zinc-700 pt-4">
				<div className="flex items-center gap-4 hover:bg-zinc-800 px-2 py-2 rounded cursor-pointer">
					<FaCog />
					<span>Settings</span>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
