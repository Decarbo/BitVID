import { motion } from 'framer-motion';

const shimmerVariants = {
  animate: {
    backgroundPosition: ['-200% 0', '200% 0'],
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      duration: 1.2,
    },
  },
};

const VideoCardSkeleton = () => {
  return (
    <motion.div
      className="w-full bg-zinc-900 rounded-xl shadow overflow-hidden animate-pulse"
      variants={shimmerVariants}
      animate="animate"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(63,63,70,0.2) 0%, rgba(161,161,170,0.3) 50%, rgba(63,63,70,0.2) 100%)',
        backgroundSize: '200% 100%',
      }}
    >
      <div className="h-48 bg-zinc-800 w-full rounded-t-xl" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
      </div>
    </motion.div>
  );
};

export default VideoCardSkeleton;
