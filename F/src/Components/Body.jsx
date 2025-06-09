import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
const Body = () => {
	return (
		<div className="  overflow-hidden bg-gray-950 ">
			<div className="  ">
				<div className=" ">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Body;
