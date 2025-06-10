// BitVIDLoader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react'; // Optional: install lucide-react for icons

const BitVIDLoader = () => {
	return (
		<div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white">
			{/* Animated BitVID Logo */}
			<motion.h1
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.8, ease: 'easeInOut' }}
				className="text-4xl sm:text-6xl font-bold tracking-wide"
			>
				<span className="text-red-600">Bit</span>VID
			</motion.h1>

			{/* Subtitle */}
			<motion.p
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4, duration: 0.6 }}
				className="mt-2 text-sm sm:text-lg text-gray-400"
			>
				Loading your learning experience...
			</motion.p>

			{/* Spinner */}
			<motion.div
				initial={{ rotate: 0 }}
				animate={{ rotate: 360 }}
				transition={{
					loop: Infinity,
					ease: 'linear',
					duration: 1.2,
				}}
				className="mt-6"
			>
				<Loader2 className="w-10 h-10 animate-spin text-red-600" />
			</motion.div>
		</div>
	);
};

export default BitVIDLoader;
