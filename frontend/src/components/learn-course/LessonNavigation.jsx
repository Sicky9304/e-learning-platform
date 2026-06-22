import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const LessonNavigation = ({ onPrev, onNext, onComplete, disablePrev, disableNext, isCompleted }) => {
  return (
    <div className="bg-[#08152f] rounded-2xl p-5 flex flex-wrap gap-4 justify-between items-center">
      <button onClick={onPrev} disabled={disablePrev} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-white disabled:opacity-50">
        <ChevronLeft size={18} />
        Previous
      </button>

      <button onClick={onComplete} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white">
        <CheckCircle size={18} />
        {isCompleted ? "Completed" : "Mark Complete"}
      </button>

      <button onClick={onNext} disabled={disableNext} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50">
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default LessonNavigation;
