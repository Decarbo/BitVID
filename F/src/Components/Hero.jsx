import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBookOpen, FaClock, FaBrain, FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const floatingVariants = {
	initial: { y: 0 },
	animate: {
		y: [0, -10, 0],
		transition: {
			duration: 5,
			repeat: Infinity,
			ease: 'easeInOut',
		},
	},
};

const StudentHeroSection = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState('');

	const addTodo = () => {
		if (input.trim()) {
			setTodos([...todos, { id: Date.now(), text: input, done: false }]);
			setInput('');
		}
	};

	const toggleDone = (id) => {
		setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
	};

	const removeTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<AnimatePresence>
			<section className="relative h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-zinc-900 to-black overflow-hidden px-4">
				{/* Background Orbs for visual calm */}
				<div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
				<div className="absolute bottom-0 right-1/3 w-48 h-48 bg-purple-400 rounded-full opacity-10 blur-2xl"></div>

				{/* Floating educational icons */}
				<motion.div
					variants={floatingVariants}
					initial="initial"
					animate="animate"
					className="absolute top-24 left-10 text-indigo-400 text-3xl opacity-20 z-0">
					<FaBookOpen />
				</motion.div>

				<motion.div
					variants={floatingVariants}
					initial="initial"
					animate="animate"
					className="absolute bottom-24 right-10 text-yellow-300 text-3xl opacity-20 z-0">
					<FaClock />
				</motion.div>

				<motion.div
					variants={floatingVariants}
					initial="initial"
					animate="animate"
					className="absolute top-1/3 right-1/4 text-green-300 text-4xl opacity-10 z-0">
					<FaBrain />
				</motion.div>

				{/* Main content */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className="relative z-10 text-center text-white max-w-2xl">
					<motion.h1
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.3, duration: 0.8 }}
						className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
						Learn Without Distractions
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="mt-4 text-lg text-zinc-300">
						BitVID helps to stay focused by offering a clean, recommendation-free space to watch what matters.
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.9 }}
						className="mt-8">
						<Link
							to="/explore"
							className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300">
							Start Learning
						</Link>
					</motion.div>

					<div className=" bg-gradient-to-tr from-indigo-900  to-[#00000000] p-5 rounded-xl w-full max-w-md mx-auto mt-10 shadow-xl text-white border border-zinc-800">
						<h2 className="text-xl font-semibold mb-4">🎯 Note Down	</h2>

						<div className="flex items-center gap-2 mb-4">
							<input
								type="text"
								placeholder="Add a task..."
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={(e) => e.key === 'Enter' && addTodo()}
								className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-full text-sm outline-none"
							/>
							<button
								onClick={addTodo}
								className=" bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-2 rounded-full hover:bg-indigo-500 transition cursor-pointer">
								<FaPlus />
							</button>
						</div>

						<ul className="space-y-2 max-h-64 overflow-y-auto">
							<AnimatePresence>
								{todos.map((todo) => (
									<motion.li
										key={todo.id}
										initial={{ opacity: 0, x: 40 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -40 }}
										className={`flex justify-between items-center px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 ${todo.done ? 'opacity-50 line-through' : ''}`}>
										<span
											className="cursor-pointer flex-1"
											onClick={() => toggleDone(todo.id)}>
											{todo.text}
										</span>
										<button
											onClick={() => removeTodo(todo.id)}
											className="text-red-500  hover:text-red-400 ml-3 cursor-pointer">
											<FaTrash />
										</button>
									</motion.li>
								))}
							</AnimatePresence>
						</ul>
					</div>
				</motion.div>
			</section>
		</AnimatePresence>
	);
};

export default StudentHeroSection;
