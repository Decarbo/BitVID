import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
const Body = React.lazy(() => import('./Components/Body'));
const Header = React.lazy(() => import('./Components/Header'));
const Main = React.lazy(() => import('./Components/Main'));
const Navbar = React.lazy(() => import('./Components/Navbar'));
const Watchpage = React.lazy(() => import('./Components/Watchpage'));
const ChannelDetail = React.lazy(() => import('./Components/ChannelDetail'));
const PopularVideos = React.lazy(() => import('./Components/PopularVideos'));
const SearchReasult = React.lazy(() => import('./Components/SearchReasult'));


function App() {
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<div className="h-screen flex flex-col bg-gray-950 text-white">
				<Router>
					<Header />

					<div className="flex flex-1 overflow-hidden gap-2">
						{/* Sidebar */}
						<Navbar />

						<div className="flex-1 overflow-y-auto px-2">
							<Routes>
								<Route
									path="/"
									element={<Body />}>
									<Route
										index
										element={<Main />}
									/>
									<Route
										path="/explore"
										element={<PopularVideos />}
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
		</React.Suspense>
	);
}

export default App;
