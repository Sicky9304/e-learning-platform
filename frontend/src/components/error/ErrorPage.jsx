import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full bottom-[-100px] right-[-100px]" />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-slate-900/50 backdrop-blur-lg border border-slate-700 rounded-3xl p-10 md:p-14 max-w-2xl w-full text-center shadow-2xl"
      >
        {/* Robot */}
        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="text-8xl mb-6"
        >
          🤖
        </motion.div>

        {/* Error Code */}
        <h1 className="text-7xl md:text-9xl font-extrabold text-indigo-500">404</h1>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">Page Not Found</h2>

        {/* Description */}
        <p className="text-gray-400 mt-4 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl text-white font-medium transition"
          >
            🚀 Back Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl text-white font-medium transition"
          >
            ← Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
