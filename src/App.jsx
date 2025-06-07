import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Body from './Components/Body';
import Header from './Components/Header';
import Main from './Components/Main';
import Navbar from './Components/Navbar';
import Watchpage from './Components/Watchpage';
import ChannelDetail from './Components/ChannelDetail';
import PopularVideos from './Components/popularVideos';
import SearchReasult from './Components/SearchReasult';

function App() {
	return (
		<div className="h-screen flex flex-col bg-gray-950 text-white">
			<Router>
				<Header />

				<div className="flex flex-1 overflow-hidden gap-2">
					{/* Sidebar */}
					<Navbar />

					<div className="flex-1 overflow-y-auto p-2">
						<Routes>
							<Route
								path="/"
								element={<Body />}>
								<Route
									index
									element={<Main />}
								/>
								<Route
									path="/category/:categoryId"
									element={<PopularVideos />}
								/>
								<Route
									path="/watch"
									element={<Watchpage />}
								/>
								<Route
									path="/channel/:channelId"
									element={<ChannelDetail />}
								/>
								<Route
									path="/search/:querysearch"
									element={<SearchReasult />}
								/>
							</Route>
						</Routes>
					</div>
				</div>
			</Router>
		</div>
	);
}

export default App;
