import { CheckCircle, PlayCircle } from "lucide-react";

const LessonItem = ({ lesson, isActive, isCompleted, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 border-t border-slate-700 text-left transition ${isActive ? "bg-indigo-600/20" : "hover:bg-slate-800"}`}
    >
      {isCompleted ? (
        <CheckCircle size={18} className="text-green-400 shrink-0" />
      ) : (
        <PlayCircle size={18} className="text-indigo-400 shrink-0" />
      )}

      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate ${isActive ? "text-indigo-400" : "text-white"}`}>
          {lesson.title}
        </p>

        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-500">
            {lesson.duration}
          </p>

          {lesson.isPreview && (
            <span className="text-[10px] bg-green-600 px-2 py-1 rounded text-white">
              Preview
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default LessonItem;
