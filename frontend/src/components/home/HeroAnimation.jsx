import { motion } from "framer-motion";
import {
  Code2,
  BookOpen,
  Award,
  PlayCircle,
  Users,
  Brain,
} from "lucide-react";

const HeroAnimation = () => {
  const floating = {
    animate: {
      y: [0, -15, 0],
    },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/20">

      {/* Glow Effects */}
      <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-violet-600/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-blue-600/20 blur-3xl" />

      {/* Center Circle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/30"
      >
        <div className="absolute inset-4 rounded-full border border-violet-500/30" />
        <div className="absolute inset-8 rounded-full border border-blue-500/30" />
      </motion.div>

      {/* Main Icon */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 shadow-2xl"
      >
        <Brain size={40} className="text-white" />
      </motion.div>

      {/* Floating Cards */}
      <motion.div
        {...floating}
        className="absolute top-12 left-10"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3">
          <Code2 className="text-indigo-400" />
          <span className="text-white">Web Development</span>
        </div>
      </motion.div>

      <motion.div
        {...floating}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-16 right-10"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3">
          <Award className="text-yellow-400" />
          <span className="text-white">Certificates</span>
        </div>
      </motion.div>

      <motion.div
        {...floating}
        transition={{ duration: 4.5, repeat: Infinity }}
        className="absolute bottom-24 left-8"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3">
          <BookOpen className="text-green-400" />
          <span className="text-white">500+ Courses</span>
        </div>
      </motion.div>

      <motion.div
        {...floating}
        transition={{ duration: 5.5, repeat: Infinity }}
        className="absolute bottom-16 right-8"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3">
          <PlayCircle className="text-pink-400" />
          <span className="text-white">Live Classes</span>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-xl px-5 py-3 border border-white/10">
          <Users className="text-indigo-400" size={18} />
          <span className="text-white font-medium">
            25K+ Active Learners
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroAnimation;
