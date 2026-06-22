import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Rocket,
  Trophy,
  Target,
  Laptop,
} from "lucide-react";

export default function MissionVisual() {
  return (
    <div className="relative h-[450px] rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950/60 to-slate-950 border border-indigo-500/20">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)]" />

      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-10 left-1/2 -translate-x-1/2"
      >
        <Rocket size={60} className="text-indigo-400" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute left-14 top-32"
      >
        <GraduationCap size={70} className="text-violet-400" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute right-14 top-32"
      >
        <Laptop size={70} className="text-blue-400" />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2"
      >
        <BookOpen size={90} className="text-indigo-300" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-12"
      >
        <Target size={50} className="text-pink-400" />
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-12 right-12"
      >
        <Trophy size={50} className="text-yellow-400" />
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <p className="text-2xl font-bold text-white">25K+</p>
          <p className="text-xs text-gray-400">Students</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
          <p className="text-2xl font-bold text-white">500+</p>
          <p className="text-xs text-gray-400">Courses</p>
        </div>
      </div>
    </div>
  );
}
