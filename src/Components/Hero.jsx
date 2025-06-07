import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaYoutube, FaPlayCircle, FaFire } from 'react-icons/fa';

const floatingVariants = {
	initial: { y: 0 },
	animate: {
		y: [0, -15, 0],
		transition: {
			duration: 4,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	},
};

const HeroSection = () => {
	return (
		<section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black to-zinc-900 overflow-hidden px-6">
			{/* Optional video or static bg */}
			<video
				autoPlay
				loop
				muted
				className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
				src="/your-background-video.mp4"
			/>

			{/* 🔴 Floating Background Icons */}
			<motion.div
				variants={floatingVariants}
				initial="initial"
				animate="animate"
				className="absolute top-20 left-10 text-red-500 text-4xl opacity-20 z-0">
				<FaYoutube />
			</motion.div>

			<motion.div
				variants={floatingVariants}
				initial="initial"
				animate="animate"
				className="absolute bottom-24 right-10 text-yellow-400 text-3xl opacity-20 z-0">
				<FaFire />
			</motion.div>

			<motion.div
				variants={floatingVariants}
				initial="initial"
				animate="animate"
				className="absolute top-1/3 right-1/4 text-pink-500 text-5xl opacity-10 z-0">
				<FaPlayCircle />
			</motion.div>

			{/* ✨ Glowing Orbs */}
			<div className="absolute top-10 left-1/2 w-48 h-48 bg-pink-500 rounded-full blur-3xl opacity-10 z-0"></div>
			<div className="absolute bottom-10 right-1/3 w-32 h-32 bg-yellow-500 rounded-full blur-2xl opacity-10 z-0"></div>

			{/* Main Hero Content */}
			<motion.div
				initial={{ opacity: 0, y: 40 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
				className="relative z-10 text-center max-w-2xl text-white">
				<motion.h1
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.3, duration: 0.8 }}
					className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 drop-shadow-lg">
					Welcome to BitVID
				</motion.h1>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="mt-4 text-lg text-zinc-300">
					Your personalized video discovery platform. Stream smarter, better, faster.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.9 }}
					className="mt-8">
					<Link
						to="/explore"
						className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-yellow-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
						Explore Now
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default HeroSection;
