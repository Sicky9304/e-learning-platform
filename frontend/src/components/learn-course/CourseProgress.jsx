import { motion } from "framer-motion";

const CourseProgress = ({completedLessons = [],totalLessons = 0,percentage = 0,}) => {
  const progressPercentage = percentage || (totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0);

  return (
    <div className="bg-[#08152f] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-lg">Course Progress</h3>
        <span className="text-indigo-400 font-bold">{progressPercentage}%</span>
      </div>

      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 0.5 }} className="h-full bg-indigo-500 rounded-full" />
      </div>

      <div className="flex justify-between mt-3 text-sm">
        <span className="text-gray-400">{completedLessons.length} Completed</span>
        <span className="text-gray-400">{totalLessons} Total Lessons</span>
      </div>
    </div>
  );
};

export default CourseProgress;
